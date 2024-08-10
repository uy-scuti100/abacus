import { createSupabaseServer } from "@/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Studiolayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const supabase = createSupabaseServer();
	const storeId = params.id;
	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;

	if (!userId) {
		redirect("/login");
	}

	const { data: store, error } = await supabase
		.from("stores")
		.select("*")
		.eq("id", storeId)
		.single();

	if (error || !store) {
		redirect("/");
	}
	return (
		<div className="max-w-7xl px-4 sm:px-6 lg:px-8">
			<nav className="flex justify-between items-center py-2 border-b mx-auto ">
				<Link href={`/${storeId}/store-visualizer`}>
					<h1 className="uppercase">{store?.name}</h1>
				</Link>
				<menu>
					<ul className="flex gap-2 text-xs">
						<li>
							<Link
								// className={cn(buttonVariants({ variant: "outline" }))}
								href={`/${storeId}/store-visualizer/categories`}
							>
								Categories
							</Link>
						</li>
						<li>
							<Link
								// className={cn(buttonVariants({ variant: "outline" }))}
								href={`/${storeId}/store-visualizer/collections`}
							>
								Collections
							</Link>
						</li>
					</ul>
				</menu>
			</nav>
			{children}
		</div>
	);
}
