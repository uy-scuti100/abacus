import { createSupabaseServer } from "@/supabase/server";
import { ProductForm } from "../_components/product-form";

export default async function page({
	params,
}: {
	params: { id: string; productId: string };
}) {
	const storeId = params.id;
	const productId = params.productId;
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
		.from("collection")
		.select("*")
		.eq("store_id ", params.id);

	return (
		<div className="p-4">
			<ProductForm
				storeId={storeId}
				initialData={product}
				categories={categories}
				collections={collections}
			/>
		</div>
	);
}
