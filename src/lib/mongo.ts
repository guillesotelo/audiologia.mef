import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI as string
if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable in .env.local")
}

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            dbName: "audiologia-mef",
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

(global as any).mongoose = cached
