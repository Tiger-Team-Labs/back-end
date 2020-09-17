import { config } from "dotenv";
config();

export default {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://platzi-admin:Pq5HLvhdvBpXJX1d@curso-platzi.o7zlc.mongodb.net/foroDb?retryWrites=true&w=majority",
    SECRET: 'c033497fa2fd1a54205e2a63fe6eb97c1a770603bc7febaefb77e4100a27cef1'
}