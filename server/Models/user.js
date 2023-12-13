const Sequelize = require ('sequelize');

const sequelize = require('../util/database');

const user = sequelize.define('user',{
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull:false,
    primaryKey:true
  },
  name:{
    type:Sequelize.STRING,
    allowNull: false
  },
  email:{
    type:Sequelize.STRING,
    allowNull: false
  },
  password :{
    type :Sequelize.STRING,
    allowNull:false
  },
  isPremium :{
    type :Sequelize.BOOLEAN,
    allowNull :false,
  },
  totalExpense :{
    type :Sequelize.INTEGER,
    allowNull:true,
    defaultValue:0
  },
  totalIncome :{
    type :Sequelize.INTEGER,
    allowNull:true,
    defaultValue:0
  },
  balance :{
    type :Sequelize.INTEGER,
    allowNull:true,
    defaultValue:0
  }
 
})

module.exports = user;