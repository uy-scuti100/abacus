"use client";

import { useState } from "react";

export default function StockRequestComponent() {
	const [products, setProducts] = useState<any[]>([]);
	const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
	const [emailSubject, setEmailSubject] = useState("");
	const [emailBody, setEmailBody] = useState("");

	const handleProductSelect = (productId: number) => {
		setSelectedProducts((prev: number[]) =>
			prev.includes(productId)
				? prev.filter((id: number) => id !== productId)
				: [...prev, productId]
		);
	};

	const handleSendEmails = async () => {
		// Logic to send emails would go here
		console.log("Sending emails for products:", selectedProducts);
		console.log("Email subject:", emailSubject);
		console.log("Email body:", emailBody);
	};

	return (
		<div className="flex-col space-y-4">
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-semibold mb-4">
					Select Restocked Products
				</h2>
				<div className="grid grid-cols-3 gap-4">
					{products.map((product) => (
						<div
							key={product.id}
							className={`p-2 border rounded cursor-pointer ${
								selectedProducts.includes(product.id) ? "bg-blue-100" : ""
							}`}
							onClick={() => handleProductSelect(product.id)}
						>
							{product.name}
						</div>
					))}
				</div>
			</div>

			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-semibold mb-4">Compose Email</h2>
				<input
					type="text"
					placeholder="Email Subject"
					className="w-full p-2 mb-4 border rounded"
					value={emailSubject}
					onChange={(e) => setEmailSubject(e.target.value)}
				/>
				<textarea
					placeholder="Email Body"
					className="w-full p-2 h-32 border rounded"
					value={emailBody}
					onChange={(e) => setEmailBody(e.target.value)}
				/>
			</div>

			<button
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				onClick={handleSendEmails}
			>
				Send Stock Request Emails
			</button>
		</div>
	);
}
