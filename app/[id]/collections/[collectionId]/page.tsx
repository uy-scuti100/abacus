import { createSupabaseServer } from "@/supabase/server";
import { CollectionForm } from "../_components/collection-form";

export default async function page({
	params,
}: {
	params: { collectionId: string };
}) {
	const supabase = createSupabaseServer();
	const { data: category, error } = await supabase
		.from("collection")
		.select("*")
		.eq("id", params.collectionId)
		.single();
	return (
		<div className="p-4">
			<CollectionForm initialData={category} />
		</div>
	);
}
