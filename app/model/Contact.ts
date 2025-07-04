import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
)

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema)

