import "./globals.css";
import { ToastProvider } from "@/providers/toastProvider";
import { ModalProvider } from "@/providers/modalProvider";
import { Montserrat } from "next/font/google";
import QueryProvider from "@/providers/query-provider/tanstack";
import TopLoader from "@/components/global/top-loader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/utils";
import { Metadata } from "next";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: [
		"Abacus",
		"e-commerce platform",
		"online store management",
		"product management",
		"vendor tools",
		"CRM integration",
		"back-in-stock notifications",
		"collections management",
		"business growth",
		"small business solutions",
		"inventory management",
		"sales optimization",
		"customer engagement",
		"intuitive dashboard",
		"live product publishing",
		"centralized operations",
		"sales management",
		"streamline store operations",
		"e-commerce solutions",
		"online sales enhancement",
	],

	authors: [
		{
			name: "Abacus",
			url: "https://abacus-psi.vercel.app",
		},
	],
	creator: "Uy_Scuti",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@hussain_joe",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${montserrat.variable} antialiased`}
			suppressHydrationWarning
		>
			<body>
				<TopLoader />
				<QueryProvider>
					<ToastProvider />
					<ModalProvider />
					{children}
					<Analytics />
					<SpeedInsights />
				</QueryProvider>
			</body>
		</html>
	);
}
