// global imports

import { createSupabaseServer } from "@/supabase/server";
import { NextResponse } from "next/server";

// get  product controller
export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		if (!params.productId) {
			return new NextResponse("Product Id is required", { status: 400 });
		}
		const supabase = createSupabaseServer();
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", params.productId)
			.single();

		if (error) {
			console.error(`Error fetching data from products:`, error);
			return new NextResponse("Error fetching products", { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.log("[PRODUCT_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
