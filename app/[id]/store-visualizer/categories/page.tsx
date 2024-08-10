import { createSupabaseServer } from "@/supabase/server";
import { Category } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
	const supabase = createSupabaseServer();
	const storeId = params.id;
	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;
	if (!userId) {
		redirect("/login");
	}

	const { data: store, error } = await supabase
		.from("stores")
		.select("*")
		.eq("id", storeId)
		.single();
	if (error || !store) {
		redirect("/");
	}

	const { data: categories, error: categoriesError } = await supabase
		.from("category")
		.select("*")
		.eq("store_id", storeId);
	if (categoriesError) {
		console.error(categoriesError);
	}
	return (
		<div className="mt-20 p-4">
			<h2 className="text-4xl text-center font-medium mt-5 ">Categories</h2>
			<div className="grid grid-cols-2 mt-5 gap-x-3 gap-y-16 lg:grid-cols-3 md:grid-cols-2">
				{categories?.map((item: Category, index) => {
					return (
						<div className="flex flex-col gap-5 " key={index}>
							<div className="flex flex-col w-full h-[280px] sm:h-[287px]  md:h-[300px]  lg:h-[500px] gap-2 overflow-hidden rounded-2xl">
								<div className="relative w-full h-full ">
									<Image
										src={item.avatar as string}
										alt={item.name as string}
										fill
										className="w-full h-full object-cover"
									/>
									<div
										className="absolute inset-0 z-20"
										style={{
											background:
												"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 5%, rgba(0, 0, 0, .1) 100%)",
										}}
									/>
								</div>
							</div>
							<div>
								{/* <h4 className="text-3xl font-black">{index + 1}</h4> */}
								<h4 className="text-sm font-medium mb-1 capitalize">
									{item.name.substring(0, 22)}...
								</h4>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
