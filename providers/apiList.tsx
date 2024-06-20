"use client";

import { useParams } from "next/navigation";
import { UseOrigin } from "@/hooks/useOrigin";
import { ApiAlert } from "./api-alert";
import Note from "@/components/global/note";

interface ApiListProps {
	entityName: string;
	apikey: string;
	entityId: string;
}

export const ApiList: React.FC<ApiListProps> = ({
	entityName,
	apikey,
	entityId,
}) => {
	const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`;

	return (
		<>
			<div>
				<div className="flex flex-col gap-6">
					<ApiAlert
						title="GET ALL"
						description={`${baseUrl}/${entityName}?&apikey={${apikey}}`}
						variant="public"
					/>
					<ApiAlert
						title="GET ONE"
						description={`${baseUrl}/${entityName}?id=eq.{${entityId}}?&apikey={${apikey}}`}
						variant="public"
					/>
				</div>
			</div>
		</>
	);
};
