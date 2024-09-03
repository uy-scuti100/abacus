import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";

interface DashBoardPageProps {
	params: { id: string };
}

const DashboardPage: React.FC<DashBoardPageProps> = async ({ params }) => {
	const supabase = createSupabaseServer();

	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;
	if (!userId) {
		redirect("/login");
	}

	const { data: store, error } = await supabase
		.from("stores")
		.select("*")
		.eq("id", params.id)
		.eq("vendor_id", userId)
		.single();

	if (!store) {
		redirect("/store");
	}

	// Fetch additional data (simulated for this example)
	const salesData = await fetchSalesData(store.id);
	const customerData = await fetchCustomerData(store.id);
	const inventoryData = await fetchInventoryData(store.id);

	return (
		<div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-4xl font-extrabold text-gray-900 mb-6">
				{store.name} Dashboard
			</h1>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<SummaryCard
					title="Total Sales"
					value={`${salesData.totalSales.toLocaleString()}`}
					change={+12.5}
				/>
				<SummaryCard
					title="Total Orders"
					value={salesData.totalOrders.toLocaleString()}
					change={+8.2}
				/>
				<SummaryCard
					title="Conversion Rate"
					value={`${salesData.conversionRate.toFixed(2)}%`}
					change={-1.5}
				/>
				<SummaryCard
					title="Average Order Value"
					value={`${salesData.averageOrderValue.toFixed(2)}`}
					change={+3.7}
				/>
			</div>

			{/* Sales Overview */}
			<div className="bg-white shadow-lg rounded-lg p-6 mb-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					Sales Overview
				</h2>
				<LineChart data={salesData.chartData} />
			</div>

			{/* Top Products and Customer Insights */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Top Products
					</h2>
					<BarChart data={salesData.topProducts} />
				</div>
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Customer Insights
					</h2>
					<PieChart data={customerData.demographics} />
				</div>
			</div>

			{/* Inventory Status */}
			<div className="bg-white shadow-lg rounded-lg p-6 mb-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					Inventory Status
				</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Product
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Stock
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Reorder Point
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{inventoryData.map((item, index) => (
								<tr key={index}>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.product}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
												item.status === "In Stock"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{item.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.reorderPoint}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Recent Orders */}
			<div className="bg-white shadow-lg rounded-lg p-6 mb-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Order ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Customer
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Total
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{salesData.recentOrders.map((order, index) => (
								<tr key={index}>
									<td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{order.customer}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										${order.total.toFixed(2)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
												order.status === "Completed"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{order.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
				<p className="text-blue-700">
					<span className="font-semibold">Pro Tip:</span> Use these insights to
					optimize your inventory, improve customer experience, and boost your
					sales performance.
				</p>
			</div>
		</div>
	);
};

const SummaryCard = ({
	title,
	value,
	change,
}: {
	title: string;
	value: string | number;
	change: number;
}) => (
	<div className="bg-white shadow-lg rounded-lg p-6">
		<h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
		<p className="text-3xl font-bold text-gray-800">{value}</p>
		<p className={`text-sm ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
			{change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
		</p>
	</div>
);

// Simulated data fetching functions
const fetchSalesData = async (storeId: string) => ({
	totalSales: 152350,
	totalOrders: 1837,
	conversionRate: 3.2,
	averageOrderValue: 82.93,
	chartData: [
		/* ... */
	],
	topProducts: [
		/* ... */
	],
	recentOrders: [
		{
			id: "1001",
			customer: "John Doe",
			date: "2023-05-15",
			total: 129.99,
			status: "Completed",
		},
		{
			id: "1002",
			customer: "Jane Smith",
			date: "2023-05-14",
			total: 79.5,
			status: "Processing",
		},
		// ... more orders
	],
});

const fetchCustomerData = async (storeId: string) => ({
	demographics: [
		/* ... */
	],
});

const fetchInventoryData = async (storeId: string) => [
	{
		product: "Premium Headphones",
		stock: 45,
		status: "In Stock",
		reorderPoint: 20,
	},
	{
		product: "Wireless Mouse",
		stock: 12,
		status: "Low Stock",
		reorderPoint: 15,
	},
	// ... more inventory items
];

export default DashboardPage;
const LineChart = ({ data }: { data: any }) => {
	const sampleData = [
		{ date: "2023-01", sales: 4000 },
		{ date: "2023-02", sales: 3000 },
		{ date: "2023-03", sales: 5000 },
		{ date: "2023-04", sales: 4500 },
		{ date: "2023-05", sales: 6000 },
	];
	return <SampleComponent title="Sales Trend" data={sampleData} type="line" />;
};

const BarChart = ({ data }: { data: any }) => {
	const sampleData = [
		{ category: "Category A", value: 12 },
		{ category: "Category B", value: 19 },
		{ category: "Category C", value: 3 },
		{ category: "Category D", value: 5 },
		{ category: "Category E", value: 2 },
	];
	return (
		<SampleComponent title="Customer Insights" data={sampleData} type="bar" />
	);
};

const PieChart = ({ data }: { data: any }) => {
	const sampleData = [
		{ name: "Product A", value: 400 },
		{ name: "Product B", value: 300 },
		{ name: "Product C", value: 200 },
		{ name: "Product D", value: 100 },
	];
	return <SampleComponent title="Top Products" data={sampleData} type="pie" />;
};

interface SampleComponentProps {
	title: string;
	data: any[];
	type: string;
}

const SampleComponent: React.FC<SampleComponentProps> = ({
	title,
	data,
	type,
}) => {
	// Implement the actual chart rendering logic here
	return <div>{title}</div>;
};
