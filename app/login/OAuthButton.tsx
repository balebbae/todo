"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { oAuthSignIn } from "./actions";

export const OAuthButton = () => {
  return (
    <Button
      variant="outline"
      className="width-full flex items-center justify-center gap-2"
      onClick={async () => {
        await oAuthSignIn("google");
      }}
    >
      <FcGoogle className="size-5" />
      Login with Google
    </Button>
  );
};

export default OAuthButton;
