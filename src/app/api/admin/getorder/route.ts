import { NextRequest, NextResponse } from "next/server";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";


export async function GET(request: NextRequest) {
    await connect()
    try {


        const PendingOrders = await OrderModel.find({ status: 'Pending' }).populate('customer')
        console.log('Order error: ' , PendingOrders);
        
        return NextResponse.json({ message: 'Getting Orders', Pending: PendingOrders  })


    } catch (error:any) {
        return NextResponse.json({ message: error.message })
    }
}