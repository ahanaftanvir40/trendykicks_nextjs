import { NextRequest ,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Products from "@/models/Products";
connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {paramID} = reqBody

        const product = await Products.findById(paramID)

        return NextResponse.json({message:'Found The Product' , data:product})

        
    } catch (error:any) {
        return NextResponse.json({message:"Failed to get a product" , error:error.message} , {status:500})
    }
}