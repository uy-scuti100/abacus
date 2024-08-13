import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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

export default function Footer() {
	return (
		<footer className="mt-20 mx-auto">
			<div className="flex flex-col md:flex-row justify-between items-center gap-5 py-10">
				<div className="flex  items-center gap-5">
					{links.map((link) => {
						return (
							<div key={link.name}>
								<Link
									className={cn(
										buttonVariants({ variant: "link" }),
										"text-foreground"
									)}
									href={link.link}
								>
									{link.name}
								</Link>
							</div>
						);
					})}
				</div>
			</div>

			{/* <FooterIcon /> */}
			<Image
				src={"/footer.svg"}
				alt="footer-icon"
				width={1000}
				height={100}
				className="w-full object-cover"
			/>
			<div className="text-center py-10 text-sm">
				Abacus © {new Date().getFullYear()}. All Rights Reseved.
			</div>
		</footer>
	);
}
