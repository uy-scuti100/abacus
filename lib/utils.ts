import { v4 as uuidv4 } from "uuid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
	const randomString = uuidv4().slice(0, 8);

	// Combine the sanitized title with the random string
	const slug = `${sanitizedTitle}-${randomString}`;

	return slug;
};

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
