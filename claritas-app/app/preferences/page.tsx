'use client';

import React, { useState } from 'react';
import PreferenceForm from '../../components/PreferenceView';
import { CourseView } from '@/components/CourseView'; 

const PreferencesPage: React.FC = () => {
    const [courseData, setCourseData] = useState<any | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // This is called by PreferenceForm after the fetch to FastAPI succeeds
    const handleFormComplete = (data: any) => {
        setCourseData(data);
    };

    // View 1: The Generated Roadmap
    if (courseData) {
        return (
            <div className="min-h-screen bg-slate-950">
                <div className="max-w-7xl mx-auto pt-20">
                    <CourseView course={courseData} />
                    
                    <div className="flex justify-center pb-32">
                        <button 
                            onClick={() => setCourseData(null)}
                            className="group flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors font-bold text-xs uppercase tracking-widest"
                        >
                            <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50">←</span>
                            Modify Preferences
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // View 2: The Configuration Form
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        Claritas Pathfinder v1.0
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Configure Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Roadmap</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl">
                        Complete your profile to synchronize your academic goals with state-specific curriculum standards.
                    </p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <PreferenceForm
                        onComplete={handleFormComplete}
                        onProcessingChange={setIsProcessing}
                    />

                    {/* Full-screen Loading Overlay triggered by PreferenceForm */}
                    {isProcessing && (
                        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center space-y-6">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black text-white">Synthesizing DNA...</h3>
                                <p className="text-slate-400 font-medium animate-pulse">
                                    Cross-referencing state standards with your profile.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreferencesPage;