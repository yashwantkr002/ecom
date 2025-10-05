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
        console.log("Using existing connection", cached.conn.host);
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
            console.log("New connection:", mongooseInstance.connection.host);
            return mongooseInstance.connection;
        });
    }
    try {
        cached.conn = await cached.promise;
        console.log("Database connected:", cached.conn.host);
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
};

export default connectDB;
