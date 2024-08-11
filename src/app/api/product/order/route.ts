import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/Order";
connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { customer, products, totalAmount, currency, shippingAddress } = reqBody

        const newOrder = new OrderModel({
            customer,
            products,
            totalAmount,
            currency,
            shippingAddress
        })

       const savedOrder =  await newOrder.save()

       return NextResponse.json({success:true , message:'Order Placed' , savedOrder})




    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed To Place Order' })
    }
}
