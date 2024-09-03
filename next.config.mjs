/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";
import nextra from "nextra";

const withPWAConfig = nextPWA({
	dest: "public",
});

const withNextra = nextra({
	theme: "nextra-theme-docs",
	themeConfig: "./theme.config.tsx",
});

const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
				protocol: "https",
			},
			{
				hostname: "i.pinimg.com",
				protocol: "https",
			},
			{
				hostname: "lh3.googleusercontent.com",
				protocol: "https",
			},
			{
				hostname: "avatars.githubusercontent.com",
				protocol: "https",
			},
			{
				hostname: "avatar.vercel.sh",
				protocol: "https",
			},
		],
	},
};

// Combine both wrappers
export default withPWAConfig(withNextra(nextConfig));
