"use client";

import { createSupabaseBrowser } from "@/supabase/client";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ storeId }: { storeId: string }) {
	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const supabase = createSupabaseBrowser();
	const router = useRouter();

	// Initial fetch of 20 products
	useEffect(() => {
		const fetchInitialProducts = async () => {
			setLoading(true); // Start loading
			const { data: initialProducts, error: initialError } = await supabase
				.from("products")
				.select("*")
				.eq("store_id", storeId)
				.limit(20); // Fetch the first 20 products

			if (initialError) {
				console.error(initialError);
				setLoading(false);
				return;
			}

			if (initialProducts) {
				setProducts(initialProducts);
			}
			setLoading(false);
		};

		fetchInitialProducts();
	}, [storeId, supabase]);

	// Fetch more products on scroll
	useEffect(() => {
		const fetchProducts = async () => {
			if (!hasMore) return;

			setLoading(true);
			const { data: newProducts, error: productsError } = await supabase
				.from("products")
				.select("*")
				.eq("store_id", storeId)
				.range((page - 1) * 20, page * 20 - 1);

			if (productsError) {
				console.error(productsError);
				setLoading(false);
				return;
			}

			if (newProducts && newProducts.length > 0) {
				setProducts((prevProducts) => {
					const productIds = new Set(prevProducts.map((product) => product.id));
					const uniqueProducts = newProducts.filter(
						(product) => !productIds.has(product.id)
					);
					return [...prevProducts, ...uniqueProducts];
				});
				setHasMore(newProducts.length === 20);
			} else {
				setHasMore(false);
			}

			setLoading(false);
		};

		fetchProducts();
	}, [page, storeId, supabase, hasMore]);

	// Scroll event listener
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop !==
					document.documentElement.offsetHeight ||
				loading ||
				!hasMore
			)
				return;
			setPage((prevPage) => prevPage + 1);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loading, hasMore]);

	return (
		<section className="relative">
			<div className="pt-10">
				<div className="grid grid-cols-2 mt-5 gap-x-3 gap-y-16 lg:grid-cols-3 md:grid-cols-2">
					{products.map((item, index) => {
						return (
							<div className="flex flex-col gap-5" key={index}>
								<Link
									href={`/${storeId}/store-visualizer/${item.id}`}
									className="flex flex-col w-full h-[280px] sm:h-[287px]  md:h-[300px]  lg:h-[500px] gap-2 overflow-hidden rounded-2xl"
								>
									<div className="relative w-full h-auto min-w-[180px] shadow-xl overflow-hidden rounded-2xl group">
										<Image
											src={item.media[0]}
											alt={item.title}
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

										<div className="absolute z-50 px-2 py-1 text-[10px] font-medium text-white uppercase bg-ash left-3 font-mont bottom-3 backdrop-blur-2xl">
											{item.brand}
										</div>
									</div>
								</Link>
								{/* <div>
								
									<h4 className="text-sm font-medium mb-1 capitalize">
										{item.title.substring(0, 16)}...
									</h4>
									<h5 className="text-xs font-bold">${item.price}</h5>
								</div> */}
							</div>
						);
					})}
				</div>
				{loading && (
					<p className="text-center mt-4">Loading more products...</p>
				)}
			</div>
			{/* ... other components ... */}
			{/* <h4 className="text-3xl font-black">{index + 1}</h4> */}
			{/* Add any additional product details here */}
			{/* <h4 className="text-3xl font-black">{index + 1}</h4> */}
		</section>
	);
}
