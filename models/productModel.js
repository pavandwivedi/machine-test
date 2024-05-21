import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        Required:true,
    },
    price:{
        type:Number,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
    }

},{
    timestamps:true
})

export const productModel = mongoose.model('products',productSchema);