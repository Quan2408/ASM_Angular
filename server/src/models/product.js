import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 4,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Đảm bảo giá không âm
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true, // Đảm bảo category là bắt buộc
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    startAt: {
      type: Date,
      default: Date.now, // Giá trị mặc định là thời điểm hiện tại
    },
    endAt: {
      type: Date,
    },
    bidTime: {
      type: Number,
      default: 0, // Giá trị mặc định là 0
    },
    bidPriceMax: {
      type: Number,
      default: 0,
    },
    bids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bid",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

export default mongoose.model("Product", productSchema);
