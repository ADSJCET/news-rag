import { env } from "@/env";
import Groq from 'groq-sdk';

const groq = new Groq({ 
  apiKey: env.GROQ_API_KEY 
});

export async function generateMemeCaptionForNewsImage(imageUrl: string): Promise<string> {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a meme caption generator. Given an image URL, analyze the image and create a witty, humorous, and topical meme caption. The caption should be concise, punchy, and capture the essence of the image in a comedic way. 
          
          Guidelines:
          - Keep the caption short (1-2 lines)
          - Use internet/meme humor
          - Be clever and unexpected
          - Relate directly to the image content`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this news image and generate a funny meme caption:"
            },
            {
              type: "image",
              image: imageUrl
            }
          ]
        }
      ],
      model: "llama3-8b-8192",
      max_tokens: 100
    });

    // Extract and return the meme caption
    const memeCaption = response.choices[0]?.message?.content?.trim() || 
      "When your meme generation goes hilariously wrong 😅";

    return memeCaption;
  } catch (error) {
    console.error("Error generating meme caption:", error);
    return "Meme caption generation failed 🤷‍♂️";
  }
}