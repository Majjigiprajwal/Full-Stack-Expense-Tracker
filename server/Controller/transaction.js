const sequelise = require('../util/database')
const Transaction = require('../Models/transaction');



exports.addTransaction = async (req,res,next)=>{
    const user = req.user;
    console.log(user.id)
    const {transaction} = req.body
    let t;
    try{
        t = await sequelise.transaction()
        await user.createTransaction(transaction, { transaction: t })
        await t.commit();
        t = await sequelise.transaction();
        let response = await Promise.all([
            Transaction.sum('amount',{where:{userId:user.id,transactionType:'expense'}}, { transaction: t }),
            Transaction.sum('amount',{where:{userId:user.id,transactionType:'income'}}, { transaction: t })
            ])
        let expense = Number(response[0] || 0)
        let income = Number(response[1] || 0)
        let balance = Number(income-expense)
        await user.update({totalExpense:expense,totalIncome:income,balance:balance}, { transaction: t })
        await t.commit()
        console.log('commited')
        return  res.status(201).json({success:true,message:'Transaction added successfully'});
    }
    catch(error){
        console.log(error)
        await t.rollback()
        res.status(500).json({success:false,message:'Failed to  add transaction please try after sometime'})
    }
}

exports.getTransactions = async (req,res,next)=>{
    const user = req.user

    try{
      let data = await user.getTransactions()
       return res.status(200).json({success:true,data:data,message:"Fetched all the transactions successfully"})
    }
    catch(error){
        console.log(error)
     return res.status(500).json({Success:false,message:"Failed to fetch the data please try after sometime"})
    }
}

exports.deleteTransaction = async (req,res,next)=>{
       const id = req.params.id
       const amount = req.query.amount
       const transactionType = req.query.type
       const user = req.user
       let t;
    try{
        t = await sequelise.transaction()
        const response = await Transaction.destroy({where:{id : id}},{transaction :t})
        console.log(response);
        if(transactionType === 'expense'){
            const balance = Number(user.balance)+Number(amount);
            const totalExpense = Number(user.totalExpense)-Number(amount)
            await user.update({totalExpense:totalExpense,balance:balance}, { transaction: t })
            await t.commit();
            return res.status(201).json({success:true,message:'Deleted the transaction successfully'})
        }
        else{
            const balance = Number(user.balance)-Number(amount);
            const totalIncome = Number(user.totalIncome)-Number(amount)
            await user.update({totalIncome:totalIncome,balance:balance}, { transaction: t })
            await t.commit();
            return res.status(201).json({success:true,message:'Deleted the transaction successfully'})
        }
    }
    catch(error){
          await t.rollback()
          return res.status(500).json({success:false,message:'Please try after sometime'})

    }
}