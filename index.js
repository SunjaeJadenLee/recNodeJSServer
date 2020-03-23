const Express = require('express');
const bodyParser = require('body-parser');
const push = require('./src/db/pushNotification/pushNotification');
const dbConnect = require('./src/db/dbConnect');
const recipeCategory = require('./src/db/recipe_category/recipeCategory')
const ingredientCategory = require('./src/db/ingredient_category/ingredient_category')


require('dotenv').config();

const app = Express();   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{ 
    ingredientCategory.Ingredient_category.sync().then(e=>{
        ingredientCategory.Ingredient_category.findAll().then(f=>{ 
            res.send(f)
        })
    })
})

app.use('/push',push);

app.listen(process.env.PORT,(res,err)=>{
    if(!err){
        console.log(process.env.PORT + 'connected!')
    }
})