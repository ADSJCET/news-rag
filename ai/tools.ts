import {
	type CoreToolCallUnion,
	type CoreToolResultUnion,
	generateObject,
	tool,
} from "ai";
import { z } from "zod";
import { model } from "./model";
import { searchNews } from "./rag";
import { generateImage } from "./text-to-image";

export const generateMeme = tool({
	description:
		"Generate a meme based on a topic. Topic can be anything previously talked about.",
	parameters: z.object({
		topic: z.string(),
	}),
	execute: async ({ topic }) => {
		const data = await generateObject({
            system: `You are a meme idea guessing machine. Generate a meme based on topic: ${topic}`,
            prompt: topic,
			model,
			schema: z.object({
				image: z
					.string()
					.describe("Not URL, just idea of meme template name planning to use"),
				caption: z.string().describe("Funny caption for meme"),
			}),
		});

        const url = await generateImage(data.object.image)

        return {
            url, caption: data.object.caption
        }
	},
});
export const generateVideo = tool({
	description:
		"Generate a video based on a topic. Topic can be anything previously talked about.",
	parameters: z.object({
		topic: z.string(),
	}),
	execute: async ({ topic }) => {
		const text = await generateObject({
			system: "You are a news reporter, Generate a news video based on topic. Be concise and informative",
			prompt: `topic: ${topic}`,
			model,
			schema: z.object({
				paragraph: z.string().describe("paragraph of information for video"),
			}),
		});

		console.log(text.object.paragraph);

		const count = 3

		const image = await generateObject({
			system: `You are a news reporter, generate ${count} image ideas for video of topic`,
			prompt: `topic: ${topic}`,
			model,
			schema: z.object({
				images: z.array(z.string()),
			}),
		});


		console.log(image.object.images);

		return {
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			paragraph: text.object.paragraph,
		};
	},
});
export const searchNewsTool = tool({
	description: "Search for news based on a query",
	parameters: z.object({
		newsTopic: z.string(),
	}),
	execute: async ({ newsTopic }) => {
		const news = await searchNews(newsTopic);

		console.log(news);

		if (news.length === 0) {
			return {
				news: [],
			};
		}

		const prompt = news
			.map((nw, int) => {
				return `ID: ${nw.id}\nTitle: ${nw.title}\n`;
			})
			.join("\n");

		console.log(prompt);

		const count = 3;
		const releventNews = await generateObject({
			model,
			system: `You are a filter tool. Here are some news articles, find most recent & relevent to topic: ${newsTopic}. Limit: ${count}`,
			schema: z.object({
				id: z.array(z.string()).describe("ID"),
			}),
			prompt,
		});

		console.log(releventNews);

		return {
			news: news.filter((nw) => {
				return releventNews.object.id.includes(nw.id);
			}),
		};
	},
});

export const tools = {
	generateMeme,
	generateVideo,
	searchNews: searchNewsTool,
};

export type MyToolCall = CoreToolCallUnion<typeof tools>;
export type MyToolResult = CoreToolResultUnion<typeof tools>;

export type GetToolResult<T extends keyof typeof tools> = Awaited<
	ReturnType<(typeof tools)[T]["execute"]>
>;
