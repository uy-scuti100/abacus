"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	BellIcon,
	BookDashed,
	Boxes,
	CircleHelp,
	EyeIcon,
	Loader,
	Menu,
	MessageSquare,
	Package,
	ReceiptText,
	Search,
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
import SignOutButton from "./sign-out-button";
import StoreSwitcher from "@/providers/storeSwitcher";
import useUser from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import useFetchStores from "@/hooks/useFetchStores";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Header() {
	const pathname = usePathname();
	const params = useParams();
	const id = params?.id;
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [open, setOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);

	const user = useUser();
	const userlogo = user.data?.avatar;
	const userEmail = user.data?.email;

	const { data: stores } = useFetchStores();

	// Function to handle clicks outside the navigation menu
	const handleClickOutside = (event: { target: any }) => {
		if (navRef.current && !navRef.current.contains(event.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		// Add event listener for clicks
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Clean up the event listener on component unmount
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const updateBodyOverflow = () => {
			if (open) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
		};
		updateBodyOverflow();
	}, [open]);

	// Early return should be after all hooks
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
			icon: <BookDashed className="w-5 h-5 " />,
			label: "Dashboard",
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
			href: `/${id}/store-visualizer`,
			icon: <EyeIcon className="w-5 h-5 " />,
			label: "Visualizer",
		},
		{
			href: `/${id}/chat`,
			icon: <MessageSquare className="w-5 h-5 " />,
			label: "Chat",
		},
		{
			href: `/${id}/stock-request`,
			icon: <CircleHelp className="w-5 h-5 " />,
			label: "Stock Request",
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
		<header className="sticky top-0 z-30 flex items-center gap-4 p-4 border-b h-[70px] bg-background sm:h-auto">
			{isRefreshing && (
				<div className="fixed inset-0 bg-black/50 z-[5000000] flex justify-center items-center text-white">
					<Loader className="animate-spin duration-1000 " size={50} />
				</div>
			)}

			<Button
				size="icon"
				variant="outline"
				className="rounded-full md:hidden"
				onClick={() => setOpen((prev) => !prev)}
			>
				<Menu className="w-5 h-5" />
				<span className="sr-only">Toggle Menu</span>
			</Button>
			<nav
				className={`${
					open ? "translate-x-0" : "-translate-x-full"
				} md:hidden fixed inset-0 overflow-hidden custom-easing pt-5 pb-10 z-[5000] bg-clr-2`}
			>
				<div
					ref={navRef}
					className="px-2  absolute top-0 rounded-sm ring-offset-background transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none bg-secondary inset-y-0 left-0 h-full w-3/4 border-r "
				>
					<div className="flex justify-between w-full items-center pt-3">
						<Link
							href="/"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground w-fit"
						>
							<Image
								src="/logo-short.svg"
								alt="logo"
								width={100}
								height={100}
								className="w-[100px]"
							/>
						</Link>
						<div
							className="flex justify-end pt-2"
							onClick={() => setOpen((prev) => !prev)}
						>
							<Button
								size="icon"
								variant="outline"
								className="rounded-full p-1"
							>
								<X className="w-4 h-4" />
								<span className="sr-only">Close</span>
							</Button>
						</div>
					</div>
					<div className="py-5 h-[70px]">
						{stores && (
							<StoreSwitcher
								items={stores}
								className="w-full"
								setIsRefreshing={setIsRefreshing}
							/>
						)}
					</div>
					<Separator orientation="horizontal" />
					<nav className="flex flex-col justify-between gap-12 py-3">
						<div className="flex flex-col gap-4">
							<div className="grid gap-4 font-medium">
								{links.slice(0, 4).map(({ href, icon, label }) => (
									<Link
										href={href}
										key={href}
										onClick={() => setOpen((prev) => !prev)}
										className={`${
											pathname === href && "bg-clr-2"
										} flex items-center gap-4 px-2.5 text-muted-foreground  p-[2px] rounded-md hover:text-clr-7`}
									>
										<div className={`${pathname === href && "text-clr-7"}`}>
											{icon}
										</div>
										{label}
									</Link>
								))}
							</div>
							<Separator orientation="horizontal" />
							<div className="grid gap-4 font-medium">
								{links.slice(4, 8).map(({ href, icon, label }) => (
									<Link
										href={href}
										key={href}
										onClick={() => setOpen((prev) => !prev)}
										className={`${
											pathname === href && "bg-clr-2"
										} flex items-center gap-4 px-2.5 text-muted-foreground  p-[2px] rounded-md hover:text-clr-7`}
									>
										<div className={`${pathname === href && "text-clr-7"}`}>
											{icon}
										</div>
										{label}
									</Link>
								))}
							</div>
						</div>
					</nav>

					<nav>
						<div className="absolute bottom-3 left-2 right-2">
							<Separator orientation="horizontal" />
							<div className="grid gap-3 font-medium">
								{links.slice(8, 12).map(({ href, icon, label }) => (
									<Link
										href={href}
										key={href}
										onClick={() => setOpen((prev) => !prev)}
										className={`${
											pathname === href && "bg-clr-2"
										} flex items-center gap-4 px-2.5 text-muted-foreground  p-[2px] rounded-md hover:text-clr-7`}
									>
										<div className={`${pathname === href && "text-clr-7"}`}>
											{icon}
										</div>
										{label}
									</Link>
								))}
							</div>
						</div>
					</nav>
				</div>
			</nav>
			<div className="md:flex items-center gap-5 hidden">
				{stores && (
					<StoreSwitcher
						items={stores}
						className="w-full"
						setIsRefreshing={setIsRefreshing}
					/>
				)}
			</div>
			<div className="relative flex-1 ml-auto md:grow-0">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search..."
					className="w-full bg-background pl-8 md:w-[200px] lg:w-[336px]"
				/>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="overflow-hidden rounded-full"
					>
						<BellIcon className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="overflow-hidden rounded-full"
					>
						<Avatar>
							<AvatarImage src={userlogo as string} alt={userEmail as string} />
							<AvatarFallback>
								{userEmail?.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<SignOutButton />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
