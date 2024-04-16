import dotenv from "dotenv";
dotenv.config();

export const PORT: string | number = process.env.PORT || 8080;
export const MONGO_URL: string | undefined = process.env.MONGO_URL;
export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
