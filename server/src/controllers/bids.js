import { StatusCodes } from "http-status-codes";
import Bid from "../models/BidModel";
import ApiError from "../utils/ApiError";
import Product from "../models/product";

class BidsController {
  async getAllBids(req, res, next) {
    try {
      const bids = await Bid.find().populate("user product"); // Sử dụng populate nếu cần lấy thông tin chi tiết của user và product
      res.status(StatusCodes.OK).json({
        message: "Bids fetched successfully",
        data: bids,
      });
    } catch (error) {
      next(error);
    }
  }

  // Hàm để lấy bid theo ID
  async getBidById(req, res, next) {
    try {
      const bid = await Bid.findById(req.params.id).populate("user product");
      if (!bid) {
        throw new ApiError(404, "Bid Not Found");
      }
      res.status(StatusCodes.OK).json({
        message: "Bid fetched successfully",
        data: bid,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /bids
  async createBid(req, res, next) {
    try {
      const newBid = await Bid.create(req.body);

      // Lấy sản phẩm hiện tại để cập nhật các thông tin liên quan đến bid
      const product = await Product.findById(req.body.product);
      if (!product) {
        throw new ApiError(404, "Product Not Found");
      }

      // Đảm bảo rằng `bids` là một mảng trước khi thêm bid mới
      const updatedBids = Array.isArray(product.bids)
        ? [...product.bids, newBid._id]
        : [newBid._id];
      const updatedBidPriceMax =
        req.body.price > product.bidPriceMax
          ? req.body.price
          : product.bidPriceMax;

      await Product.findByIdAndUpdate(req.body.product, {
        bids: updatedBids,
        bidPriceMax: updatedBidPriceMax,
      });

      res.status(StatusCodes.CREATED).json({
        message: "Create Bid Successful",
        data: newBid,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBid(req, res, next) {
    try {
      // Kiểm tra dữ liệu đầu vào
      console.log("Request Params:", req.params);
      console.log("Request Body:", req.body);

      // Tìm và cập nhật bid
      const updatedBid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      // Kiểm tra xem bid có tồn tại không
      if (!updatedBid) throw new ApiError(404, "Bid Not Found");

      // Phản hồi thành công
      res.status(StatusCodes.OK).json({
        message: "Update Bid Successful",
        data: updatedBid,
      });
    } catch (error) {
      // Xử lý lỗi và chuyển tiếp lỗi
      next(error);
    }
  }
}

export default BidsController;
