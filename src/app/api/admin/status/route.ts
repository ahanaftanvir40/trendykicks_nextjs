import { NextRequest, NextResponse } from "next/server";
import OrderModel from "@/models/Order";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
    await connect()

    try {

        const { OrderId, NewStatus } = await request.json()
        await OrderModel.findByIdAndUpdate(OrderId, { status: NewStatus })
        return NextResponse.json({ message: `status update of order ${OrderId}`, success: true })



    } catch (error) {
        return NextResponse.json({ Message: 'Failed To updated Status' })
    }
}