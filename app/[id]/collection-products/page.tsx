import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createSupabaseServer } from "@/supabase/server";

import { Edit } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { redirect } from "next/navigation";
import CategoryProductcard from "../category-products/components/category-product-card";

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
	const collectionId = searchParams.collectionId as string | undefined;
	const collectionName = searchParams.collectionName as string | undefined;
	const collectionAvatar = searchParams.collectionAvatar as string | undefined;
	const collectionProductCount = searchParams.collectionProductCount as
		| string
		| undefined;

	if (storeId && collectionId) {
		const { data: products, error } = await supabase
			.from("products")
			.select("*")
			.eq("store_id", storeId)
			.eq("collection_id", collectionId);

		if (error) {
			console.error(`Error fetching products: ${error.message}`);
			return <div>Error fetching products: {error.message}</div>;
		}

		if (products.length > 0) {
			return (
				<section className="w-full">
					<div className="relative h-[200px] sm:h-[200px] w-full">
						<Image
							src={collectionAvatar as string}
							alt={collectionName as string}
							width={100}
							height={100}
							className="w-full h-full object-cover blur-md brightness-[80%]"
						/>
					</div>
					<div className="py-20 z-[550] px-3 md:px-10 -translate-y-32 grid grid-cols-1 lg:grid-cols-8 gap-6 h-full w-full">
						<div className="order-2 lg:order-1 lg:col-span-6 bg-white rounded-2xl p-5">
							<h2 className="text-xl md:text-[22px] font-bold capitalize text-center border-b pb-8">
								<span className="text-slate-500">{collectionProductCount}</span>{" "}
								Products in {collectionName} collection
							</h2>

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
						<div className="md:sticky top-56 order-1 h-fit lg:order-2 lg:col-span-2 bg-white rounded-2xl pb-5 overflow-hidden">
							<div className="h-[200px] relative w-full mb-10">
								<Image
									src={collectionAvatar as string}
									alt={collectionName as string}
									fill
									className="w-full h-auto object-cover"
								/>
							</div>
							<div className="px-3">
								<div className="flex justify-between items-center">
									<h1 className="text-xl font-bold capitalize">
										{/* {collectionName} */}
									</h1>
									<div className="flex items-center gap-2">
										<div>
											<h4 className="text-sm font-semibold">Edit category</h4>
										</div>
										<Link
											href={`/${params?.id}/categories/${collectionId}`}
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
				No products found in this collection
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
