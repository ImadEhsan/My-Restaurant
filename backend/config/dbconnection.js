import mongoose from "mongoose";

export const dbconnection = async() => {
    try {
        const res = await mongoose.connect(process.env.DBconnection )
        console.log(`MongoDB connected successfully`, res.connection.host);
        
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
        
    }
}