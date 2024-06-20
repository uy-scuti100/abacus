import { Provider } from "@supabase/supabase-js";
import { createSupabaseBrowser } from "@/supabase/client";

const redirect = (path: string) => {
	window.location.href = path;
};

export const signup = async (email: string, password: string) => {
	const supabase = createSupabaseBrowser();

	try {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}/auth/confirm?next=/store`,
			},
		});

		redirect("/verify-email?email=" + email);
	} catch (error) {
		console.error("Signup error:", error);
	}
};

export const login = async (email: string, password: string) => {
	const supabase = createSupabaseBrowser();

	try {
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			console.log("error", error);
			return redirect(`/login?message=${error.message}`);
		}
		return redirect("/store");
	} catch (error) {
		// Handle sign-in errors appropriately
		console.error("Signin error:", error);
		// Inform the user about the error
	}
};

// 468 767 504
export const handleSocialLogin = async (provider: Provider) => {
	try {
		const supabase = createSupabaseBrowser();
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/auth/callback?next=/store`,
			},
		});
	} catch (error) {
		console.error("Social login error:", error);
	}
};
