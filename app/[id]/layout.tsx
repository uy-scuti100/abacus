import Aside from "@/components/global/aside";
import Header from "@/components/global/header";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="">
			<div className="flex">
				<div className=" flex-1">
					<Aside />
				</div>

				<div className="h-full w-full relative">
					<Header />
					<div className="p-3">{children}</div>
				</div>
			</div>
		</div>
	);
}
