import { Badge } from "@/components/ui/badge";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CategoryCardsWrapper({
	storeId,
	categories,
}: {
	storeId: string;
	categories: Category[] | undefined;
}) {
	const [isImageLoading, setImageLoading] = useState(true);

	return (
		<>
			{categories && categories.length > 0 && (
				<div className="mt-10 mb-20">
					<div className="grid w-full h-full grid-cols-2 pb-6 gap-y-12 gap-x-3 md:grid-cols-3">
						{categories.map((category) => {
							const { name, avatar, id: categoryId, product_count } = category;
							return (
								<Link
									href={{
										pathname: `/${storeId}/category-products`,
										query: {
											categoryId: categoryId,
											categoryName: name,
											categoryAvatar: avatar,
											categoryProductCount: product_count,
										},
									}}
									key={categoryId}
									className="relative rounded-2xl border border-clr-2 w-full h-[250px] group overflow-hidden"
								>
									<Image
										style={{
											filter: isImageLoading
												? "blur(10px) transition: filter 0.3s ease-in"
												: "blur(0px) transition: filter 0.3s ease-in",
										}}
										src={avatar as string}
										alt={name}
										fill
										onLoad={() => setImageLoading(false)}
										className="transition-transform transform-gpu group-hover:scale-110 duration-700 ease-in-out object-cover"
										sizes="(max-width: 480px) 100vw,
                                        (max-width: 768px) 75vw,
                                        (max-width: 1060px) 50vw,
                                        33vw"
									/>

									<div
										className="absolute inset-0"
										style={{
											background:
												"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10%, rgba(0, 0, 0, .6) 100%)",
										}}
									></div>
									<p className="absolute p-2 text-xs font-semibold tracking-widest text-black uppercase bg-white left-5 font-mont bottom-5 sm:bottom-10 rounded-full text-balance text-center">
										{name}
									</p>
									<Badge
										variant={"custom"}
										className="absolute top-2 right-2 text-sm"
									>
										{product_count}
									</Badge>
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
}
