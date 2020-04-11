const Express = require('express');
const bodyParser = require('body-parser');
const push = require('./src/db/pushNotification/pushNotification');
const dbConnect = require('./src/db/dbConnect');
const AwsS3 = require('./src/db/awsConnect')

const user = require('./src/db/user/user')
const recipe = require('./src/db/recipe/recipe')
const recipeCategory = require('./src/db/recipe_category/recipeCategory')
const ingredientCategory = require('./src/db/ingredient_category/ingredient_category')
const ingredientCategoryDetail = require('./src/db/ingredient_category/ingredient_category_detail')
const {v1,v2,v3,v4} = require('uuid');

require('dotenv').config();

const app = Express();   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.get('/ingredient_category',(req,res)=>{ 
    ingredientCategory.Ingredient_category.sync().then(e=>{
        ingredientCategory.Ingredient_category.findAll().then(f=>{ 
            res.send(f)
        })
    })
})

// app.get('/user',(req,res)=>{
//     user.User.sync().then(e=>{
//         user.User.findAll().then(f=>{
//             res.send(f)
//         })
//     })
// })
app.post('/getRecipes',(req,res)=>{
   
    recipe.User_recipes.sync().then(e=>{
        recipe.User_recipes.findAll({where:{userid:req.body.userid}}).then(f=>{
            res.send(f);
        })
    }) 
})

app.post('/getAllRecipes',(req,res)=>{
    recipe.User_recipes.sync().then(e=>{
        recipe.User_recipes.findAll({limit:5*req.body.page||5}).then(f=>{
            res.send(f);
        })
    }) 
})

app.get('/user', (req, res) => {
    user.User.sync().then(e => {
        // user.User.update(req.query,{where:{id:req.query.id}}).then(f=>{
        //     res.send(f);
        // })
        user.User.create(req.query).then(e=>res.send(e))
    })
})



app.post('/recipe',AwsS3.upload.array('images'),(req,res)=>{

    let urls = req.files.map(e=>e.location) 
    let {name,type,ingredients,descriptions,calorie,price,time} = req.body;
    let aRecipe = {id:v4(),userid:'12345',name,type:JSON.parse(type),image_urls:urls,descriptions:JSON.parse(descriptions),time,calorie,price,ingredients:JSON.parse(ingredients)}
    console.log(JSON.parse(type))
    recipe.User_recipes.sync().then(e =>{
        recipe.User_recipes.create(aRecipe).then(e=>res.send(e))
    }) 
})

app.get('/ingredient_category_detail',(req,res)=>{ 
    ingredientCategoryDetail.Ingredient_category_detail.sync().then(e=>{
        ingredientCategoryDetail.Ingredient_category_detail.findAll().then(f=>{ 
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