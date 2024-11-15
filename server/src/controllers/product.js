import Product from "../models/product";
import { productValidate } from "../schemas/product";
import User from "../models/auth";

export const getAllProduct = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
export const getProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id).populate({
      path: "bids",
      populate: {
        path: "user",
        model: User,
        select: "email username",
      },
    });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (req, res) => {
  try {
    // Xác thực dữ liệu đầu vào
    const { error } = productValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((message) => message.message);
      return res.status(400).json({ message: errorMessage }); // Trả về mã trạng thái 400 cho lỗi xác thực
    }

    // Tạo sản phẩm mới và lưu vào cơ sở dữ liệu
    const product = new Product(req.body);
    const data = await product.save();

    // Trả về sản phẩm vừa được tạo
    return res.status(201).json(data); // Trả về mã trạng thái 201 cho việc tạo thành công
  } catch (err) {
    console.error(err); // Ghi lại lỗi
    return res.status(500).json({ message: "Có lỗi xảy ra khi tạo sản phẩm." }); // Trả về mã trạng thái 500 cho lỗi server
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { error } = productValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((message) => message.message);
      return res.status(400).json({ message: errorMessage }); // Trả về mã trạng thái 400 cho lỗi xác thực
    }

    // Cập nhật sản phẩm
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({ message: "Sản phẩm không tìm thấy." }); // Trả về mã trạng thái 404 nếu không tìm thấy sản phẩm
    }

    res.json(data); // Trả về dữ liệu sản phẩm đã cập nhật
  } catch (err) {
    console.error(err); // Ghi lại lỗi trên server
    res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật sản phẩm." }); // Trả về mã trạng thái 500 cho lỗi server
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
