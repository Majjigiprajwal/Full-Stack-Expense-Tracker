const {Op,fn,col} = require('sequelize')
const Transaction = require('../Models/transaction')
const moment = require('moment')
const AWS = require('aws-sdk')

const uploadToS3 = (data,file)=>{
      const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
      const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
      const ACCESS_KEY = process.env.AWS_ACCESS_KEY;


        const s3 = new AWS.S3({
            accessKeyId:ACCESS_KEY,
            secretAccessKey:SECRET_ACCESS_KEY,
        })

            var params = {
                Bucket:BUCKET_NAME,
                Key:file,
                Body : data,
                ACL:'public-read'
            }
            return new Promise((resolve,reject)=>{
                s3.upload(params,(err, s3response)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(s3response.Location);
                    }
                })
            })
}

exports.getReportByDay = async (req,res,next)=>{
      const user = req.user
      const currentDate = moment().format('YYYY-MM-DD');

    try{
          const data = await user.getTransactions({where:{date:currentDate}})
          return res.status(200).json({success:true,data:data,message:'Daily report fetched successfully'})
    }
    catch(error){
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.getReportByWeek = async (req,res,next)=>{
        const user = req.user
        const currentDate = moment();
        const weekStart = currentDate.clone().startOf('week').format('YYYY-MM-DD');
        const weekEnd = currentDate.clone().endOf('week').format('YYYY-MM-DD');
    try{
          const data = await user.getTransactions({where: {date: {[Op.between]: [weekStart, weekEnd],},}}) 
          return res.status(200).json({success:true,data:data,message:'Weekly report fetched successfully'})  
    }
    catch(error){
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.getReportByMonth = async (req,res,next)=>{
      const user = req.user;
      const currentDate = moment();
      const month = currentDate.month()+1;
    try{
         const data = await user.getTransactions({where : fn('MONTH', col('date')) === month,})  
         return res.status(200).json({success:true,data:data,message:'Monthly report fetched successfully'})  
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.downloadReport = async (req,res,next)=>{
       const user = req.user
    try{
        const transactions = await user.getTransactions();
        const stringifyedData = JSON.stringify(transactions)

        const userId = user.id;

        const fileName = `Transactions${userId}/${new Date()}.txt`
        const URL = await  uploadToS3(stringifyedData,fileName)
        await user.createDownload({link:URL})
        return res.status(200).json({success:true,URL,message:"Report downloaded successfully"})
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.downloadHistory = async (req,res,next)=>{
      const user = req.user;
    try{
        const data = await user.getDownloads()
        return res.status(200).json({success:true,data,message:"Fetched the download history successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch download history,please try after sometime"})
    }
}