import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorization: {
      params: {
        prompt: "select_account"
      }
    }
  })],
  callbacks: {
    async signIn({user}){
      const request = await fetch(`${process.env.NEXTAUTH_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json"
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          image: user.image,
          password: "h",
        })
      })
      const data = await request.json();
      if(data.message === "El usuario ya existe"){
        return true;
      }
      if(data.status === "error"){
        return false;
      }
      return true
    }
  },
  pages: {
    error: "/login"
  },
  
})

export { handler as GET, handler as POST };

