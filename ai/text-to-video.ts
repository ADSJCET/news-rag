import { env } from "@/env";
import { triedAsync } from "@/lib/utils";
import { Client } from "@gradio/client";

const app = await Client.connect("Pyramid-Flow/pyramid-flow", {
	hf_token: env.HUGGINGFACE_API_TOKEN as `hf_${string}`,
});

// const client = new Client("Pyramid-Flow/pyramid-flow")

export const getVideo = async (
	prompt: string,
	image: Blob | null,
	options: {
		duration: number;
		guidance_scale: number;
		video_guidance_scale: number;
		frames_per_second: number;
	} = {
        duration: 5,
        guidance_scale: 9,
        video_guidance_scale: 5,
        frames_per_second: 8,
    },
) => {
    return await triedAsync(app.predict("/generate_video", {
        prompt,
        image,
        ...options,
    }))
};

const x = await getVideo("A video of a cat", null)
console.log(x)