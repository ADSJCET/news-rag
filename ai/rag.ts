import { env } from "@/env";

async function fetchNews(
	apiKey: string,
	query: string,
	language = "en",
	limit = 3,
): Promise<any[]> {
	const url = `https://newsapi.org/v2/everything?q=${query}&language=${language}&apiKey=${apiKey}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Error fetching news: ${response.statusText}`);
		}

		const data = await response.json();
		const validArticles = data.articles.filter(
			(article: any) =>
				article.content &&
				article.content.trim() !== "[Removed]" &&
				article.content.trim() !== "",
		);

		return validArticles.slice(0, limit);
	} catch (error) {
		console.error(`Error fetching news: ${error}`);
		return [];
	}
}

export const searchNews = async (string: string) => {
    const articles = await fetchNews(env.NEWS_API_ORG_KEY, string);
    
    return articles.map((nw, int) => ({ ...nw, id: `article-${int}`})) as News[]
}

type News = {
    id: string
    source: {
      id: string | null,
      name: string | null,
    },
    author: string,
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
  }

// console.log(await searchNews('bitcoin'))