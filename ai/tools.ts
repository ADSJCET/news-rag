import { tool } from "ai";
import { z } from "zod";

export const generateMeme = tool({
	description:
		"Generate a meme based on a topic. Topic can be anything previously talked about.",
	parameters: z.object({
		topic: z.string(),
	}),
	execute: async ({ topic }) => ({
		url: "https://picsum.photos/seed/picsum/800/600",
	}),
});
export const generateVideo = tool({
	description:
		"Generate a video based on a topic. Topic can be anything previously talked about.",
	parameters: z.object({
		topic: z.string(),
	}),
	execute: async ({ topic }) => ({
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
	}),
});

export const tools = {
	generateMeme,
	generateVideo,
};
