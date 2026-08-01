import { auth, currentUser } from "@clerk/nextjs/server";

export type AppUser = { id: string; name: string; email: string; imageUrl?: string; role: "USER" | "ADMIN" };

export const isClerkEnabled = () => Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);

export async function getAppUser(): Promise<AppUser> {
  if (!isClerkEnabled()) {
    return { id: "demo-user", name: "Alex Morgan", email: "alex@projectforge.ai", role: "ADMIN" };
  }
  const session = await auth();
  if (!session.userId) return { id: "anonymous", name: "Guest", email: "", role: "USER" };
  const user = await currentUser();
  return {
    id: session.userId,
    name: user?.fullName ?? user?.firstName ?? "ProjectForge User",
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    imageUrl: user?.imageUrl,
    role: user?.publicMetadata?.role === "ADMIN" ? "ADMIN" : "USER",
  };
}

export async function requireApiUser() {
  const user = await getAppUser();
  if (user.id === "anonymous") throw new Error("UNAUTHORIZED");
  return user;
}
