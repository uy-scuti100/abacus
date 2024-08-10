import nextra from "nextra";

/** @type {import('next').NextConfig} */
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
		],
	},
};

const withNextra = nextra({
	theme: "nextra-theme-docs",
	themeConfig: "./theme.config.tsx",
});

export default withNextra(nextConfig);
