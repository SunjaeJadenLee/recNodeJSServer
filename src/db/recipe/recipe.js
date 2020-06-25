const Sequelize = require('Sequelize')
const sequelize = require('../dbConnect').sq

const Model = Sequelize.Model;
class User_recipes extends Model { }
User_recipes.init({
    // attributes
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    image_urls: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    descriptions:{
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    time: {
        type: Sequelize.NUMBER
    },
    calorie: {
        type: Sequelize.NUMBER
    },
    type: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    ingredients: {
        type: Sequelize.JSON
    },
    price: {
        type: Sequelize.NUMBER
    },
    recipe_state: {
        type: Sequelize.JSON
    },
    user:{
        type:Sequelize.JSON
    }, 
    createdAt:{
        type:Sequelize.DATE
    },
    updatedAt:{
        type:Sequelize.DATE
    },
    timeStamp:{
        type:Sequelize.NUMBER
    }
}, {
        sequelize,
        modelName: 'user_recipes',
        timestamps: true
        // options
    });

module.exports.User_recipes = User_recipes