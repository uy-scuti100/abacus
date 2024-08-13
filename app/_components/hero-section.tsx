"use client";
import { cn } from "@/lib/utils";
import { createSupabaseServer } from "@/supabase/server";
import Link from "next/link";

import ShimmerButton from "@/components/magicui/shimmer-button";
import DotPattern from "@/components/magicui/dot-pattern";
import useUser from "@/hooks/useUser";

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
				<h1 className="text-center font-[800] text-4xl md:text-6xl">
					{/* Easy Control for Your <br className="hidden md:block" /> Online Store */}
					Tired of Juggling Your <br className="hidden md:block" /> Store's
					Chaos?
				</h1>
				<p className="text-center text-gray-600">
					Streamline your store with tools for managing stock, requests, orders,{" "}
					<br className="hidden md:block" />
					and more, all in one powerful dashboard.
				</p>

				<div className="flex justify-center items-center gap-6">
					<Link
						href={user?.data?.id ? "/store" : "/login"}
						// className={cn(buttonVariants({ variant: "default" }))}
					>
						<ShimmerButton
							className="shadow-2xl"
							background="hsl(var(--primary))"
						>
							<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg ">
								{user?.data?.id ? "Go to Store" : "Start a Free Trial"}
							</span>
						</ShimmerButton>
					</Link>
				</div>
			</div>
		</div>
	);
}

// export function ShimmerButtonDemo() {
// 	return (
// 		<ShimmerButton className="shadow-2xl">
// 			<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
// 				Shimmer Button
// 			</span>
// 		</ShimmerButton>
// 	);
// }
