"use client";
import {
	BookDashed,
	Boxes,
	CircleHelp,
	EyeIcon,
	LayoutDashboard,
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
import Logo from "@/app/_components/assets/logo";

export default function Aside() {
	const pathname = usePathname();
	const params = useParams();
	const id = params?.id;
	if (
		pathname === "/store" ||
		pathname === "/" ||
		pathname === "/login" ||
		pathname?.includes("/store-visualizer")
	) {
		return null;
	}

	const links = [
		{
			href: `/${id}`,
			icon: <LayoutDashboard className="w-5 h-5 " />,
			label: "Overview",
		},
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
			label: "Contacts",
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
			href: `/${id}/store-visualizer`,
			icon: <EyeIcon className="w-5 h-5 " />,
			label: "Visualizer",
		},
		// {
		// 	href: `/${id}/chat`,
		// 	icon: <MessageSquare className="w-5 h-5 " />,
		// 	label: "Chat",
		// },
		{
			href: `/${id}/stock-request`,
			icon: <CircleHelp className="w-5 h-5 " />,
			label: "BIR",
		},
		// {
		// 	href: `/${id}/automations`,
		// 	icon: <Workflow className="w-5 h-5 " />,
		// 	label: "Automations",
		// },
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
					<span className="flex items-center gap-2">
						<Logo className="w-[30px] h-[30px]" />
						<span className="font-medium">ABACUS</span>
					</span>
				</Link>

				<nav className="flex flex-col justify-between pb-3">
					<div className="flex flex-col gap-4 md:gap-2">
						<div className="grid gap-7 font-medium">
							{links.map(({ href, icon, label }) => (
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
				</nav>
			</nav>
		</aside>
	);
}
