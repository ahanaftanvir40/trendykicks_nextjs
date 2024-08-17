import mongoose, { Schema, Document, Types, model } from "mongoose";





interface Product {
    name: string;
    brand: string;
    price: number;
    currency: string;
    size: string;
    color: string;
    image: string;
    quantity: number;
}


interface Order extends Document {
    customer: Schema.Types.ObjectId;
    products: Product[];
    totalAmount: number;
    currency: string;
    orderDate: Date;
    shippingAddress: string;
    status: string;
}


const ProductSchema: Schema<Product> = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const OrderSchema: Schema<Order> = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [ProductSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }

})

const OrderModel = mongoose.models.orders as mongoose.Model<Order> || mongoose.model('orders', OrderSchema)

export default OrderModel