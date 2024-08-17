import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";
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


        const savedOrder = await newOrder.save()
        await UserModel.findByIdAndUpdate(customer, { orders: savedOrder._id })

        return NextResponse.json({ success: true, message: 'Order Placed', savedOrder })




    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed To Place Order' })
    }
}
