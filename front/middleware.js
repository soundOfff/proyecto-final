import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!authentication/sign-in/basic).*)"],
};

export default withAuth({
  pages: {
    signIn: "authentication/sign-in/basic",
    signOut: "/dashboard/analytics",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
