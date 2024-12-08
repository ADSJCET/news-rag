import { env } from "@/env";
import { Client } from "@gradio/client";

const client = new Client("Pyramid-Flow/pyramid-flow", {
    hf_token: env.HUGGINGFACE_API_TOKEN as `hf_${string}`,
});
const result =  await client.predict("/generate_video", {
    prompt: "Generate a video based on a topic: 'Dogs'",
    
});

console.log(result.data);