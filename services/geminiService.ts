import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, NewsArticle, AnalysisSource } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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
    You are an expert news analyst and meticulous fact-checker. Your goal is to provide a neutral, unbiased assessment of a news article's credibility using Google Search to ground your analysis.
    Analyze the provided article content based on the following criteria:
    1.  **Factual Accuracy**: Identify key claims and verify them against search results. Are there any clear inaccuracies or unsupported statements?
    2.  **Source Reliability**: Does the article cite sources? If so, are they reputable? Is there a reliance on anonymous sources? Your own search results can act as sources.
    3.  **Bias and Tone**: Examine the language used. Is it neutral and objective, or is it emotionally charged, loaded, or sensationalized? Does it present a balanced view or is it one-sided?
    4.  **Overall Credibility**: Based on the above, provide a score from 1 (very low credibility, likely fake news) to 10 (very high credibility, trustworthy journalism).

    IMPORTANT: Your entire response must be ONLY the raw JSON object, without any surrounding text, comments, or markdown formatting like \`\`\`json ... \`\`\`. The JSON object must conform to this structure:
    {
      "summary": "string",
      "credibilityScore": integer (1-10),
      "factuality": "string",
      "biasAnalysis": "string",
      "sourceAnalysis": "string"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Please analyze the following article:\n\n---\n\n${articleContent}`,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.2,
      tools: [{googleSearch: {}}],
    },
  });
  
  const rawText = response.text;
  try {
    // Find the start and end of the JSON object to make parsing more robust
    const startIndex = rawText.indexOf('{');
    const endIndex = rawText.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
        throw new Error("No valid JSON object found in the response.");
    }

    const jsonText = rawText.substring(startIndex, endIndex + 1);
    
    const parsedJson = JSON.parse(jsonText);
    const sources: AnalysisSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(
        (chunk: any) => ({
            title: chunk.web.title,
            uri: chunk.web.uri,
        })
    ).filter(source => source.uri) ?? [];

    // Remove duplicates based on URI
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
        model: "gemini-2.5-flash",
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