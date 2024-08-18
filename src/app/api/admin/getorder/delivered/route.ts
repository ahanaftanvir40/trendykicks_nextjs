import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/Order";
connect()

export async function POST(request: NextRequest) {

    try {
        const DeliveredOrders = await OrderModel.find({ status: 'Delivered' }).populate('customer')

        return NextResponse.json({ message: 'Getting Delivered Products', Delivered: DeliveredOrders, success: true })

    } catch (error) {
        return NextResponse.json({ message: 'Failed To get delivered orders' })
    }
}