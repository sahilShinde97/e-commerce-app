import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';

// placing order using cod Method
const placeOrder = async (req,res) => {

    try {
        
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success: true, message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
        
    }

}

// placing order using Stripe Method
const placeOrderStripe = async (req,res) => {

}

// placing order using Razorpay Method
const placeOrderRazorpay = async (req,res) => {

}

// All orders data for admin panel
const allOrders = async (req,res) => {

}

// User orders data for Frontend
const userOrders = async (req,res) => {
    try {
        
        const {userId} = req.body
        
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

// Update orders status from Admin panel
const updateStatus = async (req,res) => {

}

export { updateStatus,userOrders,allOrders,placeOrderRazorpay,placeOrderStripe,placeOrder}