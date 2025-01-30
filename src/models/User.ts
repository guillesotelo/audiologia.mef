import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        otherData: { type: String },
    },
    { timestamps: true, strict: false }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
