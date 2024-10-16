// "use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/login/actions";

export default async function MainNavLinks() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/todo" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Todo
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {user !== null ? (
          <NavigationMenuItem>
            <form action={signOut}>
              <button
                className={`${navigationMenuTriggerStyle()} border: 2px`}
                style={{ border: "2px solid black", padding: "16px" }}
              >
                Logout
              </button>
            </form>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border: 2px`}
                style={{ border: "2px solid black", padding: "16px" }}
              >
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
