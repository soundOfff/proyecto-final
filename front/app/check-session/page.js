import { getServerSession } from "next-auth";
import { authOptions } from "/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function CheckSession() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  } else {
    redirect("/authentication/sign-in/basic");
  }
}
