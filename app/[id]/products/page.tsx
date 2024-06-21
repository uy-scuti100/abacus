import { Category, collection } from "@/types";
import { ProductForm } from "./_components/product-form";

import Note from "@/components/global/note";

export default function page() {
	const products = null;
	const categories: Category[] = [];
	const collections: collection[] = [];
	return (
		<div>
			<ProductForm
				initialData={null}
				categories={categories}
				collections={collections}
			/>
		</div>
	);
}
