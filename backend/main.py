import os
from flask import Flask
from supabase import create_client, Client
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

try:
    genai_client = genai.Client()
except Exception as e:
    # Handle cases where the API key is not found
    print(f"Error configuring Gemini client: {e}")
    print("Please ensure your GEMINI_API_KEY is set in your .env file or environment variables.")
    exit()

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

@app.route('/')
def index():
    response = supabase.table('todos').select("*").execute()
    todos = response.data

    html = '<h1>Todos</h1><ul>'
    for todo in todos:
        html += f'<li>{todo["name"]}</li>'
    html += '</ul>'

    return html

# Define a Pydantic model for the request body
class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_text(request: PromptRequest):
    """
    An API endpoint to send a prompt to the Gemini model and receive a response.
    """
    try:
        # Use the appropriate Gemini model
        model_name = "gemini-2.5-flash"
        
        # Generate content using the Gemini client
        response = genai_client.models.generate_content(
            model=model_name,
            contents=[request.prompt],
        )
        
        # Return the generated text in a JSON response
        return {"response": response.text}

    except Exception as e:
        return {"error": str(e)}

if __name__ == '__main__':
    app.run(debug=True)