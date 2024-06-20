"use client";
import { useState, useEffect } from "react";

export default function Page() {
	const [categories, setCategories] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			const url = "https://qqemuxlyzkbjudzwmfid.supabase.co/rest/v1/category";
			const anonKey =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZW11eGx5emtianVkendtZmlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2NTAxMDQsImV4cCI6MjAxNjIyNjEwNH0.sqBedeuuGl6Osr3UBg_y8kUep9eFwFr_SADIR1v_nHI";

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						apikey: anonKey,
						Authorization: `Bearer ${anonKey}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}

				const data = await response.json();
				setCategories(data);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1>Categories</h1>
			<ul>
				{categories.map((category) => (
					<li key={category?.id}>
						<h2>{category.name}</h2>
						<p>{category.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
