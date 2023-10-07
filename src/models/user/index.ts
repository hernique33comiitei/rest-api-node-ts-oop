import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  nickname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model("User", userSchema);
