import { BadgeInfo, BadgeInfoIcon } from "lucide-react";
import { PiInfoThin } from "react-icons/pi";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Note({ id }: { id: string }) {
	const url = process.env.NEXT_PUBLIC_DOMAIN;
	return (
		<div className="p-2 my-3 rounded-md border-[#FFB700] border bg-[#FFF0D1] flex items-center gap-3 w-full sm:max-w-[600px] ">
			<BadgeInfoIcon className="text-amber-700" />
			<p className="text-sm text-black">
				You can find your api-key in the{" "}
				<Link
					href={`${url}/${id}/settings`}
					className={cn(buttonVariants({ variant: "link" }), "px-0")}
				>
					settings
				</Link>{" "}
				page
			</p>
		</div>
	);
}
