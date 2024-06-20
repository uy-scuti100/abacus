import { Button, buttonVariants } from "@/components/ui/button";
import useFetchData from "@/hooks/useFetchCategories";
import { cn } from "@/lib/utils";
import { createSupabaseServer } from "@/supabase/server";
import { Product } from "@/types";
import Link from "next/link";

export default async function Page({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const storeId = params.id;
	const categoryId = searchParams.categoryId as string | undefined;
	const supabase = createSupabaseServer();

	if (storeId && categoryId) {
		const { data: products, error } = await supabase
			.from("products")
			.select("*")
			.eq("store_id", storeId)
			.eq("category_id", categoryId);

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
							<p>{product.description}</p>
							<p>Price: {product.price}</p>
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
				No products found in this category
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
