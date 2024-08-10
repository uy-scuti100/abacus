import Aside from "@/components/global/aside";
import Header from "@/components/global/header";
import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createSupabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}
	return (
		<div className="">
			<div className="flex">
				<div className=" flex-1">
					<Aside />
				</div>

				<div className="h-full w-full relative">
					<Header />
					<div className="">{children}</div>
				</div>
			</div>
		</div>
	);
}
