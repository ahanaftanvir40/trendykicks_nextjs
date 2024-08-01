import { NextRequest ,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Products from "@/models/Products";
connect()

export async function GET(request:NextRequest) {
    try {
        const products = await Products.find()

        return NextResponse.json({success:true , data: products})
    } catch (error:any) {
        return NextResponse.json({success:false , message:'Error fetching products'} , {status:500})
    }
}