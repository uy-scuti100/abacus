import { SettingsForm } from "./_components/settings-form";
import { createSupabaseServer } from "@/supabase/server";
import { redirect } from "next/navigation";

// Define the type for the API key data
type ApiKeyData = {
	"api-key": string | null;
};

// Define the type for the store data

export default async function SettingsPage({
	params,
}: {
	params: { id: string };
}) {
	const storeId = params.id;
	const supabase = createSupabaseServer();
	const { data: currentUser } = await supabase.auth.getUser();
	const userId = currentUser.user?.id;

	if (!userId) {
		redirect("/login");
	}

	const { data: apiKeyData, error: apiKeyError } = await supabase
		.from("vendors")
		.select("api-key")
		.eq("id", userId)
		.single<ApiKeyData>();

	let apiKey: string | null = null;
	if (apiKeyError) {
		console.error("Error fetching API key:", apiKeyError);
	} else {
		apiKey = apiKeyData["api-key"];
	}

	const { data: store, error } = await supabase
		.from("stores")
		.select("*")
		.eq("vendor_id", userId)
		.eq("id", storeId)
		.single();

	if (!store) {
		redirect(`/store`);
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 px-4 pt-6">
				<SettingsForm
					initialData={store}
					apiKey={apiKey}
					storeId={storeId}
					vendorId={userId}
				/>
			</div>
		</div>
	);
}
