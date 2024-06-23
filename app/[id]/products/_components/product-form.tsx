"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertModal } from "@/providers/modals/alertModal";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Edit, Trash, Trash2, X } from "lucide-react";
import Heading from "@/providers/heading";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleImageUpload from "@/providers/multiple-image uploader";
import { Category, Collection, Product } from "@/types";
import useUser from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaQuestion } from "react-icons/fa6";
import { ProductModal } from "./additional-info-modal";
import { VariantModal } from "./variant-modal";
import { createSupabaseBrowser } from "@/supabase/client";
import { cn, generateSlug } from "@/lib/utils";

const modules = {
	toolbar: [
		[
			{ header: "1" },
			{ header: "2" },
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
			"blockquote",
			"strike",
			"underline",
			"italic",
			"bold",
		],
	],
};

const formats = [
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
];

const ProductFormDataSchema = z.object({
	title: z.string().min(2),
	categoryId: z.array(z.string().min(1)),
	collectionId: z.string().min(1).optional(),
	ribbon: z.string().optional(),
	status: z.string().min(1),
	media: z.object({ url: z.string() }).array(),
	type: z.string().min(1),
	brand: z.string().optional(),
	price: z.coerce.number().min(1),
	on_sale: z.boolean().default(false).optional(),
	cost_of_good: z.coerce.number().optional(),
	inventory: z.string().optional(),
	sku: z.string().optional(),
	description: z.string().min(1),
});

type ProductFormValues = z.infer<typeof ProductFormDataSchema>;

