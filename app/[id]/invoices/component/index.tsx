"use client";

// components/CouponForm.tsximport { useState } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const CouponForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [couponType, setCouponType] = useState("percentage");

	const onSubmit = async (data: any) => {
		// Handle form submission (e.g., send data to API)
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mb-8 bg-gray-100 p-4 rounded"
		>
			<div className="mb-4">
				<label className="block mb-2">Coupon Name</label>
				<input
					{...register("name", { required: true })}
					className="w-full p-2 border rounded"
				/>
				{errors.name && (
					<span className="text-red-500">This field is required</span>
				)}
			</div>

			<div className="mb-4">
				<label className="block mb-2">Coupon Code</label>
				<input
					{...register("code", { required: true })}
					className="w-full p-2 border rounded"
				/>
				{errors.code && (
					<span className="text-red-500">This field is required</span>
				)}
			</div>

			<div className="mb-4">
				<label className="block mb-2">Coupon Type</label>
				<select
					{...register("type")}
					onChange={(e) => setCouponType(e.target.value)}
					className="w-full p-2 border rounded"
				>
					<option value="percentage">Percentage Discount</option>
					<option value="fixed">Fixed Cash Discount</option>
					<option value="freeShipping">Free Shipping</option>
					<option value="salePrice">Sale Price</option>
					<option value="buyXGetY">Buy X Get Y Free</option>
				</select>
			</div>

			{couponType === "percentage" && (
				<div className="mb-4">
					<label className="block mb-2">Discount Percentage</label>
					<input
						type="number"
						{...register("discountPercentage", {
							required: true,
							min: 1,
							max: 100,
						})}
						className="w-full p-2 border rounded"
					/>
				</div>
			)}

			{couponType === "fixed" && (
				<div className="mb-4">
					<label className="block mb-2">Discount Amount</label>
					<input
						type="number"
						{...register("discountAmount", { required: true, min: 0 })}
						className="w-full p-2 border rounded"
					/>
				</div>
			)}

			{couponType === "buyXGetY" && (
				<>
					<div className="mb-4">
						<label className="block mb-2">Buy X</label>
						<input
							type="number"
							{...register("buyX", { required: true, min: 1 })}
							className="w-full p-2 border rounded"
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2">Get Y Free</label>
						<input
							type="number"
							{...register("getYFree", { required: true, min: 1 })}
							className="w-full p-2 border rounded"
						/>
					</div>
				</>
			)}

			<div className="mb-4">
				<label className="block mb-2">Valid From</label>
				<input
					type="date"
					{...register("validFrom", { required: true })}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block mb-2">Valid To</label>
				<input
					type="date"
					{...register("validTo", { required: true })}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="flex items-center">
					<input
						type="checkbox"
						{...register("limitTotalUses")}
						className="mr-2"
					/>
					Limit total number of uses
				</label>
			</div>

			{watch("limitTotalUses") && (
				<div className="mb-4">
					<label className="block mb-2">Max Uses</label>
					<input
						type="number"
						{...register("maxUses", { required: true, min: 1 })}
						className="w-full p-2 border rounded"
					/>
				</div>
			)}

			<div className="mb-4">
				<label className="flex items-center">
					<input
						type="checkbox"
						{...register("limitOnePerCustomer")}
						className="mr-2"
					/>
					Limit to one use per customer
				</label>
			</div>

			<div className="mb-4">
				<label className="block mb-2">Apply To</label>
				<select {...register("applyTo")} className="w-full p-2 border rounded">
					<option value="all">All Products</option>
					<option value="specific">Specific Products</option>
				</select>
			</div>

			{watch("applyTo") === "specific" && (
				<div className="mb-4">
					<label className="block mb-2">Product IDs (comma-separated)</label>
					<input
						{...register("productIds")}
						className="w-full p-2 border rounded"
					/>
				</div>
			)}

			<div className="mb-4">
				<label className="block mb-2">Minimum Purchase Amount</label>
				<input
					type="number"
					{...register("minPurchaseAmount", { min: 0 })}
					className="w-full p-2 border rounded"
				/>
			</div>

			<button
				type="submit"
				className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
			>
				Create Coupon
			</button>
		</form>
	);
};

// components/CouponList.tsx
// import { useState, useEffect } from "react";

export const CouponList = () => {
	const [coupons, setCoupons] = useState([]);

	useEffect(() => {
		// Fetch coupons from API
		const fetchCoupons = async () => {
			// Replace with actual API call
			const response = await fetch("/api/coupons");
			const data = await response.json();
			setCoupons(data);
		};

		fetchCoupons();
	}, []);

	return (
		<div>
			<h3 className="text-xl font-semibold mb-4">Your Coupons</h3>
			{coupons.length === 0 ? (
				<p>No coupons created yet.</p>
			) : (
				<ul className="space-y-4">
					{coupons.map(
						(coupon: {
							id: string;
							name: string;
							code: string;
							type: string;
							validFrom: string;
							validTo: string;
						}) => (
							<li key={coupon.id} className="bg-white p-4 rounded shadow">
								<h4 className="font-bold">{coupon.name}</h4>
								<p>Code: {coupon.code}</p>
								<p>Type: {coupon.type}</p>
								<p>
									Valid: {coupon.validFrom} - {coupon.validTo}
								</p>
								{/* Add more coupon details as needed */}
							</li>
						)
					)}
				</ul>
			)}
		</div>
	);
};
