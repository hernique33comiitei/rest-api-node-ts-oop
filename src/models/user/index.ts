import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
