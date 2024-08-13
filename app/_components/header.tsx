"use client";
import Link from "next/link";
import Logo from "./assets/logo";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";

export default function Header() {
	const user = useUser();
	const [openNav, setOpenNav] = useState(false);
	function toggleNav() {
		setOpenNav((prev) => !prev);
	}
	useEffect(() => {
		document.body.style.overflow = openNav ? "hidden" : "auto";
	}, [openNav]);
	return (
		<header className="relative w-full container px-4 md:px-[2rem] top-0 py-5 flex justify-between items-center border-b backdrop-blur-3xl z-[9999999]">
			<div className="flex items-center gap-2">
				<Logo />
				<h1 className="text-xl ">Abacus</h1>
			</div>

			<div className="flex items-center gap-5">
				<div className=" hidden md:flex gap-6 items-center mr-24">
					{links.map((link) => {
						return (
							<div key={link.name}>
								<Link href={link.link}>{link.name}</Link>
							</div>
						);
					})}
				</div>
				{!user.data?.id ? (
					<div className="flex items-center gap-5">
						<Link
							className={cn(buttonVariants({ variant: "default" }), "px-3 h-8")}
							href={"/login"}
						>
							Login
						</Link>

						<Link
							className={cn(buttonVariants({ variant: "outline" }), "px-3 h-8")}
							href={"/register"}
						>
							Sign Up
						</Link>
					</div>
				) : (
					<Link
						className={cn(buttonVariants({ variant: "default" }), "px-3 h-8")}
						href={"/store"}
					>
						Go to Store
					</Link>
				)}

				<Button
					onClick={toggleNav}
					variant={"ghost"}
					className="p-0 md:hidden hover:bg-transparent"
				>
					{/* <MenuIcon /> */}
					<HiOutlineMenuAlt4 size={30} />
				</Button>
			</div>

			{/* mobile nav */}
			<div
				className={`absolute h-[100dvh] bg-white inset-0 ${
					openNav ? "translate-x-0" : "translate-x-[-120%]"
				} duration-300 transition-all md:hidden`}
			>
				<div className=" flex justify-between text-4xl border-b p-5 cursor-pointer">
					<div className="flex items-center gap-2">
						<Logo />
						<h1 className="text-xl ">Abacus</h1>
					</div>
					<Button
						onClick={toggleNav}
						variant={"ghost"}
						className="p-0 md:hidden hover:bg-transparent"
					>
						<HiOutlineX size={30} />
					</Button>
				</div>

				<div className="mt-5 flex justify-center h-[80%] flex-col gap-8 p-10">
					{links.map((nav: { name: string; link: string }) => {
						const { name, link } = nav;
						return (
							<Link
								href={link}
								key={name}
								className="text-5xl"
								onClick={toggleNav}
							>
								{name}
							</Link>
						);
					})}
				</div>
			</div>
		</header>
	);
}

const links = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "Docs",
		link: "/docs",
	},
	{
		name: "About",
		link: "/about",
	},
	{
		name: "Contact",
		link: "/contact",
	},
];
