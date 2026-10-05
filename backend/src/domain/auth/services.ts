import { LoginInput } from "../../dtos/auth/login_dtos";
import { LoginDAO } from "./dao";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const LoginServices = async (userData: LoginInput) => {
    try {
        const user = await LoginDAO(userData);

        if(!user) {
            return ({ status: "error", message: "Username atau password salah." });
        }

        const isMatch = await Bcrypt.compare(userData.password, user.password);
        if(!isMatch) {
            return ({ status: "error", message: "Username atau password salah." });
        }

        const secret = process.env.JWT_SECRET;
        if(!secret) {
            return ({ status: "error", message: "Terjadi Kesahalan pada token!" });
        }

        const token = jwt.sign(
            { userId: user.id },
            secret,
            { expiresIn: "2h" }
        )

        return ({
            status: "success",
            message: "Login berhasil!",
            token: token,
            username: user.username,
            location: user.location,
            role: user.role
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}