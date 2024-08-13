import Image from "next/image";

export default function HowItWorks() {
	const images: string[] | [] = ["/1.svg", "/2.svg", "/3.svg"];
	return (
		<div className="my-10 mx-auto">
			<h3 className="text-center font-bold text-xl md:text-2xl md:leading-[32px] leading-[24px] mb-3 md:mb-0 ">
				How Abacus Elevates Your Selling Experience
			</h3>
			<p className="text-gray-600 max-w-[350px] md:max-w-[600px] text-center mx-auto">
				Start Selling in Just a Few Clicks
			</p>
			<div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-10">
				{howItWorks.map((how, index) => (
					<HowCard
						key={index}
						index={index}
						images={images}
						title={how.title}
						description={how.description}
					/>
				))}
			</div>
		</div>
	);
}

const HowCard = ({
	title,
	images,
	index,
	description,
}: {
	index: number;
	images: string[] | [];
	title: string;
	description: string;
}) => {
	return (
		<div className="flex flex-col justify-center items-center gap-10 basis-1/3 p-10 bg-white rounded-xl relative h-[250px]">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
				<Image
					src={images[index]}
					alt={`Image ${index + 1}`}
					width={100}
					height={100}
					className="w-16 h-16 mb-4"
				/>
			</div>
			<h3 className="text-lg font-bold mb-2">{title}</h3>
			<p className="text-center text-gray-500">{description}</p>
			<div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-b from-white to-[#F1F4F7] " />
		</div>
	);
};

const howItWorks = [
	{
		title: "Join the Marketplace",
		description:
			"Sign up easily from our login page. Once registered, you'll gain access to your personalized dashboard.",
	},
	{
		title: "Set Up Your Store",
		description:
			"Create and manage your products, categories, and collections. Customize your offerings and get ready to showcase your items to the world.",
	},
	{
		title: "Go Live & Grow",
		description:
			"Publish your products and collections live with a single click. Utilize powerful tools like CRM, back-in-stock notifications, and more to manage and grow your business effectively.",
	},
];
