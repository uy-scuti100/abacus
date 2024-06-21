"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Category, Product, collection } from "@/types";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Heading from "@/providers/heading";
// import axios from "axios";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleImageUpload from "@/providers/multiple-image uploader";

const KeyValuePairSchema = z.object({
	key: z.string(),
	value: z.string(),
});
const VariantSchema = z.object({
	name: z.string(),
	values: z.array(KeyValuePairSchema),
});

const FormDataSchema = z.object({
	vendor_id: z.string().min(1),
	store_id: z.string().min(1),
	title: z.string().min(2),
	categoryId: z.string().min(1),
	collectionId: z.string().min(1),
	status: z.string(),
	media: z.array(z.object({ url: z.string().url() })),
	type: z.string(),
	brand: z.string().optional(),
	price: z.coerce.number().min(1),
	on_sale: z.boolean().default(false).optional(),
	cost_of_good: z.coerce.number().min(1).optional(),
	inventory: z.number().min(1).optional(),
	sku: z.string(),
	description: z.string(),
	additional_information: z.array(KeyValuePairSchema).optional(),
	variants: z.array(VariantSchema).optional(),
});
type ProductFormValues = z.infer<typeof FormDataSchema>;

interface ProductFormProps {
	initialData: Product | null;
	categories: Category[];
	collections: collection[];
}
export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories,
	collections,
}) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? "Edit product" : "Create product";
	const description = initialData ? "Edit a product." : "Add a new product";
	const toastMessage = initialData ? "Product updated." : "Product created.";
	const action = initialData ? "Save changes" : "Create";
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
				categoryId: "",
				collectionId: "",
				status: "",
				media: [],
				type: "",
				brand: "",
				price: 0,
				on_sale: false,
				cost_of_good: 0,
				inventory: 0,
				sku: "",
				description: "",
				additional_information: [],
				variants: [],
		  };
	const form = useForm<ProductFormValues>({
		resolver: zodResolver(FormDataSchema),
		defaultValues: defaultValues as ProductFormValues,
	});

	const onDelete = async () => {
		try {
			setLoading(true);
			// await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
			router.refresh();
			router.push(`/${params.storeId}/products`);
			toast.success("Product deleted.");
		} catch (error: any) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};
	const onSubmit = async (data: ProductFormValues) => {
		try {
			console.log("Submitting data:", data);
			setLoading(true);
			// if (initialData) {
			// 	await axios.patch(
			// 		`/api/${params.storeId}/products/${params.productId}`,
			// 		data
			// 	);
			// } else {
			// 	await axios.post(`/api/${params.storeId}/products`, data);
			// }
			router.refresh();
			router.push(`/${params.storeId}/products`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	const [images, setImages] = useState<string[]>([]);

	const handleImageChange = (newImages: string[]) => {
		setImages(newImages);
	};

	const handleImageRemove = (removedUrl: string) => {
		setImages((prevImages) => prevImages.filter((url) => url !== removedUrl));
	};
	return (
		<div>
			<AlertModal
				title="kjb"
				description="jkbj"
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>

			<div className="flex items-center justify-between">
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
					className="w-full space-y-8"
				>
					<FormField
						control={form.control}
						name="media"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Images</FormLabel>
								<FormControl>
									{/* <MultipleImageUpload
										value={field.value.map((image) => image.url)}
										disabled={loading}
										onChange={(newUrl) =>
											field.onChange([...field.value, { url: newUrl }])
										}
										onRemove={(url) =>
											field.onChange(
												field.value.filter((current) => current.url !== url)
											)
										}
									/> */}
									<>
										<MultipleImageUpload
											disabled={false}
											onChange={handleImageChange}
											onRemove={handleImageRemove}
										/>
									</>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Product name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<>
											<ReactQuill
												theme="snow"
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
											min={1}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
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
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.name} value={category.name}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="collectionId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Size</FormLabel>
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
													placeholder="Select a size"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{collections.map((collection) => (
												<SelectItem
													key={collection.name}
													value={collection.name}
												>
													{collection.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="my-3 md:my-0">
							<FormField
								control={form.control}
								name="on_sale"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Featured</FormLabel>
											<FormDescription>
												This product will appear on the home page
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</div>
	);
};
