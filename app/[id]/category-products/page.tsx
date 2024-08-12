import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createSupabaseServer } from "@/supabase/server";
import { Edit } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import CategoryProductcard from "./components/category-product-card";
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
	const categoryId = searchParams.categoryId as string | undefined;
	const categoryName = searchParams.categoryName as string | undefined;
	const categoryAvatar = searchParams.categoryAvatar as string | undefined;
	const categoryProductCount = searchParams.categoryProductCount as
		| string
		| undefined;

	if (storeId && categoryId) {
		const { data: products, error } = await supabase
			.from("products")
			.select("*")
			.eq("store_id", storeId)
			.contains("category_id", [categoryId]);

		if (error) {
			console.error(`Error fetching products: ${error.message}`);
			return <div>Error fetching products: {error.message}</div>;
		}
		// console.log(products);

		if (products.length > 0) {
			return (
				<section className="w-full">
					<div className="relative h-[200px] sm:h-[200px] w-full">
						<Image
							src={categoryAvatar as string}
							alt={categoryName as string}
							width={100}
							height={100}
							className="w-full h-full object-cover blur-md brightness-[80%]"
						/>
					</div>
					<div className="py-10 z-[550] px-3 md:px-10 -translate-y-32 grid grid-cols-1 lg:grid-cols-8 gap-6 h-full w-full">
						<div className="order-2 lg:order-1 lg:col-span-6 bg-white rounded-2xl p-5">
							<h2 className="text-xl md:text-[22px] font-bold capitalize text-center border-b pb-8">
								<span className="text-slate-500">{categoryProductCount}</span>{" "}
								Products in {categoryName} category
							</h2>

							{/* <div className="flex items-center w-full gap-6"> */}
							<div className="grid grid-cols-1 mt-5 gap-x-3 gap-y-16 lg:grid-cols-3 md:grid-cols-2">
								{products.map((product) => (
									<CategoryProductcard
										key={product.id}
										product={product}
										paramsId={storeId}
									/>
								))}
							</div>
						</div>
						<div className="md:sticky top-56 order-1 h-fit lg:order-2 lg:col-span-2 bg-white rounded-2xl pb-2 overflow-hidden">
							<div className="h-[200px] relative w-full mb-10">
								<Image
									src={categoryAvatar as string}
									alt={categoryName as string}
									fill
									className="w-full h-auto object-cover"
								/>
							</div>
							<div className="px-3">
								<div className="flex justify-between items-center">
									<h1 className="text-xl font-bold capitalize">
										{/* {categoryName} */}
									</h1>
									<div className="flex items-center gap-2">
										<div>
											<h4 className="text-sm font-semibold">Edit category</h4>
										</div>
										<Link
											href={`/${params?.id}/categories/${categoryId}`}
											className={cn(
												buttonVariants({ variant: "default" }),
												"rounded-full py-6 px-4 "
											)}
										>
											<Edit className="h-4 w-4" />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
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

{
	<div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
		<h1 className="text-4xl text-white uppercase font-bold">
			{/* {categoryName} */}
		</h1>
	</div>;
}
