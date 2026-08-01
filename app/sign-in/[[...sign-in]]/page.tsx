import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth/auth-screen";

export const metadata:Metadata={title:"Sign in",robots:{index:false,follow:false}};
export default function SignInPage(){return <AuthScreen mode="sign-in"/>}
