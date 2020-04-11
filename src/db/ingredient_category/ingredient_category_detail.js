const Sequelize = require('Sequelize')
const sequelize = require('../dbConnect').sq

const Model = Sequelize.Model;
class Ing_category_detail extends Model{}
Ing_category_detail.init({
    // attributes
    id: {
      type: Sequelize.STRING, 
      primaryKey:true, 
      allowNull: false
    },
    category_id:{
        type: Sequelize.STRING,
        allowNull:false
    },
    name: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  }, {
    sequelize,
    modelName: 'ingredient_category_detail',
    timestamps:false
    // options
  });

  module.exports.Ingredient_category_detail = Ing_category_detail