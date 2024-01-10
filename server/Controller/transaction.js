const sequelise = require('../util/database')
const Transaction = require('../Models/transaction');



exports.addTransaction = async (req,res,next)=>{
    const user = req.user;
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
    const page = Number(req.query.page)
    const limit = Number(req.query.limit);
    try{
      let count = await user.countTransactions()
      let data = await user.getTransactions({
        offset : (page-1) * limit,
        limit : limit
      })
       let totalPages = Math.ceil(Number(count)/Number(limit))
       return res.status(200).json({success:true,data:data,pages:totalPages,hasNext:page<totalPages,
                                    hasPrevious:page>1,message:"Fetched all the transactions successfully"})
    }
    catch(error){
        console.log(error)
     return res.status(500).json({Success:false,message:"Failed to fetch the data please try after sometime"})
    }
}

exports.getAllTransactions = async (req,res,next)=>{
    const user = req.user
    try{
        let data = await user.getTransactions()
         return res.status(200).json({success:true,data:data,message:"Fetched all the transactions successfully"})
    }
    catch(error){
        return res.status(500).json({Success:false,message:"Failed to fetch the data please try after sometime"})
    }
}

exports.updateTransaction = async(req,res,next)=>{
    const user = req.user
    const {transaction} = req.body
    const updatedAmount =Number(transaction.amount)
    let t;
    try{
        t = await sequelise.transaction()
        const response = await Transaction.findOne({where:{userId:user.id,id:transaction.id}})
        if(!response){
            return res.status(404).json({success:false,message:'Sorry could not find the transaction'})
        }
        if(transaction.transactionType === 'expense'){
            const balance = Number(user.balance)+Number(updatedAmount)-Number(response.amount);
            const totalExpense = Number(user.totalExpense)+Number(updatedAmount)-Number(response.amount)
            await response.update(transaction,{transaction:t})
            await user.update({totalExpense:totalExpense,balance:balance}, { transaction: t })
            await t.commit();
            return res.status(201).json({success:true,message:'Deleted the transaction successfully'})
        }
        else{
            const balance = Number(user.balance)+Number(updatedAmount)-Number(response.amount);
            const totalIncome = Number(user.totalIncome)+Number(updatedAmount)-Number(response.amount)
            await response.update(transaction,{transaction:t})
            await user.update({totalIncome:totalIncome,balance:balance}, { transaction: t })
            await t.commit();
            return res.status(201).json({success:true,message:'Deleted the transaction successfully'})
        }

    }
    catch(error){
          await t.rollback()
          return res.status(500).json({success:false,message:'Could not update the Transaction,please try after sometime'})
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

exports.getFinancialStatus = async (req,res,next)=>{
    try{
         const {totalExpense,totalIncome,balance} = req.user

         return res.status(200).json({success:true,message:'Fetched data successfully',expense:totalExpense,income:totalIncome,balance:balance})
    }
    catch(error){
        return res.status(500).json({success:false,message:'please try after siometime'})
    }
}