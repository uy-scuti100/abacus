"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

import ShimmerButton from "@/components/magicui/shimmer-button";
import DotPattern from "@/components/magicui/dot-pattern";
import useUser from "@/hooks/useUser";
import AvatarCirclesDemo from "./avatar-circles";

export default function HeroSection() {
	const user = useUser();

	return (
		<div className="pt-10 relative">
			<div className="flex flex-col justify-center items-center gap-6 ">
				<DotPattern
					className={cn(
						"[mask-image:radial-gradient(1440px_circle_at_center,white,transparent)]"
					)}
				/>
				<h1 className="text-center font-black sm:text-4xl text-3xl md:text-6xl">
					Effortless Store Management{" "}
				</h1>
				<p className="text-center text-gray-600">
					Streamline your store with tools for managing stock, requests, orders,{" "}
					<br className="hidden md:block" />
					and more, all in one powerful dashboard.
				</p>

				<div className="mb-5">
					<AvatarCirclesDemo />
				</div>

				<div className="flex justify-center items-center gap-6 mb-5">
					<Link href={user?.data?.id ? "/store" : "/login"}>
						<ShimmerButton
							className="shadow-2xl"
							background="hsl(var(--primary))"
						>
							<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg ">
								{user?.data?.id ? "Go to Dashboard" : "Start a Free Trial "}
							</span>
						</ShimmerButton>
					</Link>
				</div>
			</div>
		</div>
	);
}
