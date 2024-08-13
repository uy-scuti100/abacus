import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
	return (
		<Accordion type="single" collapsible className="w-full ">
			<AccordionItem value="item-1">
				<AccordionTrigger>
					{" "}
					How do I sign up to become a vendor?
				</AccordionTrigger>
				<AccordionContent>
					To become a vendor, click the "Sign Up" button on the login page and
					follow the registration process. Once your account is created, you'll
					have access to your vendor dashboard, where you can start setting up
					your store and products.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>
					What tools are available to help manage my store?
				</AccordionTrigger>
				<AccordionContent>
					Our platform offers a range of tools to help you manage your store
					effectively, including product and category management, collection
					creation, CRM for customer relationship management, back-in-stock
					notifications, and detailed sales analytics to help you optimize your
					business.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>
					How do I publish my products and collections live?
				</AccordionTrigger>
				<AccordionContent>
					After creating your products, categories, and collections, you can
					publish them live with just a click from your dashboard. This makes
					them immediately visible to potential customers on the platform.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-5">
				<AccordionTrigger>
					Can I track performances of products and stores?
				</AccordionTrigger>
				<AccordionContent>
					Yes, our platform provides comprehensive analytics that allows you to
					track the performance of your products and store. You can monitor
					sales trends, customer engagement, and other key metrics to help you
					make informed business decisions.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-4">
				<AccordionTrigger>
					Are there fees for selling on the platform?
				</AccordionTrigger>
				<AccordionContent>
					Our platform operates on a commission-based model, where a small
					percentage of each sale is taken as a fee. This allows us to maintain
					the platform and provide you with high-quality tools and support.
					Detailed information on our fee structure is available in the vendor
					agreement.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

export default function Faq() {
	return (
		<div className="my-10 mx-auto">
			<AccordionDemo />
		</div>
	);
}

// cta

// 4. Are there any fees or commissions for selling on the platform?

// Our platform operates on a commission-based model, where a small percentage of each sale is taken as a fee. This allows us to maintain the platform and provide you with high-quality tools and support. Detailed information on our fee structure is available in the vendor agreement.

// 5. Can I track the performance of my products and store?

// Yes, our platform provides comprehensive analytics that allows you to track the performance of your products and store. You can monitor sales trends, customer engagement, and other key metrics to help you make informed business decisions.
