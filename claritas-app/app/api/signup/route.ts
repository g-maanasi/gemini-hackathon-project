// app/api/signup/route.ts
'use server'; // Optional but good for clarity
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { UserInformation } from '@/types'; // { name: string; email: string; password: string }

// Initialize Supabase client (server-only secret)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const { userCreation, userPreferences } = await req.json();

    const { name, email, password } = userCreation;
    const { role, state, grade, learningStyle, traits } = userPreferences || {};

    console.log(traits)

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password required' },
        { status: 400 }
      );
    }

    // 1️⃣ Sign up user in Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/welcome`,
      },
    });

    if (signUpError) {
      console.error('Supabase signUp error:', signUpError);
      const status = signUpError.message.includes('already registered') ? 409 : 400;
      return NextResponse.json({ success: false, message: signUpError.message }, { status });
    }

    // 2️⃣ Extract user ID
    const userId = signUpData.user?.id;
    if (!userId) {
      console.error('No user ID returned from signUp');
      return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
    }

    // 3️⃣ Insert profile info into 'users' table
    const { data: dbData, error: dbError } = await supabase
      .from('users')
      .insert({
        auth_id: userId,
        name,
        email,
        state: state || '',
        grade_level: grade || '',
        isParent: role !== 'Student',
      });

    if (dbError) {
      console.error('DB insert error:', dbError);
      return NextResponse.json({ success: false, message: dbError.message }, { status: 500 });
    }

    // 4️⃣ Insert preferences into 'preferences' table
    const { data: prefData, error: prefError } = await supabase
      .from('preferences')
      .insert({
        user_id: userId,
        learning_style: learningStyle,
        learning_traits: traits,
      });

    if (prefError) {
      console.error('DB insert (preferences) error:', prefError);
      // Optional: rollback user insert
      await supabase.from('users').delete().eq('auth_id', userId);
      return NextResponse.json({ success: false, message: prefError.message }, { status: 500 });
    }

    // 5️⃣ Handle JWT / cookie
    const token = signUpData.session?.access_token;

    const response = NextResponse.json({
      success: true,
      message: token
        ? 'User created successfully'
        : 'User created. Please confirm your email to login.'
    });

    if (token) {
      response.cookies.set({
        name: 'access_token',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
      });
    }
    return response;
  } catch (err: any) {
    console.error('Error in /api/signup:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
