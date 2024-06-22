"use client";
import React, { useState } from "react";

interface FormData {
	id: string;
	created_at: string;
	vendor_id: string;
	store_id: string;
	title: string;
	status: string;
	media: string[];
	type: string;
	brand: string;
	price: string;
	on_sale: boolean;
	cost_of_good: string;
	inventory: string;
	sku: string;
	description: string;
	additional_information: { key: string; value: string }[];
	variants: {
		size: { key: string; value: string }[];
		material: { key: string; value: string }[];
		color: { key: string; value: string }[];
	};
}

const ProductForm = () => {
	const [formData, setFormData] = useState<FormData>({
		id: "",
		created_at: new Date().toISOString(),
		vendor_id: "",
		store_id: "",
		title: "",
		status: "",
		media: [],
		type: "",
		brand: "",
		price: "",
		on_sale: false,
		cost_of_good: "",
		inventory: "",
		sku: "",
		description: "",
		additional_information: [],
		variants: {
			size: [],
			material: [],
			color: [],
		},
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleArrayChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const { value } = e.target;
		setFormData({ ...formData, [field]: value.split(",") });
	};

	const handleAddAdditionalInfo = () => {
		setFormData({
			...formData,
			additional_information: [
				...formData.additional_information,
				{ key: "", value: "" },
			],
		});
	};

	const handleAdditionalInfoChange = (
		index: number,
		field: string,
		value: string
	) => {
		const newInfo = formData.additional_information.map((info, i) =>
			i === index ? { ...info, [field]: value } : info
		);
		setFormData({ ...formData, additional_information: newInfo });
	};

	const handleAddVariant = (type: "size" | "material" | "color") => {
		setFormData({
			...formData,
			variants: {
				...formData.variants,
				[type]: [...formData.variants[type], { key: "", value: "" }],
			},
		});
	};

	const handleVariantChange = (
		type: "size" | "material" | "color",
		index: number,
		field: string,
		value: string
	) => {
		const newVariants = formData.variants[type].map((variant, i) =>
			i === index ? { ...variant, [field]: value } : variant
		);
		setFormData({
			...formData,
			variants: {
				...formData.variants,
				[type]: newVariants,
			},
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(JSON.stringify(formData, null, 2));
	};

	return (
		<div className="App">
			<h1>Product Form</h1>
			<form onSubmit={handleSubmit}>
				{/* Basic Fields */}
				<input
					type="text"
					name="id"
					placeholder="ID"
					value={formData.id}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="vendor_id"
					placeholder="Vendor ID"
					value={formData.vendor_id}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="store_id"
					placeholder="Store ID"
					value={formData.store_id}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={formData.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="status"
					placeholder="Status"
					value={formData.status}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="media"
					placeholder="Media (comma separated)"
					value={formData.media.join(",")}
					onChange={(e) => handleArrayChange(e, "media")}
				/>
				<input
					type="text"
					name="type"
					placeholder="Type"
					value={formData.type}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="brand"
					placeholder="Brand"
					value={formData.brand}
					onChange={handleChange}
				/>
				<input
					type="number"
					name="price"
					placeholder="Price"
					value={formData.price}
					onChange={handleChange}
				/>
				<label>
					On Sale:
					<input
						type="checkbox"
						name="on_sale"
						checked={formData.on_sale}
						onChange={(e) =>
							setFormData({ ...formData, on_sale: e.target.checked })
						}
					/>
				</label>
				<input
					type="number"
					name="cost_of_good"
					placeholder="Cost of Good"
					value={formData.cost_of_good}
					onChange={handleChange}
				/>
				<input
					type="number"
					name="inventory"
					placeholder="Inventory"
					value={formData.inventory}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="sku"
					placeholder="SKU"
					value={formData.sku}
					onChange={handleChange}
				/>
				<textarea
					name="description"
					placeholder="Description"
					value={formData.description}
					onChange={handleChange}
				></textarea>
				{/* Additional Information */}
				<h2>Additional Information</h2>
				{formData.additional_information.map((info, index) => (
					<div key={index}>
						<input
							type="text"
							placeholder="Key"
							value={info.key}
							onChange={(e) =>
								handleAdditionalInfoChange(index, "key", e.target.value)
							}
						/>
						<input
							type="text"
							placeholder="Value"
							value={info.value}
							onChange={(e) =>
								handleAdditionalInfoChange(index, "value", e.target.value)
							}
						/>
					</div>
				))}
				x
				<button type="button" onClick={handleAddAdditionalInfo}>
					Add Additional Info
				</button>
				{/* Variants */}
				<h2>Variants</h2>
				<h3>Size</h3>
				{formData.variants.size.map((variant, index) => (
					<div key={index}>
						<input
							type="text"
							placeholder="Key"
							value={variant.key}
							onChange={(e) =>
								handleVariantChange("size", index, "key", e.target.value)
							}
						/>
						<input
							type="text"
							placeholder="Value"
							value={variant.value}
							onChange={(e) =>
								handleVariantChange("size", index, "value", e.target.value)
							}
						/>
					</div>
				))}
				<button type="button" onClick={() => handleAddVariant("size")}>
					Add Size Variant
				</button>
				<h3>Material</h3>
				{formData.variants.material.map((variant, index) => (
					<div key={index}>
						<input
							type="text"
							placeholder="Key"
							value={variant.key}
							onChange={(e) =>
								handleVariantChange("material", index, "key", e.target.value)
							}
						/>
						<input
							type="text"
							placeholder="Value"
							value={variant.value}
							onChange={(e) =>
								handleVariantChange("material", index, "value", e.target.value)
							}
						/>
					</div>
				))}
				<button type="button" onClick={() => handleAddVariant("material")}>
					Add Material Variant
				</button>
				<h3>Color</h3>
				{formData.variants.color.map((variant, index) => (
					<div key={index}>
						<input
							type="text"
							placeholder="Key"
							value={variant.key}
							onChange={(e) =>
								handleVariantChange("color", index, "key", e.target.value)
							}
						/>
						<input
							type="text"
							placeholder="Value"
							value={variant.value}
							onChange={(e) =>
								handleVariantChange("color", index, "value", e.target.value)
							}
						/>
					</div>
				))}
				<button type="button" onClick={() => handleAddVariant("color")}>
					Add Color Variant
				</button>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default ProductForm;

// {/* <ImageUpload
// 	value={field.value ? [field.value] : []}
// 	disabled={loading}
// 	onChange={(url) => field.onChange(url)}
// 	onRemove={() => field.onChange("")}
// />; */}
