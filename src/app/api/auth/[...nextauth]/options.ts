import bcrypt from 'bcryptjs';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";
connect()

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {

                try {
                    const user = await UserModel.findOne({ email: credentials.email })

                    if (!user) {
                        throw new Error('User Doesnt Exist Please Signup')
                    }
                    if (!user.isVerified) {
                        throw new Error('Please Verify Your Email')
                    }

                    const result = await bcrypt.compare(credentials.password, user.password)

                    if (!result) {
                        throw new Error('Invalid Credentials')
                    } else {
                        return user
                    }

                } catch (error: any) {
                    throw new Error(error)
                }
            }

        })
    ],
    callbacks: {

        async jwt({ token, user }) {

            if (user) {
                token._id = user._id?.toString()
                token.email = user.email
                token.isAdmin = user.isAdmin

            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.email = token.email
                session.user.isAdmin = token.isAdmin
            }
            return session
        },
    },
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXT_AUTH

}