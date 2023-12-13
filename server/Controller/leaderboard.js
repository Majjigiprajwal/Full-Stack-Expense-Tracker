const User = require('../Models/user')

exports.getLeaderboard = async (req,res,next)=>{
    
    try{
      const leaderboardData = await User.findAll()
      console.log(leaderboardData)
      return res.status(200).json({success:true,data:leaderboardData,message:'Data ftched successfully'})
    }
    catch(error){
      return res.status(500).json({success:false,message:'Could not fetch leaderboard try after sometime'})
    }
}