interface ProductFormProps {
	initialData: Product | null;
	categories: Category[] | null;
	collections: Collection[] | null;
	storeId: string;
}
interface Variant {
	title: string;
	values: { label: string; value: string }[];
}
interface AdditionalInfo {
	title: string;
	description: string;
}
export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories,
	collections,
	storeId,
}) => {
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [openVariantModal, setOpenVariantModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const user = useUser();
	const userId = user.data?.id;
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const title = initialData ? "Edit product" : "Add product";
	const description = initialData ? "Edit a product." : "Create a new product";
	const action = initialData ? "Save changes" : "Create product";
	const params = useParams();
	const router = useRouter();
	const defaultValues = initialData
		? {
				...initialData,
		  }
		: {
				vendor_id: "",
				store_id: "",
				title: "",
				categoryId: [],
				collectionId: "",
				status: "",
				ribbon: "",
				media: [],
				type: "",
				brand: "",
				price: 0,
				on_sale: false,
				cost_of_good: 0,
				inventory: "",
				sku: "",
				slug: "",
				description: "",
				additional_information: [],
				variants: [],
		  };
	const form = useForm<ProductFormValues>({
		resolver: zodResolver(ProductFormDataSchema),
		defaultValues: defaultValues as ProductFormValues,
	});
	const onSubmit = async (values: z.infer<typeof ProductFormDataSchema>) => {
		try {
			setIsLoading(true);
			const supabase = createSupabaseBrowser();
			const slug = generateSlug(values.title);

			const category_id = Array.isArray(values.categoryId)
				? values.categoryId
				: [];
			const updatedProductData = {
				title: values.title.toLowerCase(),
				media: values.media ? values.media.map((image) => image.url) : [],
				description: values.description,
				additional_information:
					additionalInfo.length > 0 ? JSON.stringify(additionalInfo) : null,
				brand: values.brand || null,
				collection_id: values.collectionId || null,
				category_id,
				cost_of_good: values.cost_of_good || null,
				inventory: values.inventory || null,
				on_sale: values.on_sale || false,
				price: values.price,
				ribbon: values.ribbon || null,
				sku: values.sku || null,
				status: values.status,
				store_id: storeId,
				type: values.type,
				variants: variants.length > 0 ? JSON.stringify(variants) : null,
				vendor_id: userId as string,
				slug: slug,
			};

			console.log("Updated Product Data:", updatedProductData);

			let response;
			if (initialData) {
				// Update existing product
				response = await supabase
					.from("products")
					.update(updatedProductData)
					.eq("id", initialData.id)
					.select();
			} else {
				// Create new product
				if (!userId) throw new Error("Vendor ID is required");

				const formData = {
					...updatedProductData,
					slug: slug,
				};

				response = await supabase.from("products").insert([formData]).select();
			}

			const { data: product, error } = response;

			if (error) {
				console.error("Supabase Error:", error);
				toast.error(
					initialData
						? "Failed to update Product!"
						: "Failed to create Product!"
				);
				router.refresh();
				return;
			}

			if (product) {
				toast.success(initialData ? "Product Updated!" : "Product Created!");
				window.location.assign(`/${params.id}/products`);
				router.refresh();
			} else {
				toast.error(
					initialData
						? "Failed to update Product!"
						: "Failed to create product!"
				);
				router.refresh();
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);
			// setIsRefreshing(true);
			const supabase = createSupabaseBrowser();
			const { error } = await supabase
				.from("products")
				.delete()
				.eq("id", params.productId)
				.select();
			if (!error) {
				toast.success("Product deleted!");
				setIsRefreshing(true);
				router.refresh();
			} else {
				toast.error("Failed to delete Product");
				console.error("Error deleting Product:", error);
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};

	const selectedCategories = form.watch("categoryId").map((id) => {
		const category = categories?.find((category) => category.id === id);
		return category ? category.name : "";
	});
	const onRemoveCategory = (id: string) => {
		const currentCategories = form.getValues("categoryId");
		form.setValue(
			"categoryId",
			currentCategories.filter((categoryId) => categoryId !== id)
		);
	};

	// pricing calculations

	const [priceValue, setPriceValue] = useState(0);
	const [costOfGoodValue, setCostOfGoodValue] = useState(0);
	const [profit, setProfit] = useState(0);
	const [margin, setMargin] = useState(0);
	const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo[]>([]);

	const [variants, setVariants] = useState<Variant[]>([]);
	const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
	const [currentVariantEditIndex, setCurrentVariantEditIndex] = useState<
		number | null
	>(null);
	const [currentVariant, setCurrentVariant] = useState({
		title: "",
		values: [{ label: "", value: "" }],
	});

	const [currentData, setCurrentData] = useState({
		title: "",
		description: "",
	});

	const handlePriceChange = (e: { target: { value: any } }) => {
		const newPrice = Number(e.target.value) || 0;
		setPriceValue(newPrice);
	};

	const handleCostOfGoodChange = (e: { target: { value: any } }) => {
		const newCost = Number(e.target.value) || 0;
		setCostOfGoodValue(newCost);
	};
	useEffect(() => {
		const calculateProfit = () => {
			return priceValue - costOfGoodValue;
		};

		const calculateMargin = () => {
			if (priceValue === 0) return 0;
			return ((priceValue - costOfGoodValue) / priceValue) * 100;
		};

		const newProfit = calculateProfit();
		const newMargin = calculateMargin();

		setProfit(newProfit);
		setMargin(newMargin);
	}, [priceValue, costOfGoodValue]);

	// product types

	const typesOfproduct = [
		{
			id: 1,
			value: "Physical Product",
		},
		{
			id: 2,
			value: "Digital Product",
		},
		{
			id: 3,
			value: "Service Based Product",
		},
	];
	const productStatus = [
		{
			id: 1,
			value: "Available",
		},
		{
			id: 2,
			value: "Un-Available",
		},
	];

	const addDataToSection = (title: string, description: string) => {
		if (currentEditIndex !== null) {
			// Edit mode
			const newAdditionalInfo = [...additionalInfo];
			newAdditionalInfo[currentEditIndex] = { title, description };
			setAdditionalInfo(newAdditionalInfo);
			setCurrentEditIndex(null);
		} else {
			// Add mode
			setAdditionalInfo([...additionalInfo, { title, description }]);
		}
	};

	const deleteAdditionalInfo = (index: number) => {
		const newAdditionalInfo = additionalInfo.filter((_, i) => i !== index);
		setAdditionalInfo(newAdditionalInfo);
	};
	const handleEditClick = (index: number) => {
		setCurrentEditIndex(index);
		setCurrentData(additionalInfo[index]);
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setCurrentEditIndex(null);
		setCurrentData({ title: "", description: "" });
	};

	const addVariant = (
		title: string,
		values: { label: string; value: string }[]
	) => {
		if (currentVariantEditIndex !== null) {
			const newVariants = [...variants];
			newVariants[currentVariantEditIndex] = { title, values };
			setVariants(newVariants);
			setCurrentVariantEditIndex(null);
		} else {
			setVariants([...variants, { title, values }]);
		}
		setCurrentVariant({ title: "", values: [{ label: "", value: "" }] }); // Reset currentVariant after adding/updating
	};

	const handleVariantEditClick = (index: number) => {
		setCurrentVariantEditIndex(index);
		setCurrentVariant(variants[index]);
		setOpenVariantModal(true);
	};

	const deleteVariant = (index: number) => {
		const newVariants = variants.filter((_, i) => i !== index);
		setVariants(newVariants);
	};

	const handleVariantCloseModal = () => {
		setOpenVariantModal(false);
		setCurrentVariantEditIndex(null);
		setCurrentVariant({ title: "", values: [{ label: "", value: "" }] }); // Reset currentVariant when closing modal
	};

	return (
		<div>
			<AlertModal
				title="Are you sure you want to delete this product"
				description="This action cannot be reversed"
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>

			<div className="flex items-center justify-between px-4 my-3">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}
					>
						<Trash className="w-4 h-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-8 mt-3 sm:px-4"
				>
					<div className="gap-6 md:grid md:grid-cols-6">
						<div className="col-span-4 ">
							{/* basic information */}
							<div className="flex flex-col gap-4 bg-white p-2 pb-6 rounded-lg">
								<FormField
									control={form.control}
									name="media"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<>
													<MultipleImageUpload
														medias={field.value}
														disabled={loading}
														onChange={(updatedMedias) =>
															field.onChange(updatedMedias)
														}
														onRemove={(url) =>
															field.onChange(
																field.value.filter((image) => image)
															)
														}
													/>
													{/* <div>
														{field.value.map((image) => (
															<div key={image.url}>{image.url}</div>
														))}
													</div> */}
												</>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* title */}
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													disabled={loading}
													placeholder="Hoodies Warm Sweatshirts"
													className="h-12 rounded-lg"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* description */}
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<>
													<ReactQuill
														modules={modules}
														formats={formats}
														theme="snow"
														style={{
															height: 150,
															borderRadius: "2px solid red",
															marginBottom: "40px",
														}}
														{...field}
														placeholder="Product description"
														defaultValue={defaultValues.description}
													/>
												</>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* collection */}
								<FormField
									control={form.control}
									name="collectionId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Collection</FormLabel>
											<span>
												<Badge className="ml-2" variant={"custom"}>
													Optional
												</Badge>
											</span>

											<Select
												disabled={loading}
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															defaultValue={field.value}
															placeholder="Select a collection"
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{collections?.map((collection) => (
														<SelectItem
															key={collection.name}
															value={collection.id}
														>
															{collection.name}
														</SelectItem>
													))}
													<Link
														href={`/${storeId}/collections/new`}
														className="p-1 text-xs font-semibold rounded-full text-balance ml-5 bg-primary text-white"
													>
														Add new collection
													</Link>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* category */}
								<Drawer>
									<FormLabel className="md:hidden">Categories</FormLabel>
									{selectedCategories.length > 0 && (
										<ul className="flex items-center my-2 gap-2">
											{selectedCategories.map((name, index) => {
												const categoryId = categories?.find(
													(category) => category.name === name
												)?.id;
												return (
													<div key={index} className="relative">
														<Badge className="text-sm hover:bg-primary px-6">
															{name}
														</Badge>
														<div
															className="p-1 absolute right-[-2px] top-[-10px] flex justify-center items-center cursor-pointer bg-destructive rounded-full"
															onClick={() =>
																categoryId && onRemoveCategory(categoryId)
															}
														>
															<X className="w-3 h-3 text-white" />
														</div>
													</div>
												);
											})}
										</ul>
									)}

									<DrawerTrigger asChild>
										<Button
											variant="secondary"
											className="hover:text-foreground rounded-lg md:hidden"
										>
											{selectedCategories.length > 1
												? "Select more categories"
												: "Select categories"}
										</Button>
									</DrawerTrigger>
									<DrawerContent>
										<div className="px-5 w-full max-w-sm py-5">
											<FormField
												control={form.control}
												name="categoryId"
												render={() => (
													<FormItem>
														<div className="mb-4">
															<FormLabel className="text-base">
																Category
															</FormLabel>
														</div>
														<div className="flex flex-col gap-6 pb-6">
															{categories?.map((item) => (
																<FormField
																	key={item.id}
																	control={form.control}
																	name="categoryId"
																	render={({ field }) => {
																		return (
																			<FormItem
																				key={item.id}
																				className="flex flex-row items-start space-x-3 space-y-0"
																			>
																				<FormControl>
																					<Checkbox
																						checked={field.value?.includes(
																							item.id
																						)}
																						onCheckedChange={(checked) => {
																							return checked
																								? field.onChange([
																										...field.value,
																										item.id,
																								  ])
																								: field.onChange(
																										field.value?.filter(
																											(value) =>
																												value !== item.id
																										)
																								  );
																						}}
																					/>
																				</FormControl>
																				<FormLabel className="font-normal">
																					{item.name}
																				</FormLabel>
																			</FormItem>
																		);
																	}}
																/>
															))}
														</div>
														<Link
															href={`/${storeId}/categories/new`}
															className={`${cn(
																buttonVariants({ variant: "secondary" })
															)}py-2 px-6 text-xs font-semibold rounded-full text-balance`}
														>
															Create a new category
														</Link>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</DrawerContent>
								</Drawer>
							</div>
							{/* pricing */}
							<div className="flex flex-col gap-4 bg-white p-2 pb-6 rounded-lg mt-6">
								{/* price */}
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input
													type="number"
													disabled={loading}
													placeholder="9.99"
													{...field}
													onChange={(e) => {
														field.onChange(e);
														handlePriceChange(e);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* cost of good */}
								<FormField
									control={form.control}
									name="cost_of_good"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<div>
													<FormLabel>Cost of good</FormLabel>{" "}
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															The amount you are spending to produce and sell
															this product. Your customers won’t see this.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>
											<FormControl>
												<Input
													type="number"
													disabled={loading}
													placeholder="9.99"
													{...field}
													onChange={(e) => {
														field.onChange(e);
														handleCostOfGoodChange(e);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* profit */}
								<div className="flex flex-col gap-4 mt-4">
									<div className="h-12 flex items-center  justify-between px-2 rounded-lg border border-input">
										<div className="flex items-center gap-4">
											<span className="font-bold ">Profit: </span>
											<span>{profit.toFixed(2)}</span>
										</div>
										<div>
											<HoverCard>
												<HoverCardTrigger>
													<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
														<FaQuestion className="w-3 h-3" />
													</p>
												</HoverCardTrigger>
												<HoverCardContent>
													The price of the product minus your cost of goods.
													Your customers won’t see this.
												</HoverCardContent>
											</HoverCard>
										</div>
									</div>
									<div className="h-12 flex items-center  justify-between px-2 rounded-lg border border-input">
										<div className="flex items-center gap-4">
											<span className="font-bold">Margin: </span>
											<span>{margin.toFixed(2)}%</span>
										</div>
										<div>
											<HoverCard>
												<HoverCardTrigger>
													<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
														<FaQuestion className="w-3 h-3" />
													</p>
												</HoverCardTrigger>
												<HoverCardContent>
													The percentage of the price that’s left after
													deducting your cost of goods. Your customers won’t see
													this.
												</HoverCardContent>
											</HoverCard>
										</div>
									</div>
								</div>
							</div>
							{/* inventory */}
							<div className="flex md:hidden flex-col gap-4 bg-white p-2 pb-6 rounded-lg mt-6">
								<FormField
									control={form.control}
									name="inventory"
									render={({ field }) => (
										<FormItem>
											<div className="flex items-center justify-between">
												<div>
													<FormLabel>Inventory</FormLabel>{" "}
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															Track this product's inventory by adding stock
															quantities.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>

											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="20"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* sku */}
								<FormField
									control={form.control}
									name="sku"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<div>
													<FormLabel>SKU</FormLabel>
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															A “Stock Keeping Unit” is a unique code you can
															create for each product or variant you have in
															your store. Using SKUs helps with tracking
															inventory.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>
											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="e.g, SKU123456789"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* type */}
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<Select
												disabled={loading}
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															defaultValue={field.value}
															placeholder="Select a product type"
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{typesOfproduct?.map((collection) => (
														<SelectItem
															key={collection.id}
															value={collection.value}
														>
															{collection.value}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* status */}
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<Select
												disabled={loading}
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															defaultValue={field.value}
															placeholder="select the availability"
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{productStatus?.map((collection) => (
														<SelectItem
															key={collection.id}
															value={collection.value}
														>
															{collection.value}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* Ribbon */}
								<FormField
									control={form.control}
									name="ribbon"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<div>
													<FormLabel>Ribbon</FormLabel>
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															Add a label like “New Arrival” or “Sale” to make
															this product stand out. It’ll be displayed on your
															product widgets.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>

											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="e.g, New arrival, On-Sale"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="brand"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<div>
													<FormLabel>Brand</FormLabel>
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															Add a brand name to make this product stand out to
															customers.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>

											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="e.g, Louis Vuitton"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="on_sale"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start pl-2 py-4 space-x-3 space-y-0 border rounded-md">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>On Sale</FormLabel>
												<FormDescription>
													Is this product being sold at a discount?
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-col gap-4 bg-white p-2 pb-6 rounded-lg mt-6">
								<div>
									<FormLabel>Additional Info Section</FormLabel>{" "}
									<span>
										<Badge className="ml-2" variant={"custom"}>
											Optional
										</Badge>
									</span>
								</div>
								<p className="text-xs">
									Share information like return policy or care instructions with
									your customers.
								</p>
								<div className="flex flex-col gap-3">
									{additionalInfo.map((item, index) => (
										<div key={index}>
											<div className="relative p-2 border rounded-lg flex flex-col gap-4">
												<div className="">
													<h2 className="font-bold mb-2 capitalize ">
														{item.title}
													</h2>
													<p
														dangerouslySetInnerHTML={{
															__html: item.description,
														}}
														className="text-sm lowercase"
													></p>
												</div>
												<div className="flex items-center gap-3 justify-end w-full">
													<Button
														variant={"destructive"}
														className="flex justify-center items-center"
														onClick={() => deleteAdditionalInfo(index)}
													>
														<Trash2 className="w-4 h-4" />
													</Button>
													<Button
														variant={"secondary"}
														className="flex justify-center items-center"
														onClick={() => handleEditClick(index)}
													>
														<Edit className="w-4 h-4" />
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
								<Button
									type="button"
									variant={"secondary"}
									className="border border-clr-11 border-dotted"
									onClick={() => setOpenModal(true)}
								>
									Add Additional Info
								</Button>
							</div>
							<div className="flex flex-col gap-4 bg-white p-2 pb-6 rounded-lg mt-6">
								<div className="flex justify-between items-center">
									<div>
										<FormLabel>Product Variants</FormLabel>{" "}
										<span>
											<Badge className="ml-2" variant={"custom"}>
												Optional
											</Badge>
										</span>
									</div>
									<div>
										<HoverCard>
											<HoverCardTrigger>
												<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
													<FaQuestion className="w-3 h-3" />
												</p>
											</HoverCardTrigger>
											<HoverCardContent>
												<ul className="list-disc flex flex-col gap-2">
													<li>
														Size: You can specify sizes like "Large (L)",
														"Medium (M)", and "Small (S)".
													</li>
													<li>
														Material: You can specify materials like "Leather
														(leather)" and "Cotton (cotton)".
													</li>
													<li>
														Color: You can specify colors like
														<div className="flex items-center gap-4 my-3">
															"Blue"
															<p>"#0000FF" </p>
															<div
																style={{ backgroundColor: "#0000FF" }}
																className="h-5 w-12 rounded-lg"
															>
																{" "}
															</div>
														</div>
														<div className="flex items-center gap-4">
															"Red"
															<p>"#FF0000"</p>
															<div
																style={{ backgroundColor: "#FF0000" }}
																className="h-5 w-12 rounded-lg"
															></div>
														</div>
													</li>
												</ul>
											</HoverCardContent>
										</HoverCard>
									</div>
								</div>
								<p className="text-xs">
									Does your product come in different options, like size, color
									or material? Add them here.
								</p>
								<div className="flex flex-col gap-3">
									{variants.map((variant, index) => (
										<div key={index}>
											<div className="relative p-2 border rounded-lg flex flex-col gap-3">
												<h2 className="font-bold mb-1 capitalize ">
													{variant.title}
												</h2>
												{variant.values.map((value, valueIndex) => (
													<div
														className="flex items-center gap-5"
														key={valueIndex}
													>
														<p>{`${value.label}:`}</p>
														{value.value.startsWith("#") ? (
															<div
																style={{ backgroundColor: `${value.value}` }}
																className="rounded-full h-6 w-6"
															></div>
														) : (
															<p>{`${value.value}`}</p>
														)}
													</div>
												))}
												<div className="flex items-center gap-3 justify-end w-full">
													<Button
														variant="destructive"
														className="flex justify-center items-center"
														onClick={() => deleteVariant(index)}
													>
														<Trash2 className="w-4 h-4" />
													</Button>
													<Button
														variant="secondary"
														className="flex justify-center items-center"
														onClick={() => handleVariantEditClick(index)}
													>
														<Edit className="w-4 h-4" />
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
								<Button
									type="button"
									variant={"secondary"}
									className="border border-clr-11 border-dotted"
									onClick={() => setOpenVariantModal(true)}
								>
									Add Variant
								</Button>
							</div>
						</div>

						{/* side-form */}
						<div className="col-span-2 w-full h-full sticky top-0">
							<div className="md:flex hidden flex-col gap-4 bg-white p-2 mb-6  rounded-lg">
								<FormField
									control={form.control}
									name="categoryId"
									render={() => (
										<FormItem>
											<div className="mb-4">
												<FormLabel className="text-base">Category</FormLabel>
											</div>
											<div className="flex flex-col gap-6 pb-4">
												{categories?.map((item) => (
													<FormField
														key={item.id}
														control={form.control}
														name="categoryId"
														render={({ field }) => {
															return (
																<FormItem
																	key={item.id}
																	className="flex flex-row items-start space-x-3 space-y-0"
																>
																	<FormControl>
																		<Checkbox
																			checked={field.value?.includes(item.id)}
																			onCheckedChange={(checked) => {
																				return checked
																					? field.onChange([
																							...field.value,
																							item.id,
																					  ])
																					: field.onChange(
																							field.value?.filter(
																								(value) => value !== item.id
																							)
																					  );
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal">
																		{item.name}
																	</FormLabel>
																</FormItem>
															);
														}}
													/>
												))}
											</div>
											<Link
												href={`/${storeId}/categories/new`}
												className={`${cn(
													buttonVariants({ variant: "secondary" })
												)}py-2 px-6 text-xs font-semibold rounded-full text-balance`}
											>
												Create a new category
											</Link>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="md:flex hidden flex-col gap-4 bg-white p-2 rounded-lg">
								<FormField
									control={form.control}
									name="inventory"
									render={({ field }) => (
										<FormItem>
											<div className="flex items-center justify-between">
												<div>
													<FormLabel>Inventory</FormLabel>{" "}
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															Track this product's inventory by adding stock
															quantities.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>

											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="20"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* sku */}
								<FormField
									control={form.control}
									name="sku"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<div>
													<FormLabel>SKU</FormLabel>
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="rounded-full cursor-help p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															A “Stock Keeping Unit” is a unique code you can
															create for each product or variant you have in
															your store. Using SKUs helps with tracking
															inventory.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>
											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="e.g, SKU123456789"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* type */}
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<Select
												disabled={loading}
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															defaultValue={field.value}
															placeholder="Select a product type"
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{typesOfproduct?.map((collection) => (
														<SelectItem
															key={collection.id}
															value={collection.value}
														>
															{collection.value}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* status */}
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<Select
												disabled={loading}
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															defaultValue={field.value}
															placeholder="select the availability"
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{productStatus?.map((collection) => (
														<SelectItem
															key={collection.id}
															value={collection.value}
														>
															{collection.value}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* Ribbon */}
								<FormField
									control={form.control}
									name="ribbon"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<div>
													<FormLabel>Ribbon</FormLabel>
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															Add a label like “New Arrival” or “Sale” to make
															this product stand out. It’ll be displayed on your
															product widgets.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>

											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="e.g, New arrival, On-Sale"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="brand"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<div>
													<FormLabel>Brand</FormLabel>
													<span>
														<Badge className="ml-2" variant={"custom"}>
															Optional
														</Badge>
													</span>
												</div>
												<div>
													<HoverCard>
														<HoverCardTrigger>
															<p className="cursor-help rounded-full p-1 h-auto border border-clr-2">
																<FaQuestion className="w-3 h-3" />
															</p>
														</HoverCardTrigger>
														<HoverCardContent>
															Add a brand name to make this product stand out to
															customers.
														</HoverCardContent>
													</HoverCard>
												</div>
											</div>

											<FormControl>
												<Input
													type="text"
													disabled={loading}
													placeholder="e.g, Louis Vuitton"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="on_sale"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start pl-2 py-4 space-x-3 space-y-0 border rounded-md">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>On Sale</FormLabel>
												<FormDescription>
													Is this product being sold at a discount?
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</div>
							{/* side-form */}
						</div>
					</div>
					<Button disabled={loading} className="mr-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
			<ProductModal
				openModal={openModal}
				setOpenModal={handleCloseModal}
				addDataToSection={(title: string, description: string) =>
					addDataToSection(title, description)
				}
				currentData={currentData}
			/>
			<VariantModal
				openModal={openVariantModal}
				setOpenModal={handleVariantCloseModal} // Use handleVariantCloseModal here
				addVariant={addVariant}
				currentVariant={currentVariant}
			/>
		</div>
	);
};
