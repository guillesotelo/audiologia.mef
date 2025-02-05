import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        age: { type: String },
        date: { type: String, required: true },
        calendarLink: { type: String },
        qr: { type: String },
        studyId: { type: String, required: true },
        studyName: { type: String, required: true },
        notes: { type: String },
        otherData: { type: String },
    },
    { timestamps: true, strict: false }
)

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)
export default Booking
