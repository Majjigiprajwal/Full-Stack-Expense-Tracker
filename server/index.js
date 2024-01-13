const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const sequelize = require('./util/database')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT || 4000

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags :'a'})

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(morgan('combined',{stream:accessLogStream}));



const User = require('./Models/user');
const Transaction = require('./Models/transaction')
const Order = require('./Models/orders')
const PasswordRequests = require('./Models/forgotPassword')
const Downloads = require('./Models/downloads')



const userRoutes = require('./Routes/user');
const transactionRoutes = require('./Routes/transaction');
const premiumRoutes = require('./Routes/purchasePremium');
const leaderboardRoutes = require('./Routes/leaderboard');
const forgotPasswordRoutes = require('./Routes/forgotPasssword')
const reportRoutes = require('./Routes/reports')

app.use(userRoutes)
app.use(transactionRoutes)
app.use(premiumRoutes)
app.use(leaderboardRoutes)
app.use(forgotPasswordRoutes)
app.use(reportRoutes)

User.hasMany(Transaction,{foreignKey : 'userId'});
Transaction.belongsTo(User,{foreignKey : 'userId'});

User.hasMany(Order,{foreignKey : 'userId'});
Order.belongsTo(User,{foreignKey : 'userId'});

User.hasMany(PasswordRequests,{foreignKey : 'userId'});
PasswordRequests.belongsTo(User,{foreignKey : 'userId'});

User.hasMany(Downloads,{foreignKey : 'userId'});
Downloads.belongsTo(User,{foreignKey : 'userId'});

 
sequelize.sync()
  .then((result)=>{
    app.listen(PORT,()=>{
        console.log('running')
    })
  })
  .catch((err)=>{
    console.log(err)
  })

  


