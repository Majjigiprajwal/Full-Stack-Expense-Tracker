const api_key = API_KEY;
const Sib =  require('sib-api-v3-sdk')
const { v4: uuidv4 } = require('uuid');
const PasswordRequest = require('../Models/forgotPassword')
const User = require('../Models/user')
const sequelise = require('../util/database')
const bcrypt = require('bcrypt');
const passwordRequest = require('../Models/forgotPassword');
const saltRounds = 8;

const Client = Sib.ApiClient.instance;

const apiKey = Client.authentications['api-key'];
apiKey.apiKey = api_key

exports.sendEmail = async (req,res,next)=>{
       const email = req.body.email
       const id = uuidv4()
       let t;
    try{
        t = await sequelise.transaction()
        const user = await User.findOne({where :{email : email }})
        if(!user){
          return res.status(404).json({success: false,message:'No user found please signup'})
        }
        await user.createPasswordRequest({id : id,isActive:true},{transaction : t})
        const transEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
          email:'9945163195ab@gmail.com',
          name : 'Prajwal G Majjigi'
        } 
        const reciever = [{
            email : email
          }]

        const response = await  transEmailApi.sendTransacEmail({
             sender,
             to:reciever,
             subject:'Reset Password',
             htmlContent :`<html>
             <h2>RESET PASSWORD</h2>
             <p>Click on the below button to reset your password</p>
             <a href="http://localhost:3000/reset-password/${id}">Click Here</a>
             </html>`,
        },{transaction: t})

        await t.commit()
        return res.status(200).json({success:true,message:'Email sent successfully'})

    }
    catch(error){
       await t.rollback()
       return res.status(500).json({success:false,message:'Could not send mail try after sometime'})

    }
}

exports.resetPassword = async (req,res,next)=>{
  console.log(req.body)
       const id = req.body.id
       const password = req.body.password
       let t;
    try{
        t = await sequelise.transaction()
        const request = await PasswordRequest.findOne({where : {id : id}})
        if(!request){
          return res.status(404).json({success: false, message:'Not a valid link'})
        }
        else if(request.isActive === false){
          return res.status(400).json({success: false, message : 'Link Expired , please try with other link'})
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        
        await User.update({password: hashedPassword},{ where: { id: request.userId}},{transaction : t})
        await passwordRequest.update({isActive: false},{ where: { id: request.id}},{transaction : t})
        await t.commit()

        return res.status(201).json({success : true, message:'Pasword changed successfully'})

    }
    catch(error){
      await t.rollback();
      return res.status(400).json({success : false, message : 'Please try again with valid link'})
    }
}