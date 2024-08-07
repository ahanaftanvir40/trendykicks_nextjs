import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server';

export async function getTokenData(request: NextRequest) {

    try {
        const token = request.cookies.get('token')?.value || ""
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)
        console.log("Decoded Token: ", decodedToken);

        return ( decodedToken )
    } catch (error: any) {
        throw new Error(error)
    }
}