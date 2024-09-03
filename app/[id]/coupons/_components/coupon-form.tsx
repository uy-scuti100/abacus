"use client";
// global imports
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

// local imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/providers/heading";
import { AlertModal } from "@/providers/modals/alertModal";
import { createSupabaseBrowser } from "@/supabase/client";
import useUser from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { Coupon, Product } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetchData from "@/hooks/useFetchCategories";
import Image from "next/image";

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
	code: z.string().min(1, "Code is required"),
	type: z.enum([
		"percentage",
		"fixed",
		"freeShipping",
		"salePrice",
		"buyXGetY",
	]),
	discountPercentage: z.number().min(0).max(100).positive().optional(),
	discountAmount: z.number().min(0).positive().optional(),
	buyX: z.number().min(1).optional(),
	getYFree: z.number().min(1).optional(),
	validFrom: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	validTo: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	limitTotalUses: z.boolean().optional(),
	maxUses: z.number().min(1).optional(),
	limitOnePerCustomer: z.boolean().optional(),
	applyto: z.enum(["all", "specific"]),
	productIds: z.array(z.string()).optional(),
	created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	hasEndDate: z.boolean().optional(),
	salePrice: z.number().optional(),
});

type CouponFormValues = z.infer<typeof formSchema>;

interface CouponFormProps {
	initialData: Coupon | null;
	storeId: string;
}

