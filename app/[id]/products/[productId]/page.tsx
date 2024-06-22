import { createSupabaseServer } from "@/supabase/server";
import { ProductForm } from "../_components/product-form";

export default async function page({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const storeId = params.id;
	const productId = searchParams.productId as string | undefined;
	const supabase = createSupabaseServer();
	const { data: product, error } = await supabase
		.from("products")
		.select("*")
		.eq("store_id", storeId)
		.eq("id", productId as string)
		.single();

	const { data: categories, error: catError } = await supabase
		.from("category")
		.select("*")
		.eq("store_id ", params.id);
	const { data: collections, error: colError } = await supabase
		.from("category")
		.select("*")
		.eq("store_id ", params.id);

	return (
		<div>
			<ProductForm
				storeId={storeId}
				initialData={product}
				categories={categories}
				collections={collections}
			/>
		</div>
	);
}
