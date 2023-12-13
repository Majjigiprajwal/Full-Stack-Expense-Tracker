const jwt = require('jsonwebtoken');
const User = require('../Models/user')

const isAuth = async (req,res,next)=>{


   const token = req.headers.authorization.split(' ')[1];

   const verify = jwt.verify(token,'fullstack-project');

   const user = await User.findOne({where :{id: verify.userId}})

   req.user = user;

    next();
}

module.exports =  isAuth

// RAZORPAY_ID = rzp_test_JlKni6zYUpGLUT
// RAZORPAY_SECRET = Xg4sSXryQMH4V2KMFoA9nlpS