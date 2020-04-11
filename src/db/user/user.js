const Sequelize = require('Sequelize')
const sequelize = require('../dbConnect').sq

const Model = Sequelize.Model;
class User extends Model{}
User.init({
    // attributes
    id: {
      type: Sequelize.STRING, 
      primaryKey:true, 
      allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    recipeId:{
        type:Sequelize.STRING
    }
  }, {
    sequelize,
    modelName: 'users',
    timestamps:false
    // options
  });

  module.exports.User = User