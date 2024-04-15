import type {NextAuthOptions} from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";
import dotenv from "dotenv";

dotenv.config();

export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID as string,
            clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
            issuer: process.env.COGNITO_ISSUER,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    givenName: profile.given_name,
                    familyName: profile.family_name,
                };
            },
        }),
    ],
    theme: {
        colorScheme: "dark",
        brandColor: "#000",
        // logo: ""
        buttonText: "#fff"
    }
}




