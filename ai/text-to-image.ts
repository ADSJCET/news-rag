import { env } from "@/env";

export interface StableDiffusionRequest {
	prompt: string;
}

export interface StableDiffusionResult {
	success: boolean;
	result: {
		images: string[];
	};
	errors: string[];
}

export async function generateImage(prompt: string) {
	const accountId = env.CLOUDFLARE_ACCOUNT_ID;
	const apiToken = env.CLOUDFLARE_API_TOKEN;

	const result = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt } as StableDiffusionRequest),
		},
	);

	console.log(result);

	if (!result.ok) {
		throw new Error(`HTTP error! status: ${result.status}`);
	}

	const blob = await result.blob()
	// const data = await blobToBase64(blob) as string

	const buffer = Buffer.from(await blob.arrayBuffer());
    return `data:${blob.type};base64,${buffer.toString('base64')}`;
}