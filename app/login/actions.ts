"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getURL } from "@/utils/helpers";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Invalid email or password");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login?message=Error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function oAuthSignIn(provider: "google") {
  if (!provider) {
    return redirect("/login?message=Invalid provider");
  }
  const supabase = createClient();
  const redirectUrl = getURL("/auth/callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });
  if (error) {
    redirect("/login?message=Could not login with provider");
  }

  return redirect(data.url);
}
