import mongoose , {Schema , Document} from "mongoose";

interface Products extends Document{
    name: string,
    brand: string,
    price: number,
    currency: string,
    stock: number,
    sizes: string[],
    colors: string[],
    image: string,
    isFeatured: boolean,
    description:string
}


const ProductSchema : Schema<Products> = new Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    sizes:{
        type:[String],

    },
    colors:{
        type:[String]
    },
    image: {
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:true
    }
})

const Products = mongoose.models.products as  mongoose.Model<Products>  || mongoose.model('products' , ProductSchema)
export default Products