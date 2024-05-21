import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.ACCESS_SECRET_KEY || "abcdxyz";

export function generateAccessToken(data){
    try {
        const token = Jwt.sign(data, secretKey,{expiresIn:"1h"});
        return token;
    } catch (error) {
        return error;
    }
}