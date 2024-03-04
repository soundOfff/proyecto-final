import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token);
      // TODO get current staff from access token
      const url = new URL(`${process.env.API_URL}/login`);

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: token.email,
          token: token.accessToken,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
      }

      const { data: staff } = await res.json();

      session.staff = staff;

      return session;
    },
  },
};

export default NextAuth(authOptions);
