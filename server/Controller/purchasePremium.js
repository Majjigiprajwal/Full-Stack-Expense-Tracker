const Razorpay = require('razorpay')
const Order = require('../Models/orders');
const User = require('../Models/user')
const { json } = require('body-parser');

exports.createOrder= async (req,res)=>{

     try{
     const  razorpay = new Razorpay({
     key_id: 'rzp_test_5p10xkSsr4HLhX',
     key_secret: '1XlmGLiJb9YYGn68RPP6TJYn',
     });

     const options = {
        amount: 500000,
        currency: "INR",
      };
      const orderDetails = await razorpay.orders.create(options)
      await req.user.createOrder({orderId:orderDetails.id,status:'pending'})
      return res.status(201).json({order:orderDetails,key_id:razorpay.key_id})
    }

    catch(error){
      console.log(error)
    }

}

exports.updateTransaction = async (req,res,next)=>{
    const {order_id,payment_id} = req.body;
  try{
     req.user.isPremium = true;
     await req.user.save()
     await  Order.update({ paymentId: payment_id, status: "Successful" },{ where: { orderid: order_id }})
     return res.status(200).json({messsage:'your are a premium user now'})
  }
  catch(err){
      return res.status(401).json({message:"please try after sometime"})
  }
}

