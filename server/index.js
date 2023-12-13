const express = require('express');
const sequelize = require('./util/database')


const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use(cookieParser())

const User = require('./Models/user');
const Transaction = require('./Models/transaction')
const Order = require('./Models/orders')


const userRoutes = require('./Routes/user');
const transactionRoutes = require('./Routes/transaction');
const premiumRoutes = require('./Routes/purchasePremium');
const leaderboardRoutes = require('./Routes/leaderboard');

app.use(userRoutes)
app.use(transactionRoutes)
app.use(premiumRoutes)
app.use(leaderboardRoutes)

User.hasMany(Transaction,{foreignKey : 'userId'});
Transaction.belongsTo(User,{foreignKey : 'userId'});

Order.belongsTo(User,{foreignKey : 'userId'});
User.hasMany(Order,{foreignKey : 'userId'})

 
sequelize.sync()
  .then((result)=>{
    app.listen(4000,()=>{
        console.log('running')
    })
  })
  .catch((err)=>{
    console.log(err)
  })

  