export const CouponForm: React.FC<CouponFormProps> = ({
	initialData,
	storeId,
}) => {
	const params = useParams();
	const router = useRouter();
	const user = useUser();
	const userId = user.data?.id;

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const title = initialData ? "Edit Coupon" : "Create Coupon";
	const description = initialData ? "Edit a Coupon." : "Add a new Coupon";
	const action = initialData ? "Save changes" : "Create Coupon";

	const {
		data: products,
		isLoading: isComing,
		isFetching,
	} = useFetchData<Product>({
		storeId,
		tableName: "products",
		queryKey: ["products"],
	});

	const form = useForm<CouponFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? {
					name: initialData.name ?? undefined,
					code: initialData.code ?? undefined,
					type: initialData.type as
						| "percentage"
						| "fixed"
						| "freeShipping"
						| "salePrice"
						| "buyXGetY"
						| undefined,
					discountPercentage: initialData.discountpercentage ?? undefined,
					discountAmount: initialData.discountamount ?? undefined,
					buyX: initialData.buyx ?? undefined,
					getYFree: initialData.getyfree ?? undefined,
					validFrom: initialData.validfrom ?? undefined,
					validTo: initialData.validto ?? undefined,
					limitTotalUses: initialData.limittotaluses ?? undefined,
					maxUses: initialData.maxuses ?? undefined,
					limitOnePerCustomer: initialData.limitonepercustomer ?? undefined,
					applyto: initialData.applyto as "all" | "specific" | undefined,
					productIds: initialData.product_ids ?? undefined,
					created_at: initialData.created_at ?? undefined,
					hasEndDate: initialData.has_end_date ?? undefined,
					salePrice: initialData.sale_price ?? undefined,
					// endDate: initialData.ended_at ?? undefined,
			  }
			: undefined,
	});

	// const onSubmit = async (values: CouponFormValues) => {
	// 	try {
	// 		setIsLoading(true);
	// 		if (initialData) {
	// 			const supabase = createSupabaseBrowser();
	// 			const updatedCouponData = {
	// 				name: values.name,
	// 				code: values.code,
	// 				type: values.type,
	// 				discountpercentage: values.discountPercentage,
	// 				discountamount: values.discountAmount,
	// 				buyx: values.buyX,
	// 				getyfree: values.getYFree,
	// 				validfrom: values.validFrom,
	// 				validto: values.validTo,
	// 				limittotaluses: values.limitTotalUses,
	// 				maxuses: values.maxUses,
	// 				limitonepercustomer: values.limitOnePerCustomer,
	// 				applyto: values.applyto,
	// 				product_ids: values.productIds,
	// 				has_end_date: values.hasEndDate,
	// 				sale_price: values.salePrice,
	// 			};

	// 			const { data: Coupon, error } = await supabase
	// 				.from("coupons")
	// 				.update(updatedCouponData)
	// 				.eq("id", initialData.id ?? "")
	// 				.select();

	// 			if (error) {
	// 				toast.error("Failed to update Coupon");
	// 				router.refresh();
	// 				return;
	// 			}

	// 			if (Coupon) {
	// 				toast.success("Coupon Updated");
	// 				router.push(`/${params?.id}/Coupons`);
	// 			} else {
	// 				toast.error("Failed to update Coupon");
	// 				router.refresh();
	// 			}
	// 		} else {
	// 			const supabase = createSupabaseBrowser();
	// 			const { data: Coupon, error } = await supabase
	// 				.from("coupons")
	// 				.insert([
	// 					{
	// 						...values,
	// 						vendor_id: userId,
	// 						store_id: storeId,
	// 					},
	// 				])
	// 				.select();

	// 			if (error) {
	// 				toast.error("Failed to create Coupon");
	// 				router.refresh();
	// 				return;
	// 			}

	// 			if (Coupon && !error) {
	// 				toast.success("Coupon Created");
	// 				window.location.assign(`/${params?.id}/Coupons`);
	// 				router.refresh();
	// 			} else {
	// 				toast.error("Failed to create Coupon");
	// 				router.refresh();
	// 			}
	// 		}
	// 	} catch (error: any) {
	// 		console.error("An error occurred:", error.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	const onSubmit = async (values: CouponFormValues) => {
		try {
			setIsLoading(true);

			// Conflict Resolution
			let updatedValues = { ...values };

			// Handle Discount Types Conflict
			if (updatedValues.type === "percentage") {
				updatedValues.discountAmount = undefined;
				updatedValues.salePrice = undefined;
			} else if (updatedValues.type === "fixed") {
				updatedValues.discountPercentage = undefined;
				updatedValues.salePrice = undefined;
			} else if (updatedValues.type === "salePrice") {
				updatedValues.discountPercentage = undefined;
				updatedValues.discountAmount = undefined;
			}

			// Handle Buy X Get Y Conflict
			if (updatedValues.type !== "buyXGetY") {
				updatedValues.buyX = undefined;
				updatedValues.getYFree = undefined;
			}

			// Handle Limit Total Uses Conflict
			if (!updatedValues.limitTotalUses) {
				updatedValues.maxUses = undefined;
			}

			// Handle Has End Date Conflict
			if (!updatedValues.hasEndDate) {
				updatedValues.validTo = "";
			}

			// Handle Apply to Specific Products Conflict
			if (updatedValues.applyto === "all") {
				updatedValues.productIds = undefined;
			}
			const supabase = createSupabaseBrowser();

			// Proceed with updating or creating the coupon
			if (initialData) {
				// Update existing coupon
				const { data: Coupon, error } = await supabase
					.from("coupons")
					.update(updatedValues)
					.eq("id", initialData.id as string)
					.select();

				if (error) throw new Error("Failed to update Coupon");

				toast.success("Coupon Updated");
				router.push(`/${params?.id}/Coupons`);
			} else {
				// Create new coupon
				const { data: coupon, error } = await supabase
					.from("coupons")
					.insert([{ ...updatedValues, vendor_id: userId, store_id: storeId }])
					.select();

				if (error) throw new Error("Failed to create Coupon");

				toast.success("Coupon Created");
				window.location.assign(`/${params?.id}/Coupons`);
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);
			setIsRefreshing(true);
			const supabase = createSupabaseBrowser();
			const { error } = await supabase
				.from("coupons")
				.delete()
				.eq("id", params?.couponId!)
				.select();
			if (!error) {
				toast.success("Coupon deleted!");

				window.location.reload();
			} else {
				toast.error("Failed to delete coupon");
				console.error("Error updating coupon:", error);
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
			setIsRefreshing(false);
		}
	};

	const couponTypes = [
		{
			value: "percentage",
			label: "Discount ％",
		},
		{
			value: "fixed",
			label: "Discount ＄",
		},
		{
			value: "freeShipping",
			label: "Free Shipping 🚛",
		},
		{
			value: "salePrice",
			label: "Sale Price 🏷️",
		},
		{
			value: "buyXGetY",
			label: "Buy X Get Y Free 💳",
		},
	];

	return (
		<div className="bg-white p-4 rounded-lg max-w-4xl">
			{isRefreshing && (
				<div className="fixed inset-0 bg-black/50 z-[500] flex justify-center items-center text-white">
					<Loader className="animate-spin duration-1000 " size={50} />
				</div>
			)}
			<AlertModal
				title="Are you sure you want to delete this coupon"
				description="This action cannot be undone"
				isOpen={isOpen}
				onClose={() => setIsOpen((prev) => !prev)}
				onConfirm={onDelete}
				loading={isLoading}
			/>
			<div className="flex items-center justify-between ">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={isLoading}
						variant="destructive"
						size="icon"
						onClick={() => setIsOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-auto mb-5"
				>
					<div className="flex items-center gap-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="my-5">
									<FormLabel>Coupon Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="e.g wintersale10"
											className="placeholder:text-gray-400 placeholder:text-sm"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coupon Code</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											className="placeholder:text-gray-400 placeholder:text-sm"
											placeholder="xxxxx"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="mb-6">
								<FormLabel className="flex items-center gap-2">
									Coupon Type
								</FormLabel>
								<FormControl>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select coupon type"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{couponTypes.map((type) => (
												<SelectItem key={type.value} value={type.value}>
													{type.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{form.watch("type") === "percentage" && (
						<FormField
							control={form.control}
							name="discountPercentage"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Discount in ％</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={isLoading}
											placeholder="Enter percentage"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					{form.watch("type") === "fixed" && (
						<FormField
							control={form.control}
							name="discountAmount"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Discount in ＄</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={isLoading}
											placeholder="Enter amount"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					{form.watch("type") === "buyXGetY" && (
						<div className="flex flex-col">
							<FormField
								control={form.control}
								name="buyX"
								render={({ field }) => (
									<FormItem className="mb-5">
										<FormLabel>Buy</FormLabel>
										<FormControl>
											<Input
												type="number"
												disabled={isLoading}
												placeholder="Enter amount"
												{...field}
												defaultValue={2}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<span className="text-xs text-gray-500">
								e.g., Buy 2 jars of milk, get 1 for free.
							</span>
							<FormField
								control={form.control}
								name="getYFree"
								render={({ field }) => (
									<FormItem className="mb-5">
										<FormLabel>Get</FormLabel>
										<FormControl>
											<Input
												type="number"
												disabled={isLoading}
												placeholder="Enter amount"
												{...field}
												defaultValue={1}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}

					{form.watch("type") === "salePrice" && (
						<FormField
							control={form.control}
							name="salePrice"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Selling for ?</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={isLoading}
											placeholder="₦"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					<FormField
						control={form.control}
						name="applyto"
						render={({ field }) => (
							<FormItem className="mb-5">
								<FormLabel>Apply To</FormLabel>
								<FormControl>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select coupon type"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="all">All Products</SelectItem>
											<SelectItem value="specific">
												Selected Products
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{form.watch("applyto") === "specific" && (
						<div className=" flex flex-col gap-3 max-h-[300px] md:max-h-[400px] overflow-y-auto border border-gray-300 rounded-md p-3">
							{products
								?.sort((a, b) => a.title.localeCompare(b.title))
								.map((item) => (
									<FormField
										key={item.id}
										control={form.control}
										name="productIds"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<label
													htmlFor={`product-checkbox-${item.id}`}
													className="flex items-center cursor-pointer space-x-3"
													onClick={() => {
														const isChecked = field.value?.includes(item.id);
														field.onChange(
															isChecked
																? field.value?.filter(
																		(value) => value !== item.id
																  )
																: [...(field.value || []), item.id]
														);
													}}
												>
													<div className="border-foreground/30 border p-1 rounded-full w-[50px] h-[50px] mr-1">
														<Image
															width={50}
															height={50}
															src={item.media[0]}
															alt={item.title.substring(0, 10)}
															className="rounded-full object-cover w-full h-full "
														/>
													</div>
													<p className="capitalize">
														{item.title.substring(0, 20)}
													</p>
													<Checkbox
														id={`product-checkbox-${item.id}`}
														checked={field.value?.includes(item.id) || false}
														className="hidden"
														onCheckedChange={() => {}} // This will be handled by the label onClick
													/>
												</label>
											</FormItem>
										)}
									/>
								))}
						</div>
					)}
					<FormField
						control={form.control}
						name="hasEndDate"
						render={({ field }) => (
							<div className=" mb-2 rounded-lg border border-gray-300 p-2">
								<FormItem className="flex items-center gap-3 mb-2">
									<FormControl className="">
										<Checkbox
											disabled={isLoading}
											checked={field.value}
											onCheckedChange={(checked) => {
												field.onChange(checked);
												// You can add additional logic here to handle conditional validation
												if (!checked) {
													form.setValue("validTo", ""); // Reset validTo field if hasEndDate is unchecked
												}
											}}
										/>
									</FormControl>
									<FormLabel>Has End Date</FormLabel>
								</FormItem>
								<FormDescription className="mb-3">
									Check this box if the coupon has an expiration date.
								</FormDescription>
								<FormMessage />
							</div>
						)}
					/>

					<div className="flex items-center gap-2">
						<FormField
							control={form.control}
							name="validFrom"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Valid From</FormLabel>
									<FormControl>
										<Input type="date" disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="validTo"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Expiration Date</FormLabel>
									<FormControl>
										<Input type="date" disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="limitTotalUses"
						render={({ field }) => (
							<FormItem className="mb-5 flex items-center gap-2">
								<FormControl>
									<Checkbox
										disabled={isLoading}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel>Limit total number of uses</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>

					{form.watch("limitTotalUses") && (
						<FormField
							control={form.control}
							name="maxUses"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Maximum Uses</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={isLoading}
											placeholder="Enter maximum uses"
											{...field}
											onChange={(e) => {
												form.setValue("limitOnePerCustomer", false);
												field.onChange(e);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					<FormField
						control={form.control}
						name="limitOnePerCustomer"
						render={({ field }) => (
							<FormItem className="mb-5 flex items-center space-x-2">
								<FormControl>
									<Checkbox
										disabled={isLoading}
										checked={field.value}
										onCheckedChange={(checked) => {
											form.setValue("limitTotalUses", false);
											field.onChange(checked);
										}}
									/>
								</FormControl>
								<FormLabel>Limit to one use per customer</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button disabled={isLoading} className="sm:mr-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</div>
	);
};
