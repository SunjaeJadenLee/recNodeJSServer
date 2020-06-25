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
    email:{
      type:Sequelize.STRING
    }, 
    nickname:{
        type:Sequelize.STRING
    }, 
    profileUrl:{
      type:Sequelize.STRING
    }, 
    platform:{
      type:Sequelize.STRING
    },
    recipeId:{
      type:Sequelize.STRING
  },
  }, {
    sequelize,
    modelName: 'users',
    timestamps:false
    // options
  });

  module.exports.User = User