import { NextRequest, NextResponse } from "next/server";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function GET(request: NextRequest) {
    const headers = new Headers();
    headers.set('Cache-Control', 'no-store');

    try {


        const PendingOrders = await OrderModel.find({ status: 'Pending' }).populate('customer')
        console.log('Order error: ', PendingOrders);

        const response = NextResponse.json({ message: 'Getting Orders', Pending: PendingOrders })
        response.headers.set('Cache-Control', 'no-store');

        return response


    } catch (error: any) {
        const response = NextResponse.json({ message: 'Failed To get delivered orders' });

        // Set Cache-Control header to no-store for error response as well
        response.headers.set('Cache-Control', 'no-store');

        return response;
    }
}