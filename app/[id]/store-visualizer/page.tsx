import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createSupabaseServer } from "@/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductsFile from "./components/products";

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

	return (
		<section className="relative">
			<div className="mt-10 w-full mx-auto">
				<div className="flex flex-col gap-2 justify-center w-full items-center">
					<h1 className="text-5xl text-center md:text-7xl font-bold leading-[155%]">
						Welcome to <br /> {store?.name}'s Store
					</h1>
					<div className="mt-5 md:mt-0">
						<Image
							src={"/e-com-svg.svg"}
							alt="e-com-svg"
							width={500}
							height={500}
							className="object-contain md:h-[500px] md:w-[800px]"
						/>
					</div>
				</div>
			</div>
			<div className="mt-20">
				<h2 className="text-4xl text-center font-medium">Products</h2>

				<div className="mt-5">
					<ProductsFile storeId={storeId} />
				</div>
			</div>
		</section>
	);
}
