import mongoose from "mongoose";
const { Schema } = mongoose;

const BidSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Đảm bảo trường user là bắt buộc
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true, // Đảm bảo trường product là bắt buộc
    },
    price: {
      type: Number,
      required: true,
    },
    isWinBid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;
