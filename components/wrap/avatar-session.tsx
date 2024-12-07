import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fallBack } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AvatarSession = async () => {
    const session = await getServerAuthSession()
    return (
        <>
            {session ? (
                <>
                    <Avatar className="size-12 rounded-md">
                        <AvatarImage src={session.user.image ?? ""} />
                        <AvatarFallback className="rounded-md">{fallBack(session.user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="px-2 text-start">
                        <p className="text-sm">{session.user.name}</p>
                        <h6 className="text-sm opacity-65">{session.user.username}</h6>
                        <input hidden type="string" name="user" defaultValue={session.user.id} />
                    </div>
                </>
            ) : (
                <>
                    <input hidden type="string" name="user" />
                    <Button className="h-12" asChild size={"lg"} variant={"secondary"}>
                        <Link href="/api/auth/signin">
                            Login <GitHubLogoIcon className="ms-2" />
                        </Link>
                    </Button>
                </>
            )}
        </>
    );
}