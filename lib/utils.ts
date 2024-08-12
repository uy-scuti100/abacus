import { v4 as uuidv4 } from "uuid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createSupabaseServer } from "@/supabase/server";
import { Resend } from "resend";
import { Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Function to generate an SEO-friendly slug
export const generateSlug = (title: string) => {
	// Remove special characters, replace spaces with hyphens, and convert to lowercase
	const sanitizedTitle = title
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-");

	// Generate a random UUID and extract a portion of it for uniqueness
	const randomString = uuidv4().slice(0, 4);

	// Combine the sanitized title with the random string
	const slug = `${sanitizedTitle}-${randomString}`;

	return slug;
};

// async function notifyBackInStock(productId: string) {
// 	const supabase = createSupabaseServer();
// 	const { data: requests, error } = await supabase
// 		.from("back_in_stock_requests")
// 		.select("*")
// 		.eq("productId", productId)
// 		.eq("notified", false);

// 	if (error) {
// 		console.error("Error fetching back-in-stock requests:", error);
// 		return;
// 	}

// 	// Send notifications to all users
// 	for (const request of requests) {
// 		await sendEmailNotification(request.email, productId);

// 		// Mark as notified
// 		await supabase
// 			.from("back_in_stock_requests")
// 			.update({ notified: true })
// 			.eq("id", request.id);
// 	}

// 	// Optionally, delete processed requests
// 	await supabase.from("back_in_stock_requests").delete().eq("notified", true);
// }

// const resend = new Resend("<YOUR_RESEND_API_KEY>");

// async function sendEmailNotification(
// 	email: string,
// 	product: Product,
// 	productUrl: string
// ) {
// 	const { title, media } = product;
// 	const imageUrl = media[0];

// 	const emailContent = {
// 		from: "Your Store <no-reply@yourstore.com>",
// 		to: email,
// 		subject: `🎉 It's Back! ${title} is Now Available – Don't Miss Out!`,
// 		html: `
//       <div style="font-family: Arial, sans-serif; color: #333;">
//         <h1>Hi there,</h1>
//         <p>We've got great news for you! The product you've been waiting for is back in stock, and we wanted you to be the first to know. 🎉</p>

//         <h2>${title}</h2>
//         <img src="${imageUrl}" alt="${title}" style="width: 100%; max-width: 600px; height: auto;"/>

//         <p><strong>Why You'll Love It:</strong></p>
//         <ul>
//           <li><strong>Feature 1:</strong> Brief description of the feature.</li>
//           <li><strong>Feature 2:</strong> Brief description of the feature.</li>
//           <li><strong>Feature 3:</strong> Brief description of the feature.</li>
//         </ul>

//         <p style="text-align: center;">
//           <a href="${productUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Shop Now</a>
//         </p>

//         <p>Don't wait too long—this product is popular, and we can't guarantee how long it will be in stock.</p>

//         <p>Thank you for being a valued customer. We hope you enjoy your purchase!</p>

//         <p>Best regards,<br/><strong>Your Store Name</strong><br/><a href="https://yourstore.com">www.yourstore.com</a></p>
//       </div>
//     `,
// 	};

// 	try {
// 		const response = await resend.post(emailContent);
// 		console.log("Email sent successfully:", response);
// 	} catch (error) {
// 		console.error("Error sending email:", error);
// 	}
// }

// import { Resend } from 'resend';

// const resend = new Resend('<YOUR_RESEND_API_KEY>');

// async function sendEmailNotification(productId) {
//   // Query the database for all email addresses related to the productId
//   const { data: requests, error } = await supabase
//     .from('back_in_stock_requests')
//     .select('email')
//     .eq('productId', productId)
//     .eq('notified', false);

//   if (error) {
//     console.error('Error fetching back-in-stock requests:', error);
//     return;
//   }

//   const emails = requests.map(request => request.email);

//   // Product information
//   const product = {
//     name: 'Cool Hoodie',
//     imageUrl: 'https://yourstore.com/images/cool-hoodie.jpg',
//     productUrl: 'https://yourstore.com/products/cool-hoodie',
//   };

//   const emailContent = {
//     from: 'Your Store <no-reply@yourstore.com>',
//     to: emails,  // Array of email addresses
//     subject: `🎉 It's Back! ${product.name} is Now Available – Don't Miss Out!`,
//     html: `
//       <div style="font-family: Arial, sans-serif; color: #333;">
//         <h1>Hi there,</h1>
//         <p>We’ve got great news for you! The product you’ve been waiting for is back in stock, and we wanted you to be the first to know. 🎉</p>

//         <h2>${product.name}</h2>
//         <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; max-width: 600px; height: auto;"/>

//         <p><strong>Why You'll Love It:</strong></p>
//         <ul>
//           <li><strong>Feature 1:</strong> Brief description of the feature.</li>
//           <li><strong>Feature 2:</strong> Brief description of the feature.</li>
//           <li><strong>Feature 3:</strong> Brief description of the feature.</li>
//         </ul>

//         <p style="text-align: center;">
//           <a href="${product.productUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Shop Now</a>
//         </p>

//         <p>Don’t wait too long—this product is popular, and we can’t guarantee how long it will be in stock.</p>

//         <p>Thank you for being a valued customer. We hope you enjoy your purchase!</p>

//         <p>Best regards,<br/><strong>Your Store Name</strong><br/><a href="https://yourstore.com">www.yourstore.com</a></p>
//       </div>
//     `,
//   };

//   try {
//     const response = await resend.send(emailContent);
//     console.log('Emails sent successfully:', response);

//     // Mark all requests as notified
//     await supabase
//       .from('back_in_stock_requests')
//       .update({ notified: true })
//       .in('email', emails)
//       .eq('productId', productId);

//     // Optionally, delete the processed requests
//     await supabase
//       .from('back_in_stock_requests')
//       .delete()
//       .eq('productId', productId)
//       .eq('notified', true);

//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// import relativeTime from "dayjs/plugin/relativeTime";
// import dayjs from "dayjs";

// dayjs.extend( relativeTime );
// dayjs().diff(category?.created_at, "seconds", true) < 30
// 	? "just now"

// dynamicBlurDataUrl.js
// const baseUrl =
// 	process.env.NODE_ENV === "development"
// 		? "http://localhost:3000/"
// 		: process.env.NEXT_PUBLIC_DOMAIN;

// export async function dynamicBlurDataUrl(urls: string[]) {
// 	const base64strs = await Promise.all(
// 		urls.map(async (url) => {
// 			const base64str = await fetch(
// 				`${baseUrl}/_next/image?url=${url}&w=16&q=75`
// 			).then(async (res) =>
// 				Buffer.from(await res.arrayBuffer()).toString("base64")
// 			);

// 			const blurSvg = `
//     <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
//       <filter id='b' color-interpolation-filters='sRGB'>
//         <feGaussianBlur stdDeviation='1' />
//       </filter>

//       <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'
//       href='data:image/avif;base64,${base64str}' />
//     </svg>
//   `;

// 			const toBase64 = (str: string) =>
// 				typeof window === "undefined"
// 					? Buffer.from(str).toString("base64")
// 					: window.btoa(str);

// 			return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
// 		})
// 	);

// 	return base64strs;
// }
