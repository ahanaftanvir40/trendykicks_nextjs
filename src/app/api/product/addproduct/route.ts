import { NextRequest, NextResponse } from "next/server";
import Products from "@/models/Products";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { name, brand, price, currency, stock, sizes, colors, image, isFeatured,
            description } = reqBody

        const newProduct = new Products({
            name,
            brand,
            price,
            currency,
            stock,
            sizes,
            colors,
            image,
            isFeatured,
            description
        })

        await newProduct.save()
        console.log(newProduct);


        return NextResponse.json({ success: true , message:'Product Added Succesfully'})


    } catch (error: any) {
        return NextResponse.json({ message: 'Failed To Add Products'  , error:error.message} ,{status:500});
    
    }
}