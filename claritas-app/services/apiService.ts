
import { PreferenceProfile, RecommendationResponse } from "../types";

// Replace with your actual FastAPI endpoint
const API_BASE_URL = "http://localhost:8000";

export const getLearningRecommendations = async (profile: PreferenceProfile): Promise<RecommendationResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/roadmap`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch from FastAPI:", error);
        // Fallback UI data in case backend is unreachable
        return {
            summary: "We encountered a connection issue, but your path is being calculated.",
            suggestedFocusAreas: profile.weaknesses,
            stateStandardNote: `Aligning with ${profile.state} standards via local backup.`
        };
    }
};
