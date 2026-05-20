import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, NewsArticle, AnalysisSource } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const MODEL_NAME = "gemini-2.5-flash";

const newsArticleSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            snippet: { type: Type.STRING }
        },
        required: ["title", "snippet"]
    }
};

export const analyzeNewsArticle = async (articleContent: string): Promise<AnalysisResult> => {
  const systemInstruction = `
    You are a Game Theory Oracle and Fact-Checker. Your goal is to reach a consensus on an article's accuracy using a Nash Equilibrium voting mechanism.
    
    The Players:
    1. Gemini AI (The Oracle/Fact-Checker)
    2. X (Twitter) Pulse (Public sentiment/discussions)

    The Mechanism:
    - Each player must VOTE: 'TRUE', 'FALSE', or 'UNCERTAIN'.
    - REWARD: +10 points if a player aligns with the final consensus.
    - PUNISHMENT: -10 points if a player deviates from the consensus.
    - GOAL: Reach a Nash Equilibrium where no player can improve their payoff by unilaterally changing their vote.
    - ITERATION: You MUST simulate AT LEAST 5 ROUNDS of voting. Even if consensus is reached early, continue for 5 rounds to explore edge cases, potential counter-arguments, and verify the stability of the equilibrium.
    - ROUND LOGIC: Each round should show a progression of reasoning as agents consider new evidence or the votes of others.

    Analyze the provided article content and search for related discussions on X.
    
    IMPORTANT: Your entire response must be ONLY the raw JSON object. The JSON object must conform to this structure:
    {
      "summary": "string",
      "factuality": "string",
      "biasAnalysis": "string",
      "sourceAnalysis": "string",
      "gameMechanism": {
        "rounds": [
          {
            "roundNumber": 1,
            "agents": [
              { "name": "Gemini AI", "vote": "TRUE" | "FALSE" | "UNCERTAIN", "reasoning": "string", "payoff": integer },
              { "name": "X (Twitter)", "vote": "TRUE" | "FALSE" | "UNCERTAIN", "reasoning": "string", "payoff": integer }
            ],
            "consensusReached": boolean,
            "equilibriumType": "Nash" | "None"
          }
        ],
        "finalVerdict": "TRUE" | "FALSE" | "UNCERTAIN",
        "totalRewardPool": integer
      }
    }
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Analyze this article and run the Game Theory Voting Mechanism:\n\n---\n\n${articleContent}`,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.1, // Low temperature for consistency in game logic
      tools: [{googleSearch: {}}],
    },
  });
  
  const rawText = response.text;
  try {
    const startIndex = rawText.indexOf('{');
    const endIndex = rawText.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
        throw new Error("No valid JSON object found in the response.");
    }

    const jsonText = rawText.substring(startIndex, endIndex + 1);
    const parsedJson = JSON.parse(jsonText);
    
    const sources: AnalysisSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(
        (chunk: any) => ({
            title: chunk.web?.title || "Search Result",
            uri: chunk.web?.uri || "",
        })
    ).filter(source => source.uri) ?? [];

    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

    return { ...parsedJson, sources: uniqueSources } as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse JSON response from Gemini:", rawText);
    throw new Error("The AI returned an invalid analysis format.");
  }
};

export const fetchLatestNews = async (): Promise<NewsArticle[]> => {
    const systemInstruction = `
    You are a news aggregator. Your task is to provide a list of 5 recent and diverse top news headlines.
    For each headline, provide a title and a short, neutral snippet of about 2-3 sentences.
    Return the list as a JSON array.
    `;
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "List the top 5 news headlines.",
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: newsArticleSchema,
            temperature: 0.7,
        },
    });

    const jsonText = response.text.trim();
    try {
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as NewsArticle[];
    } catch (e) {
        console.error("Failed to parse JSON response from Gemini for news:", jsonText);
        throw new Error("The AI returned an invalid news format.");
    }
}