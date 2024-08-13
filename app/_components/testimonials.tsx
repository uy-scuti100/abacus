"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
const reviews = [
	{
		name: "Arjun",
		username: "@arjun",
		body: "Setting up my store was a breeze, and the tools available make managing my inventory so easy. Highly recommend this platform to any vendor!",
		img: "https://avatar.vercel.sh/arjun",
	},
	{
		name: "Li Wei",
		username: "@liwei",
		body: "The analytics dashboard provides such valuable insights into my sales. It's helped me optimize my product listings and increase my revenue.",
		img: "https://avatar.vercel.sh/liwei",
	},
	{
		name: "Amina",
		username: "@amina",
		body: "The CRM feature is a game-changer. It allows me to maintain great relationships with my customers and personalize their shopping experience.",
		img: "https://avatar.vercel.sh/amina",
	},
	{
		name: "Carlos",
		username: "@carlos",
		body: "Publishing products and collections is so straightforward, and the support team is always there to help if I have any questions.",
		img: "https://avatar.vercel.sh/carlos",
	},
	{
		name: "Fatima",
		username: "@fatima",
		body: "I love how I can set up back-in-stock notifications easily. It keeps my customers informed and helps drive more sales.",
		img: "https://avatar.vercel.sh/fatima",
	},
	{
		name: "Lars",
		username: "@lars",
		body: "The platform’s seamless integration with payment systems has made transactions smooth and reliable. This has boosted my store’s credibility.",
		img: "https://avatar.vercel.sh/lars",
	},
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<section className="my-10 mx-auto">
			<figure
				className={cn(
					"relative w-64 cursor-pointer overflow-hidden rounded-xl border py-6 px-5 h-full",
					// light styles
					"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
					// dark styles
					"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
				)}
			>
				<div className="flex flex-row items-center gap-2">
					<img
						className="rounded-full"
						width="32"
						height="32"
						alt=""
						src={img}
					/>
					<div className="flex flex-col">
						<figcaption className="text-sm font-medium dark:text-white">
							{name}
						</figcaption>
						<p className="text-xs font-medium dark:text-white/40">{username}</p>
					</div>
				</div>
				<blockquote className="mt-2 text-sm text-gray-600 leading-[160%]">
					{body}
				</blockquote>
			</figure>
		</section>
	);
};

export default function Testimonials() {
	return (
		<div className="mt-20">
			<div className="text-center mx-auto flex flex-col items-center justify-center">
				<h3 className=" font-bold text-xl md:text-2xl md:leading-[32px] leading-[24px] mb-10 md:mb-0 ">
					Voices of Success
				</h3>
				<p className="text-gray-600 max-w-[350px] md:max-w-[600px] ">
					Explore how our platform is empowering vendors worldwide to transform
					their businesses and delight their customers.
				</p>
			</div>

			<div className="relative flex flex-col overflow-hidden">
				<Marquee pauseOnHover className="[--duration:20s]">
					{firstRow.map((review) => (
						<ReviewCard key={review.username} {...review} />
					))}
				</Marquee>
				<Marquee reverse pauseOnHover className="[--duration:20s]">
					{secondRow.map((review) => (
						<ReviewCard key={review.username} {...review} />
					))}
				</Marquee>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F1F4F7] dark:from-background"></div>
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#F1F4F7] dark:from-background"></div>
			</div>
		</div>
	);
}
