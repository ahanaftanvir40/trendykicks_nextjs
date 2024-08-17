import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/Order";
connect()

export async function GET(request: NextRequest) {


    try {
        const DeliveredOrders = await OrderModel.find({ status: 'Delivered' }).populate('customer')

        const response = NextResponse.json({ message: 'Getting Delivered Products', Delivered: DeliveredOrders, success: true })
        response.headers.set('Cache-Control', 'no-store');

        return response

    } catch (error) {
        const response = NextResponse.json({ message: 'Failed To get delivered orders' });

        // Set Cache-Control header to no-store for error response as well
        response.headers.set('Cache-Control', 'no-store');

        return response;
    }
}