import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createSupabaseServer } from "@/supabase/server";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const supabase = createSupabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}
	const storeId = params.id;
	const collectionId = searchParams.collectionId as string | undefined;
	const collectionName = searchParams.collectionName as string | undefined;
	const collectionAvatar = searchParams.collectionAvatar as string | undefined;
	const collectionProductCount = searchParams.collectionProductCount as
		| string
		| undefined;

	if (storeId && collectionId) {
		const { data: products, error } = await supabase
			.from("products")
			.select("*")
			.eq("store_id", storeId)
			.eq("collection_id", collectionId);

		if (error) {
			console.error(`Error fetching products: ${error.message}`);
			return <div>Error fetching products: {error.message}</div>;
		}

		if (products.length > 0) {
			return (
				<div>
					<div>{products.length}</div>

					{products.map((product) => (
						<div key={product.id}>
							<h2>{product.title}</h2>
							{/* <p>{product.description}</p> */}
							{/* <p>Price: {product.price}</p> */}
							{/* Add more product details as needed */}
						</div>
					))}
				</div>
			);
		}
	}

	return (
		<div className="py-20 flex justify-center items-center flex-col gap-10">
			{" "}
			<h1 className="text-center text-2xl ">
				No products found in this collection
			</h1>
			<Link
				href={"/store"}
				className={cn(buttonVariants({ variant: "default" }))}
			>
				Back to store
			</Link>
		</div>
	);
}
