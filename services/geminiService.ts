import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  history: ChatMessage[],
  userMessage: string,
  userLocation?: { lat: number; lng: number }
): Promise<ChatMessage> => {
  
  // Prepare tools configuration
  const tools: any[] = [{ googleMaps: {} }];
  let toolConfig = {};

  // If we have location, pass it to retrieval config for better local results
  if (userLocation) {
    toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: userLocation.lat,
          longitude: userLocation.lng
        }
      }
    };
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are "Tapatío Bot", a helpful, energetic, and official guide for the 2026 World Cup in Guadalajara, Mexico. 
              Your goal is to help foreign tourists navigate the city, find the Estadio Akron, discover local food (tortas ahogadas, birria, tequila), and stay safe.
              Always provide helpful, welcoming responses. If asking about locations, use the Google Maps tool to find real places.
              
              Current User Query: ${userMessage}`
            }
          ]
        }
      ],
      config: {
        tools: tools,
        toolConfig: toolConfig,
        systemInstruction: "Answer in English, but use Spanish names for places and dishes correctly. Keep answers concise and practical for a traveler on the go.",
      }
    });

    const text = response.text || "I'm having trouble connecting to the Guadalajara network right now. Please try again.";
    
    // Extract grounding chunks for maps
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingUrls: Array<{title: string, uri: string}> = [];

    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.maps?.uri) {
          groundingUrls.push({
            title: chunk.maps.title || "View on Map",
            uri: chunk.maps.uri
          });
        }
        // Also check for source snippets which might be web grounding if maps fails but search picks it up
        if (chunk.web?.uri) {
            groundingUrls.push({
                title: chunk.web.title || "More Info",
                uri: chunk.web.uri
            });
        }
      });
    }

    return {
      id: Date.now().toString(),
      role: 'model',
      text,
      timestamp: new Date(),
      groundingUrls
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      id: Date.now().toString(),
      role: 'model',
      text: "Lo siento, I am currently experiencing high traffic due to the World Cup excitement. Please try again in a moment.",
      timestamp: new Date()
    };
  }
};