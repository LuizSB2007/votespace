import "dotenv/config";
import jwt from "jsonwebtoken"

export function generateToken(email: string, userId: string): string {
    const token = jwt.sign({ email, userId }, process.env.AUTH_KEY!, { expiresIn: "1d" })
    return token
}

export function verifyTokenValid(token: string) {
    return jwt.verify(token, process.env.AUTH_KEY!)
}