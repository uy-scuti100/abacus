"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "./modal";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";

// Define the schema for key-value pairs
const KeyValuePairSchema = z.object({
	label: z.string().min(1, { message: "Label is required" }),
	value: z.string().min(1, { message: "Value is required" }),
});

// Define the schema for variants
const VariantSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	values: z.array(KeyValuePairSchema),
});

interface VariantModalProps {
	addVariant: (
		title: string,
		values: { label: string; value: string }[]
	) => void;
	openModal: boolean;
	setOpenModal: () => void;
	currentVariant: { title: string; values: { label: string; value: string }[] };
}

type VariantFormValues = z.infer<typeof VariantSchema>;

export const VariantModal: React.FC<VariantModalProps> = ({
	openModal,
	setOpenModal,
	addVariant,
	currentVariant,
}) => {
	const [loading, setLoading] = useState(false);

	const form = useForm<VariantFormValues>({
		resolver: zodResolver(VariantSchema),
		defaultValues: {
			title: "",
			values: [{ label: "", value: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "values",
	});

	useEffect(() => {
		form.reset({
			title: currentVariant.title,
			values:
				currentVariant.values.length > 0
					? currentVariant.values
					: [{ label: "", value: "" }],
		});
	}, [currentVariant, form]);

	const onSubmit = (data: VariantFormValues) => {
		if (data.title === "" || data.values.length === 0) {
			return;
		}
		addVariant(data.title, data.values);
		toast.success("Variant addded!");
		setOpenModal();
		form.reset();
	};

	return (
		<Modal
			title="VARIANT SECTIONS"
			description="Add variant options like size, material, and color."
			isOpen={openModal}
			onClose={setOpenModal}
		>
			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col w-full"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="e.g., Size, Color, Material"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ScrollArea className="p-2 h-72 w-full rounded-md border">
							{fields.map((field, index) => (
								<div key={field.id} className="flex gap-4 mb-4 items-end ">
									<FormField
										control={form.control}
										name={`values.${index}.label`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Label</FormLabel>
												<FormControl>
													<Input
														disabled={loading}
														placeholder="e.g., Large"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`values.${index}.value`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input
														disabled={loading}
														placeholder="e.g., L"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										type="button"
										variant="destructive"
										onClick={() => remove(index)}
										disabled={loading}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
							))}
						</ScrollArea>

						<Button
							type="button"
							variant={"secondary"}
							className="border border-clr-3 bg-clr-11 text-white hover:text-inherit hover:bg-inherit mt-4"
							onClick={() => append({ label: "", value: "" })}
							disabled={loading}
						>
							Add more value
						</Button>

						<div className="flex items-center gap-3 mt-4 w-full">
							<Button
								disabled={loading}
								variant="outline"
								onClick={setOpenModal}
								className="w-full"
							>
								Cancel
							</Button>
							<Button disabled={loading} type="submit" className="w-full">
								Add
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};
