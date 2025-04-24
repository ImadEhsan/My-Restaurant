import User from "../model/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            cart: { items: [] } 
        });

        res.status(201).json({
            status: "success",
            data: user,
            message: "User created successfully",
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            status: "success",
            data: users,
            message: "All users fetched successfully",
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate("cart.items.productId");
        if (!user) {
            return res.status(400).json({ status: "error", message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "None", maxAge: 3600000 });

        res.json({
            status: "success",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cart: user.cart, 
            },
            token,
            message: "User logged in successfully",
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "None" });

        return res.status(200).json({
            status: "success",
            message: "User logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Logout failed" });
    }
};
