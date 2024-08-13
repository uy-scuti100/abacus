import Customercare from "./assets/customer-care";
import DataIcon from "./assets/data";
import ProductManagement from "./assets/product-management";
import FormIconComponent from "./assets/form";
import StoreIcon from "./assets/store";
import Invoice from "./assets/invoice";
import ReturnIcon from "./assets/return";
import ApIcon from "./assets/api";

export default function Benefits() {
	return (
		<div className="my-10 mx-auto">
			<div className="bg-slate-200 pt-10 pb-20 rounded-t-xl relative px-5">
				<h3 className="text-center font-bold text-xl md:text-2xl md:leading-[32px] leading-[24px] mb-10 md:mb-0 ">
					Transform Your Store Management <br /> and Boost Efficiency with
					Abacus
				</h3>

				<div className="grid grid-cols-1 sm:grod-cols-2 lg:grid-cols-3 gap-8 justify-content-start between mt-10">
					{benefits.map((benefit, index) => (
						<BenefitCard
							key={index}
							title={benefit.title}
							description={benefit.description}
							icon={benefit.icon}
						/>
					))}
				</div>

				<div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-b from-slate-200 to-[#F1F4F7] " />
			</div>
		</div>
	);
}

const BenefitCard = ({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col justify-center items-center p-10 bg-white rounded-xl shadow-md">
			<div className="w-16 h-16 mb-4">{icon}</div>
			<h3 className="text-lg font-bold mb-2">{title}</h3>
			<p className="text-sm text-gray-500">{description}</p>
		</div>
	);
};
const benefits = [
	{
		title: "Streamlined Product Management",
		description:
			"Easily add and organize products with a user-friendly form that captures all essential details. Create coupons and invoices, and manage orders effortlessly.",
		icon: <Invoice />,
	},
	{
		title: "Enhanced Customer Experience",
		description:
			"Handle out-of-stock requests smoothly to keep customers informed and engaged. Visualize your store layout to see how products will look before they go live.",
		icon: <Customercare />,
	},
	{
		title: "Reduced Returns and Complaints",
		description:
			"Effective customer service helps address customer issues and queries promptly, reducing the likelihood of returns and complaints. This not only saves costs associated with returns but also enhances the overall shopping experience.",
		icon: <ReturnIcon />,
	},
	{
		title: "Powerful Data Insights",
		description:
			"Make smart decisions with a detailed dashboard that provides clear visualizations of your sales and inventory data, enabling quick and effective decision-making.",
		icon: <DataIcon />,
	},
	{
		title: "Flexible Store Creation",
		description:
			"Manage multiple stores with ease, each with clear separation and organization. Customize each store's settings and operations to fit your business needs.",

		icon: <StoreIcon />,
	},
	{
		title: "Developer-Friendly APIs",
		description:
			"Access and update store data seamlessly with well-documented REST and GraphQL APIs. Perfect for developers looking to integrate Abacus with other platforms and storefronts.",
		icon: <ApIcon />,
	},
];
