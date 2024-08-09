// global imports

import { createSupabaseServer } from "@/supabase/server";
import { NextResponse } from "next/server";

// get  category controller
export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		if (!params.categoryId) {
			return new NextResponse("category Id is required", { status: 400 });
		}
		const supabase = createSupabaseServer();
		const { data, error } = await supabase
			.from("category")
			.select("*")
			.eq("id", params.categoryId)
			.single();

		if (error) {
			console.error(`Error fetching data from categorys:`, error);
			return new NextResponse("Error fetching categorys", { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.log("[CATEGoRY_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
