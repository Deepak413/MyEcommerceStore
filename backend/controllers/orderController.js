const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success:true,
        order,
    });
});

//Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");   //this line also fetched the user's name,email associated with this order

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
});

//Get Logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });    //logged in user id

    res.status(200).json({
        success: true,
        orders,
    })
});

//Get All Orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    })
});

//Update Order Status --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander("You have already delivered this order", 400));
    }

    order.orderItems.forEach(async(ord) => {
        await updateStock(ord.product, ord.quantity)
    })
    
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now(); 
    }
    
    order.orderStatus = req.body.status;

    await order.save({ validateBeforeSave:false });

    res.status(200).json({
        success: true,
        order,
    })
});

async function updateStock (id, quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave:false })
}


// Delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    })
});