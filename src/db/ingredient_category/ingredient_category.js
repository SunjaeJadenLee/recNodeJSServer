const Sequelize = require('Sequelize')
const sequelize = require('../dbConnect').sq

const Model = Sequelize.Model;
class Ing_category extends Model{}
Ing_category.init({
    // attributes
    id: {
      type: Sequelize.STRING, 
      primaryKey:true, 
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    initial_category:{
        type: Sequelize.STRING
    }
  }, {
    sequelize,
    modelName: 'ingredient_category',
    timestamps:false
    // options
  });

  module.exports.Ingredient_category = Ing_category