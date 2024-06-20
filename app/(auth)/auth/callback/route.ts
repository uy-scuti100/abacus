import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/store/dashboard";

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.delete({ name, ...options });
					},
				},
			}
		);
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

// import { NextResponse } from "next/server";
// import { createSupabaseServer } from "@/supabase/server";

// export async function GET(request: Request) {
// 	const requestUrl = new URL(request.url);
// 	const code = requestUrl.searchParams.get("code");
// 	const origin = requestUrl.origin;

// 	if (code) {
// 		const supabase = createSupabaseServer();
// 		await supabase.auth.exchangeCodeForSession(code);
// 	}

// 	// URL to redirect to after sign up process completes
// 	return NextResponse.redirect(`${origin}/store/dashbaord`);
// }
