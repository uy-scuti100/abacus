// global imports

import ProductClient from "./_components/productClient";

// local imports

export default async function page({ params }: { params: { id: string } }) {
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 px-4 pt-6">
				<ProductClient storeId={params.id} />
			</div>
		</div>
	);
}
