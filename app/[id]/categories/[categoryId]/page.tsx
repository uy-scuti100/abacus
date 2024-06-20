import { createSupabaseServer } from "@/supabase/server";
import { CategoryForm } from "../_components/category-form";

export default async function page({
	params,
}: {
	params: { categoryId: string };
}) {
	const supabase = createSupabaseServer();
	const { data: category, error } = await supabase
		.from("category")
		.select("*")
		.eq("id", params.categoryId)
		.single();
	return (
		<div>
			<CategoryForm initialData={category} />
		</div>
	);
}
