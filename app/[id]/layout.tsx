import Aside from "@/components/global/aside";
import Header from "@/components/global/header";
import { ModalProvider } from "@/providers/modalProvider";
import QueryProvider from "@/providers/query-provider/tanstack";
import { ToastProvider } from "@/providers/toastProvider";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="">
			<div className="flex">
				<div className=" flex-1">
					<Aside />
				</div>

				<div className="h-full w-full px-3 relative">
					<Header />
					{children}
				</div>
			</div>
		</div>
	);
}
