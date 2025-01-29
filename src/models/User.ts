import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        otherData: { type: String, required: true },
    },
    { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
