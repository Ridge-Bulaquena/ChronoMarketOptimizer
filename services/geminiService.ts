
import { GoogleGenAI, Type } from "@google/genai";
import { CampaignInput, PredictionResult } from "../types";

// Initializing the AI client with required credentials.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCampaignTiming = async (input: CampaignInput): Promise<PredictionResult> => {
  // Use professional-grade model for complex reasoning and predictive tasks.
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    Analyze the following marketing campaign details and predict the optimal launch time for maximum engagement.
    Campaign Name: ${input.campaignName}
    Niche: ${input.niche}
    Target Audience: ${input.targetAudience}
    Budget: ${input.budgetRange}
    Primary Channel: ${input.primaryChannel}
    Goals: ${input.goals}
    Historical Context: ${input.historicalContext || 'None provided'}

    Please provide a detailed predictive analysis in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      // Thinking budget is enabled for deep reasoning to ensure robust predictions.
      thinkingConfig: { thinkingBudget: 16000 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          optimalLaunchDate: { type: Type.STRING, description: "Recommended day of the week or specific date window" },
          optimalLaunchTime: { type: Type.STRING, description: "Recommended time of day (e.g., 09:00 AM EST)" },
          confidenceScore: { type: Type.NUMBER, description: "Confidence in prediction (0-1)" },
          rationale: { type: Type.STRING, description: "Deep explanation for why this timing works" },
          sentimentAnalysis: { type: Type.STRING, description: "Predicted audience sentiment at that time" },
          forecastData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                engagementScore: { type: Type.NUMBER }
              },
              required: ["time", "engagementScore"]
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                impact: { type: Type.STRING }
              },
              required: ["title", "description", "impact"]
            }
          }
        },
        required: ["optimalLaunchDate", "optimalLaunchTime", "confidenceScore", "rationale", "forecastData", "recommendations", "sentimentAnalysis"]
      }
    }
  });

  try {
    const textResult = response.text || '{}';
    const result = JSON.parse(textResult);
    return result as PredictionResult;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not parse prediction results.");
  }
};
