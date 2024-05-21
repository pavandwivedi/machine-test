import { userModel } from "../models/userModel.js";
import {error,success} from "../utills/responseWrapper.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../services/generateAccessToken.js";
import { productModel } from "../models/productModel.js";

export async function registerController(req,res){
    try {
       const {name,email,password} = req.body;

       if(!name || !email || !password){
        return res.send(error(404,"all fields are required"));
       }
      const existingUser = await userModel.findOne({email:email});
      if(existingUser){
        return res.send(error(409,"you have registered,please login"));
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = new userModel({name,email,password:hashedPassword});
       await newUser.save();
       return res.send(success(200,"user Registered successfully")); 
    } catch (err) {
        return res.send(error(500,err.message));
    }
}

export async function loginController(req,res){
    try {
        const {email,password} = req.body;
        if( !email || !password){
            return res.send(error(404,"all fields are required"));
           }
        const user = await userModel.findOne({email});
      
        if(!user){
            return res.send(error(409,"user not exist please login"));
        }
        const match = await  bcrypt.compare(password,user.password);
        
        if(!match){
            return res.send(error(404,"password not matched, please enter right password"))
        }
        const token = generateAccessToken({...user});
        
        return res.send(success(200,token,"user login successfully"));

    } catch (err) {
        return res.send(error(500,err.message));
    }
}

export async function createProductController(req,res){
    try {
        const user = req._id;
        const existingUser = await userModel.findById({_id:user});
        if(!existingUser){
            return res.send(error(404,"user does not exist"));
        }
        const {name,quantity,price} = req.body;
        const image=req.files['image'][0];
        if(!name || !quantity || !price || !image){
            return res.send(error(404,'all fields are required'));
        }
        const imagePath = image.path;
        console.log(imagePath);
        const productDetails = new productModel({
            name,
            quantity,
            image:imagePath,
            price,
            user
        });
        
        await productDetails.save();
       return res.send(success(200,"product created successfully"));
    } catch (err) {
       return res.send(error(500,err.message)); 
    }
}
export async function getproductController(req,res){
    try {
        const user = req._id;
        console.log(user)
        const existingUser = await userModel.findById({_id:user});
        if(!existingUser){
            return res.send(error(404,"user does not exist"));
        }
        const productList = await productModel.find({user});
        
        return res.send(success(200,productList))

    } catch (err) {
        return res.send(error(500,err.message));
    }
}

export async function updateProductController(req, res) {
    try {
        const user = req._id;

        const { name, quantity, price } = req.body;
        const image = req.files['image'][0];

        if (!image) {
            return res.status(400).send(error(400, "Image is required."));
        }

        const imagePath = image.path;

        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send(error(404, "User does not exist."));
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            { name, quantity, price, image: imagePath },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send(error(404, "Product not found."));
        }

        return res.status(200).send(success(200, "Product updated successfully."));
    } catch (err) {
        return res.status(500).send(error(500, err.message));
    }
}

export async function deleteProductController(req,res){
    try {
        
        const user = req._id;
       
        const existingUser = await userModel.findById({_id:user});
        if(!existingUser){
            return res.send(error(404,"user does not exist"));
        }
        await productModel.findByIdAndDelete(req.params.id);
        return res.send(success(200,"product deleted successfully"));
    } catch (err) {
        return res.send(success(error(500,err.message)));
    }
}

