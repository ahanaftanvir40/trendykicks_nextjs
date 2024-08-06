import mongoose, { Schema, Document, Types } from "mongoose";

interface User extends Document {
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    isVerified:boolean,
    verifytoken:string,
    verifyexpiry: Date,
    orders: Types.ObjectId
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifytoken:{
        type:String,
        required:true
    },
    verifyexpiry:{
        type:Date
    },


    orders: {
        type:Schema.Types.ObjectId,
        ref:'orders'
    }
})


const UserModel = mongoose.models.users as mongoose.Model<User> || mongoose.model('users', UserSchema)

export default UserModel