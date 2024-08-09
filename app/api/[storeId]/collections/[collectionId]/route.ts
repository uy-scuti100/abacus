// global imports
import { createSupabaseServer } from "@/supabase/server";
import { NextResponse } from "next/server";

// get  category controller
export async function GET(
	req: Request,
	{ params }: { params: { collectionId: string } }
) {
	try {
		if (!params.collectionId) {
			return new NextResponse("category Id is required", { status: 400 });
		}
		const supabase = createSupabaseServer();
		const { data, error } = await supabase
			.from("collection")
			.select("*")
			.eq("id", params.collectionId)
			.single();

		if (error) {
			console.error(`Error fetching data from collection:`, error);
			return new NextResponse("Error fetching collection", { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.log("[COLLECTION_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
