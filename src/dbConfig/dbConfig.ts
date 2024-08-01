import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(`mongodb://localhost:27017/trendyKicks`)
        const connection = mongoose.connection
        connection.on('connected' , ()=>{
            console.log('MongoDb Connected');
            
        })
        connection.on('error' , (err)=>{
            console.log('Db Connection Failed' + err);
            process.exit()
            
        })
    } catch (error:any) {
        console.log(`Db connect failed` , error.message);
        
    }
}