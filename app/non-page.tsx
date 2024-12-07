import PageProvider from "@/components/custom/page-header";
import GridPattern from "@/components/magicui/grid-pattern";
import { ShinyBg } from "@/components/magicui/shiny-bg";
import { Card } from "@/components/ui/card";
import { AvatarSession } from "@/components/wrap/avatar-session";
// import { FileWrapper } from "@/components/wrap/file-uploader";
import GenerateFromScratch from "@/components/wrap/generate";
import { GeneratorForm } from "@/components/wrap/generate-wrap";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col justify-evenly overflow-hidden px-2">
			<PageProvider>
				<GridPattern mask className="-z-50" />
				<Card
					dark
					className={cn(
						"mx-auto transition-all relative shadow-none border-none w-full md:w-[600px] lg:w-[700px]",
					)}
				>
					<ShinyBg className="-z-50" />
					<Suspense
						fallback={
							<div className="flex h-32 w-full items-center justify-center">
								<Loader2 className="animate-spin" />
							</div>
						}
					>
						<GeneratorForm authCard={<AvatarSession />}>
							{/* <FileWrapper> */}
								<GenerateFromScratch />
							{/* </FileWrapper> */}
						</GeneratorForm>
					</Suspense>
				</Card>
			</PageProvider>
		</main>
	);
}
