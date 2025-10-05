import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };   
}


const connectDB = async () => {
    if (cached.conn) {
        console.log("✅Using existing connection", cached.conn.host);
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };
        
        console.log("🔄 Attempting MongoDB connection...");
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
            console.log("✅ New connection:", mongooseInstance.connection.host);
            return mongooseInstance.connection;
        }).catch((error) => {
            console.error("❌ MongoDB connection failed:", error.message);
            cached.promise = null;
            throw error;
        });
    }
    try {
        cached.conn = await cached.promise;
        console.log("✅ Database connected:", cached.conn.host);
    } catch (e: any) {
        cached.promise = null;
        console.error("❌ Database connection error:", e.message);
        throw new Error(`Database connection failed: ${e.message}`);
    }
    return cached.conn;
};

export default connectDB;
