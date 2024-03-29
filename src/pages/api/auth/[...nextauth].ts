import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "@/database";
import { oAuthToDbUser } from "@/database/dbUsers";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Custom Login",
			credentials: {
				email: {
					label: "Correo",
					type: "email",
					placeholder: "Correo@google.com",
				},
				password: {
					label: "Contraseña",
					type: "password",
					placeholder: "Contraseña",
				},
			},
            //@ts-ignore
			async authorize(credentials) {
                return await dbUsers.checkUserEmailPass(credentials!.email, credentials!.password)
			},
		}),

		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID || "",
			clientSecret: process.env.FACEBOOK_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
	],
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register'
	},
    callbacks: {
        async jwt({token, account, user}: any) {

            if(account){
                token.accessToken = account.access_token;
                switch( account.type ){

                    case 'oauth': 
                        token.user = await oAuthToDbUser(user?.email || '', user?.name || '' );
                    break;

                    case 'credentials': 
                        token.user = user;
                    break;
                }
            }
            
            return token;
        },

        async session ({session, token, user}: any){
            
            session.access_token = token.accessToken;
            session.user = token.user;
            
            return session;
        }
    },
	session: {
		maxAge: 2592000,
		updateAge: 86400
	}
};

export default NextAuth(authOptions);
