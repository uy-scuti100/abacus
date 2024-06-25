import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function page() {
	return (
		<div className="flex justify-center items-center h-screen text-6xl flex-col capitalize gap-10">
			<h1>landing page</h1>
			<Link
				className={cn(buttonVariants({ variant: "default" }))}
				href={"/login"}
			>
				login
			</Link>
			<Link
				className={cn(buttonVariants({ variant: "default" }))}
				href={"/store"}
			>
				store
			</Link>
		</div>
	);
}
