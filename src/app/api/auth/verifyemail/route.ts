import { NextRequest , NextResponse } from "next/server";
import UserModel from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await UserModel.findOne({verifytoken:token , verifyexpiry:{$gt: Date.now()}})

        if(!user){
            return NextResponse.json({message: 'Please Try To SignUp Again'})
        }

        user.isVerified = true,
        user.verifytoken = ''
        user.verifyexpiry = undefined
        await user.save()

        return NextResponse.json({message:'User is Verified Successfully'})

    } catch (error) {
        return NextResponse.json({message:'Verification Failed'})
    }
}