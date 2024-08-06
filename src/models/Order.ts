import mongoose, { Schema, Document, Types, model } from "mongoose";

interface Order extends Document {
    customer: Types.ObjectId
    name: string,
    brand: string,
    price: number,
    currency: string,
    stock: number,
    size: string,
    color: string,
    image: string,
    isFeatured: boolean,
}


const OrderSchema: Schema<Order> = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean
    }

})

const OrderModel = mongoose.models.orders as mongoose.Model<Order> || mongoose.model('orders' , OrderSchema)

export default OrderModel