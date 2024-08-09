import { Badge } from "@/components/ui/badge";
import { Collection } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CollectionCardsWrapper({
	storeId,
	collections,
}: {
	storeId: string;
	collections: Collection[] | undefined;
}) {
	const [isImageLoading, setImageLoading] = useState(true);

	return (
		<>
			{collections && collections.length > 0 && (
				<div className="mt-10 mb-20">
					<div className="grid w-full h-full grid-cols-2 pb-6 gap-y-12 gap-x-3 md:grid-cols-3">
						{collections.map((collection) => {
							const {
								name,
								avatar,
								id: collectionId,
								product_count,
							} = collection;
							return (
								<Link
									href={{
										pathname: `/${storeId}/collection-products`,
										query: { collectionId: collectionId },
									}}
									key={collectionId}
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
