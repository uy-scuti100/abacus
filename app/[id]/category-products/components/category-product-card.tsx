import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function CategoryProductcard({
	product,
	paramsId,
}: {
	product: Product;
	paramsId: string;
}) {
	return (
		<Link
			href={`/${paramsId}/products/${product.id}`}
			className="flex items-center gap-4"
		>
			<div className="relative w-full h-auto min-w-[180px] shadow-xl overflow-hidden rounded-2xl group">
				<Image
					src={product.media[0] as string}
					alt={product.title as string}
					width={1500}
					height={1500}
					className="object-cover w-full h-full transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out "
					sizes="(max-width: 480px) 100vw,
                                        (max-width: 768px) 75vw,
                                        (max-width: 1060px) 50vw,
                                        33vw"
				/>
				<div
					className="group-hover:absolute inset-0 z-50 bg-blend-difference"
					style={{
						background:
							"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 3%, rgba(0, 0, 0, .6) 100%)",
					}}
				></div>
				<div className="absolute bg-white w-full flex items-center justify-center h-12 px-3 bottom-0 left- right-0">
					<h3 className="font-semibold text-center capitalize text-xs z-[100] group-hover:text-white">
						{product.title}
					</h3>
				</div>
			</div>
		</Link>
	);
}

// <div className="flex items-center gap-2 absolute">
// 	<Link
// 		href={`/${paramsId}/products/${product.id}`}
// 		className={cn(
// 			buttonVariants({ variant: "default" }),
// 			"rounded-full py-6 px-4 "
// 		)}
// 	>
// 		<Edit className="h-4 w-4" />
// 	</Link>
// </div>
