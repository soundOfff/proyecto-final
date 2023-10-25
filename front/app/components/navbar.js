"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  if (session) {
    return (
      <nav className="float-right p-10">
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </nav>
    );
  }

  return (
    <nav className="float-right p-10">
      <button onClick={() => signIn("google")}>Sign in</button>
    </nav>
  );
}
