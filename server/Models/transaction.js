const Sequelize = require ('sequelize');

const sequelize = require('../util/database');

const transaction = sequelize.define('transaction',{
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull:false,
    primaryKey:true
  },
  description:{
    type:Sequelize.STRING,
    allowNull: false
  },
  amount:{
    type:Sequelize.INTEGER,
    allowNull: false
  },
  transactionType:{
    type :Sequelize.STRING,
    allowNull:false
  },
  category :{
    type :Sequelize.STRING,
    allowNull:false
  },
  date :{
    type : Sequelize.DATEONLY,
    allowNull : false
  }
 
})

module.exports = transaction;