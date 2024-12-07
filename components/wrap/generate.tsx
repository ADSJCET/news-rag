import { PlaceholdersAndVanishInput } from "@/components/custom/vanish-input";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Cpu, FileScan, Lock, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileInput } from "@/components/ui/file";
import { AdvancedOptions } from "./provider-options";

const PROMPTplaceholders = [
	"Dashboard with TODO list and progress bar",
	"Profile page and list of repositories",
	"Server log and project display dashboard",
];

const APIplaceholders = [
	"API url that returns JSON",
	"https://api.example.com/api/v1/data",
	"https://jsonplaceholder.typicode.com/todos/",
];

const GenerateFromScratch = async () => {
	return (
		<>
			<CardContent className="space-y-0 px-4 py-4">
				<PlaceholdersAndVanishInput
					containerClassName="rounded-b-none min-h-10 dark:bg-secondary"
					placeholders={PROMPTplaceholders}
					className="min-h-10 rounded-md px-3 pt-4 text-card-foreground"
					name="prompt"
				/>
				<PlaceholdersAndVanishInput
					containerClassName="rounded-t-none min-h-10 dark:bg-secondary"
					placeholders={APIplaceholders}
					className="min-h-10 rounded-md px-3 pt-4 text-card-foreground"
					delay={0.9}
					name="url"
				/>
			</CardContent>

			<CardContent className="flex flex-row flex-wrap gap-3 px-4">
				{/* <Toggle name="openapi" variant={"success"}>
					<Leaf className="mr-2 h-4 w-4" />
					OpenAPI
				</Toggle> */}

				<Toggle radio name="local" variant={"success"}>
					<Cpu className="mr-2 h-4 w-4" />
					Fetch & Process Locally
				</Toggle>

				<Toggle radio name="private" variant={"success"}>
					<Lock className="mr-2 h-4 w-4" />
					Private Data
				</Toggle>

				<Dialog>
					<DialogTrigger asChild>
						<Toggle variant={"success"}>
							<Sparkles className="mr-2 h-4 w-4" />
							LLM
						</Toggle>
					</DialogTrigger>
					<DialogContent className="px-1 py-2">
						<CardHeader>
							<CardTitle>
								Choose your Language Model
							</CardTitle>
							<CardDescription>
								Do not worry, these informations are stored on your browser.
							</CardDescription>
						</CardHeader>
						<AdvancedOptions />
						<CardFooter>
							<CardDescription>
								Make sure your providers use OpenAI API formats
							</CardDescription>
						</CardFooter>
					</DialogContent>
				</Dialog>

				<div className="ms-auto" />
				<Button size={"icon"} variant={"secondary"} asChild>
					<FileInput>
						{/* <Image className="h-4 w-4" />
						<span className="px-1">or</span> */}
						<FileScan className="h-4 w-4" />
					</FileInput>
				</Button>
			</CardContent>
		</>
	);
};

export default GenerateFromScratch;