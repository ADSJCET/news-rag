"use client";

import type { GetToolResult } from "@/ai/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useChat } from "ai/react";
import { useState } from "react";

export default function Page() {
	const { messages, input, setInput, handleSubmit } = useChat();
	const [toneValue, setToneValue] = useState("neutral");
	const [contentType, setContentType] = useState("meme");

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
			<div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
				w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

			<div className="w-full max-w-3xl relative z-10">
				<h1 className="text-7xl font-bold text-center mb-8 
					bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600
					animate-pulse-glow
					drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]">
					News Flare
				</h1>

				<div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 mb-4">
					<div className="max-h-[70vh] overflow-y-auto p-4">
						{messages.map((message) => (
							<div key={message.id} className="mb-4 pb-4 border-b border-gray-700/30">
								<div className="font-semibold text-gray-300 capitalize">{message.role}</div>
								<div className="text-white">{message.content}</div>

								<div className="mt-2">
									{message.toolInvocations?.map((toolInvocation) => {
										const { toolName, toolCallId, state } = toolInvocation;

										if (state === "result") {
											// ... previous tool invocations remain the same ...

											if (toolName === "searchNews") {
												const { result } = toolInvocation as {
													result: GetToolResult<"searchNews">;
												};

												if (!result.news || result.news.length === 0) {
													return (
														<div
															key={toolCallId}
															className="mt-1 p-2 bg-gray-700/30 rounded"
														>
															<div className="text-white">No news found</div>
														</div>
													);
												}

												return (
													<div
														key={toolCallId}
														className="mt-1 p-2 bg-gray-700/30 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
													>
														{result.news.map((news) => (
															<a
																key={news.url}
																href={news.url}
																target="_blank"
																rel="noreferrer"
																className="block border border-blue-700/50 rounded overflow-hidden hover:bg-blue-900/30 transition-colors"
															>
																{news.urlToImage && (
																	<img 
																		src={news.urlToImage} 
																		alt={news.title} 
																		className="w-full h-48 object-cover" 
																	/>
																)}
																<div className="p-3">
																	<div className="font-semibold text-blue-300 mb-2">
																		{news.title}
																	</div>
																	<p className="text-sm text-gray-400 line-clamp-2">
																		{news.description}
																	</p>
																</div>
															</a>
														))}
													</div>
												);
											}
										} else {
											return (
												<div
													key={toolCallId}
													className="mt-1 p-2 bg-gray-700/30 rounded"
												>
													<div className="text-white">Loading...</div>
												</div>
											);
										}
									})}
								</div>
							</div>
						))}
					</div>

					{/* ... rest of the component remains the same ... */}
					<form 
						onSubmit={handleSubmit} 
						className="p-4 border-t border-gray-700/30 space-y-2"
					>
						<Input 
							type="text"
							value={input}
							onChange={(event) => {
								setInput(event.target.value);
							}}
							placeholder="Type your message..."
							className="w-full bg-gray-700/50 text-white border-gray-600 
							focus:ring-2 focus:ring-blue-500/50 focus:border-orange-500"
						/>
						<div className="flex items-center space-x-4">
							<div className="flex space-x-2 w-full">
								<div className="flex items-center space-x-2 w-1/2">
									<span className="text-sm text-gray-400 w-16">Tone:</span>
									<Select 
										value={toneValue}
										onValueChange={setToneValue}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select tone" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="funny">Funny</SelectItem>
											<SelectItem value="neutral">Neutral</SelectItem>
											<SelectItem value="vere">Vere</SelectItem>
										</SelectContent>
									</Select>
								</div>
								
								<div className="flex items-center space-x-2 w-1/2">
									<span className="text-sm text-gray-400 w-16">Content:</span>
									<Select 
										value={contentType}
										onValueChange={setContentType}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select content" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="meme">Meme</SelectItem>
											<SelectItem value="video">Video</SelectItem>
											<SelectItem value="audio">Audio</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
						<Button 
							type="submit" 
							className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 
							hover:from-blue-600 hover:to-purple-700 text-white"
						>
							Send
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}