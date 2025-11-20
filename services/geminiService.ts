import { GoogleGenAI, Modality } from "@google/genai";
import { PhotoStyle } from '../types';

// Initialize the client. API_KEY is expected to be in the environment.
// Using a getter to ensure we pick up the key if it's set late (though typically env vars are static).
const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const STYLE_PROMPTS: Record<PhotoStyle, string> = {
  [PhotoStyle.RUSTIC]: "Professional food photography, rustic dark wood table, dramatic chiaroscuro lighting, moody atmosphere, rich textures, artisanal styling, 4k resolution, highly detailed.",
  [PhotoStyle.MODERN]: "Professional food photography, bright white background, soft studio lighting, clean minimalist lines, elegant plating, high key, vibrant colors, 4k resolution.",
  [PhotoStyle.SOCIAL]: "Professional food photography, flat lay, top-down view, trendy instagram aesthetic, high contrast, pop colors, hard lighting, sharp focus, 4k resolution."
};

export const generateFoodImage = async (
  dishName: string, 
  description: string, 
  style: PhotoStyle
): Promise<string> => {
  const ai = getClient();
  
  // Construct a rich prompt
  const fullPrompt = `A delicious, high-end professional photo of ${dishName}. ${description}. ${STYLE_PROMPTS[style]}`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1', // Square is versatile for menus/social
      },
    });

    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (!imageBytes) {
      throw new Error("No image data received from Imagen.");
    }

    return `data:image/jpeg;base64,${imageBytes}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const editFoodImage = async (
  base64Image: string,
  editInstruction: string
): Promise<string> => {
  const ai = getClient();

  // Extract the base64 data part if it includes the prefix
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const mimeType = base64Image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `Edit this image: ${editInstruction}. Maintain photorealism suitable for a food menu.`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract image from response
    // The model returns the edited image as inlineData in the parts
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("No edited image returned from Gemini Flash Image.");
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};
