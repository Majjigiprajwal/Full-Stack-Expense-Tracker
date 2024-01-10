const Razorpay = require('razorpay')
const Order = require('../Models/orders');
const User = require('../Models/user')
const { json } = require('body-parser');
const sequelise = require('../util/database');
const jwt = require('jsonwebtoken');

exports.createOrder= async (req,res)=>{

     try{
     const  razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_SECRET,
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
      return res.status(401).json({success:false,message:'Authorization Failed'})
    }

}

exports.updateTransaction = async (req,res,next)=>{
    const {order_id,payment_id} = req.body;
    const user = req.user
    let t;
  try{
    t = await sequelise.transaction()
     await  Order.update({ paymentId: payment_id, status: "Successful" },{ where: { orderid: order_id }},{transaction : t})
     req.user.isPremium = true;
     await req.user.save({transaction:t})
     await t.commit()
     const token = jwt.sign({userId : user.id,premium : user.isPremium},'fullstack-project',{ expiresIn: '1d' })
     return res.status(200).json({messsage:'your are a premium user now',token:token})
  }
  catch(err){
      await t.rollback();
      return res.status(401).json({message:"please try after sometime"})
  }
}

