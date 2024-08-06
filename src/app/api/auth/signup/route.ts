import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import UserModel from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";
import { z } from 'zod'
connect()


const userSchema = z.object({
    username: z.string().min(2, 'Username is required'),
    email: z.string().email('Invalid Email Address'),
    password: z.string().min(6, 'Password must be atleast 6 characters long')
})


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()

        const result = userSchema.safeParse(reqBody)

        if (!result.success) {
            return NextResponse.json({ message: 'Invalid Inputs', error: result.error.errors })
        }

        const {username , email , password} = result.data

        const userExist = await UserModel.findOne({ email: email })

        if (userExist) {
            return NextResponse.json({ message: 'User Already Exists Please Signin' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)


        const user = new UserModel({
            username,
            email,
            password: hashedPass
        })
        await user.save()

        return NextResponse.json({ message: 'User Signed up Successfully', data: user })



    } catch (error: any) {
        return NextResponse.json({
            message: 'Please try again',
            error: error.message
        }, { status: 500 })
    }
}