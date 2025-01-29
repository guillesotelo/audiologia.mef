import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        studyId: { type: String, required: true },
        otherData: { type: String, required: true },
    },
    { timestamps: true }
)

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)
export default Booking
