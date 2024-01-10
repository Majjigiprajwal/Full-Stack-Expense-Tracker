const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 8;
const secret = process.env.JWT_SECRET

exports.getUser = async(req,res,next)=>{
    const userData = req.body;
    try{
       let user = await User.findOne({where :{email : userData.email}})
       if(!user){
        return res.status(404).json({ error: 'User not found' });
       }
       
       const passwordsMatch = await bcrypt.compare(userData.password,user.password);
       
       if(!passwordsMatch){
        return res.status(401).json({ error: 'Password incorrect' })
       }
        
       const token = jwt.sign({userId : user.id,premium:user.isPremium},secret,{ expiresIn: '1d' })
 
       return res.status(200).json({ message: 'Login successful',token : token});
    }
    catch(error){
        return res.status(500).json({ error: 'Internal Server Error' });  
    }
}

exports.registerUser = async (req,res,next)=>{
    const data = req.body
    const hashPassword = await bcrypt.hash(data.password, saltRounds)
    data.password = hashPassword;
    try{
        let response = await User.create(data)
        res.status(201).send(response);
    }
    catch(error){
        console.log(error);
    }
}



