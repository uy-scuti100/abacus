import { createSupabaseServer } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	const supabase = createSupabaseServer();
	try {
		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("store_id", params.storeId)
			.order("created_at", { ascending: false });

		if (error) {
			console.error(`Error fetching data from products:`, error);
			return new NextResponse("Error fetching products", { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.log("[PRODUCTS_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
