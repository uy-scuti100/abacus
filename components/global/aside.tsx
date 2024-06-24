"use client";
import {
	Boxes,
	CircleHelp,
	MessageSquare,
	Package,
	ReceiptText,
	Settings,
	ShoppingCart,
	Tag,
	TicketPercent,
	UsersRound,
	Workflow,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Aside() {
	const pathname = usePathname();
	const params = useParams();
	const id = params.id;
	if (pathname === "/store" || pathname === "/") {
		return null;
	}

	const links = [
		{
			href: `/${id}/products`,
			icon: <Tag className="w-5 h-5 " />,
			label: "Products",
		},
		{
			href: `/${id}/categories`,
			icon: <Package className="w-5 h-5 " />,
			label: "Categories",
		},
		{
			href: `/${id}/collections`,
			icon: <Boxes className="w-5 h-5 " />,
			label: "Collections",
		},
		{
			href: `/${id}/customers`,
			icon: <UsersRound className="w-5 h-5 " />,
			label: "Customers",
		},
		{
			href: `/${id}/orders`,
			icon: <ShoppingCart className="w-5 h-5 " />,
			label: "Orders",
		},
		{
			href: `/${id}/invoices`,
			icon: <ReceiptText className="w-5 h-5 " />,
			label: "Invoices",
		},
		{
			href: `/${id}/coupons`,
			icon: <TicketPercent className="w-5 h-5 " />,
			label: "Coupons",
		},
		{
			href: `/${id}/chat`,
			icon: <MessageSquare className="w-5 h-5 " />,
			label: "Chat",
		},
		{
			href: `/${id}/stock-request`,
			icon: <CircleHelp className="w-5 h-5 " />,
			label: "BIR",
		},
		{
			href: `/${id}/automations`,
			icon: <Workflow className="w-5 h-5 " />,
			label: "Automations",
		},
		{
			href: `/${id}/settings`,
			icon: <Settings className="w-5 h-5 " />,
			label: "settings",
		},
	];

	return (
		<aside className="sticky h-screen inset-y-0 left-0 z-10 flex-col hidden border-r bg-background md:flex px-2 w-full">
			<nav className="flex flex-col gap-4 sm:py-5 mr-[2px]">
				<Link href="/" className="px-2 pb-3">
					<Image
						src="/logo-short.svg"
						alt="logo"
						width={100}
						height={100}
						className="w-[100px]"
					/>
				</Link>
				<Separator orientation="horizontal" />
				<nav className="flex flex-col justify-between gap-6 pb-3">
					<div className="flex flex-col gap-4">
						<div className="grid gap-4 font-medium">
							{links.slice(0, 4).map(({ href, icon, label }) => (
								<Link
									href={href}
									key={href}
									className={`${
										pathname === href && "bg-clr-2 "
									} flex items-center gap-4 px-2.5   p-[2px] rounded-md hover:text-clr-7`}
								>
									<div className={`${pathname === href && "text-clr-7"}`}>
										{icon}
									</div>
									<div className={`${pathname === href && "text-clr-7"}`}>
										{label}
									</div>
								</Link>
							))}
						</div>
						<Separator orientation="horizontal" />
						<div className="grid gap-4 font-medium">
							{links.slice(4, -3).map(({ href, icon, label }) => (
								<Link
									href={href}
									key={href}
									className={`${
										pathname === href && "bg-clr-2 "
									} flex items-center gap-4 px-2.5   p-[2px] rounded-md hover:text-clr-7`}
								>
									<div className={`${pathname === href && "text-clr-7"}`}>
										{icon}
									</div>
									<div className={`${pathname === href && "text-clr-7"}`}>
										{label}
									</div>
								</Link>
							))}
						</div>
					</div>
					<nav>
						<Separator orientation="horizontal" />
						<div className="absolute bottom-5 left-2 right-2">
							<div className="grid gap-4 font-medium">
								{links.slice(8, 12).map(({ href, icon, label }) => (
									<Link
										href={href}
										key={href}
										className={`${
											pathname === href && "bg-clr-2"
										} flex items-center gap-4 px-2.5 p-[2px] rounded-md hover:text-clr-7`}
									>
										<div className={`${pathname === href && "text-clr-7"}`}>
											{icon}
										</div>
										<div className={`${pathname === href && "text-clr-7"}`}>
											{label}
										</div>
									</Link>
								))}
							</div>
						</div>
					</nav>
				</nav>
			</nav>
		</aside>
	);
}
