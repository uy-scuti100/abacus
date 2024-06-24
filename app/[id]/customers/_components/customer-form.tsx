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
import SingleImageUpload from "@/providers/single-image-uploader";
import { Category, Customers } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneNumberValidtor from "./phone-number-validator";
import PhoneNumberValidator from "./phone-number-validator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TagsInput from "./tags-component";

const formSchema = z.object({
	first_name: z.string().min(2).optional(),
	last_name: z.string().min(1).optional(),
	email: z.string().email(),
	address: z.string(),
	phone_numer: z.string().optional(),
	role: z.string(),
	subscribed: z.boolean().default(false),
});

type CustomerFormValues = z.infer<typeof formSchema>;

interface CustomerFormProps {
	initialData: Customers | null;
	storeId: string;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
	initialData,
	storeId,
}) => {
	const [tags, setTags] = useState<string[] | null | undefined>(
		initialData?.tags
	);

	const params = useParams();
	const router = useRouter();
	const user = useUser();
	const userId = user.data?.id;

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const title = initialData ? "Edit Category" : "Create Category";
	const description = initialData ? "Edit a Category." : "Add a new Category";
	const action = initialData ? "Save changes" : "Create category";

	const form = useForm<CustomerFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? {
					first_name: initialData.first_name || "",
					last_name: initialData.last_name || "",
					subscribed: initialData.subscribed || false,
					email: initialData.email,
					address: initialData.address || "",
					phone_numer: initialData.phone_numer || "",
					role: initialData.role || "",
			  }
			: {
					first_name: "",
					last_name: "",
					subscribed: false,
					email: "",
					address: "",
					phone_numer: "",
					role: "",
			  },
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			if (initialData) {
				const supabase = createSupabaseBrowser();
				const updatedCustomerData = {
					first_name: values.first_name || "",
					last_name: values.last_name || "",
					subscribed: values.subscribed || false,
					email: values.email,
					address: values.address || "",
					phone_numer: values.phone_numer || "",
					role: values.role || "",
					tags: tags || [],
				};

				const { data: customer, error } = await supabase
					.from("customers")
					.update(updatedCustomerData)
					.eq("id", initialData.id)

					.select();

				if (error) {
					toast.error("Failed to updated Customer");
					router.refresh();
					return;
				}

				if (customer) {
					toast.success("Customer Updated");
					router.push(`/${params.id}/customers`);
				} else {
					toast.error("Failed to update Customer");
					router.refresh();
				}
			} else {
				const supabase = createSupabaseBrowser();
				const { data: customer, error } = await supabase
					.from("customers")
					.insert([
						{
							first_name: values.first_name || "",
							last_name: values.last_name || "",
							subscribed: values.subscribed || false,
							email: values.email,
							address: values.address || "",
							phone_numer: values.phone_numer || "",
							role: values.role || "",
							tags: tags,
							vendor_id: userId,
							store_id: storeId,
						},
					])
					.select();

				if (error) {
					toast.error("Failed to create Customer");
					router.refresh();
					return;
				}

				if (customer && !error) {
					toast.success("Customer Created");
					window.location.assign(`/${params.id}/customers`);
					router.refresh();
				} else {
					toast.error("Failed to create Customer");
					router.refresh();
				}
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
			setIsRefreshing(true);
			const supabase = createSupabaseBrowser();
			const { error } = await supabase
				.from("customers")
				.delete()
				.eq("id", params.customerId)
				.select();
			if (!error) {
				toast.success("Customer deleted!");

				window.location.reload();
			} else {
				toast.error("Failed to delete Customer");
				console.error("Error updating Customer:", error);
			}
		} catch (error: any) {
			console.error("An error occurred:", error.message);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
			setIsRefreshing(false);
		}
	};

	const typesOfRole = [
		{
			id: 1,
			value: "Customer",
		},
		{
			id: 2,
			value: "Team-member",
		},
	];
	return (
		<>
			{isRefreshing && (
				<div className="fixed inset-0 bg-black/50 z-[500] flex justify-center items-center text-white">
					<Loader className="animate-spin duration-1000 " size={50} />
				</div>
			)}
			<AlertModal
				title="Are you sure you wannt to delete this customer"
				description="this action cannot be undone"
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
					<FormField
						control={form.control}
						name="first_name"
						render={({ field }) => (
							<FormItem className="my-5">
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										placeholder="First name"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="">
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Last name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-6">
									<FormLabel className="flex items-center gap-2">
										Email
									</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="email@email.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="mb-6">
									<FormLabel className="flex items-center gap-2">
										Adress <Badge variant={"custom"}>Optional</Badge>
									</FormLabel>
									<FormControl>
										<Textarea
											className="h-10 resize-none"
											disabled={isLoading}
											placeholder="123, ABC Avenue, NY. "
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone_numer"
							render={({ field }) => (
								<FormItem className="mb-6">
									<FormLabel className="flex items-center gap-2">
										Phone Number <Badge variant={"custom"}>Optional</Badge>
									</FormLabel>
									<FormControl>
										<PhoneNumberValidator
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											name={field.name}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem className="mb-6">
									<FormLabel className="flex items-center gap-2">
										Role
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
														placeholder="Team Member or customer"
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{typesOfRole?.map((type) => (
													<SelectItem key={type.id} value={type.value}>
														{type.value}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="subscribed"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start pl-2 py-4 space-x-3 space-y-0 border rounded-md mb-6">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Subscribed</FormLabel>
										<FormDescription>
											Customer agreed to receiving marketing emails and SMS
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<div className="mb-6">
							<h1>Tags Input</h1>
							<TagsInput tags={tags} setTags={setTags} />
							{/* <div>
								<strong>Entered Tags:</strong>
								<ul>
									{tags.map((tag, index) => (
										<li key={index}>{tag}</li>
									))}
								</ul>
							</div> */}
						</div>
					</div>

					<Button disabled={isLoading} className="sm:mr-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
