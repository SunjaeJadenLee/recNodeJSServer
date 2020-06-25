const Express = require('express');
const bodyParser = require('body-parser');
const push = require('./src/db/pushNotification/pushNotification');
const dbConnect = require('./src/db/dbConnect'); 
const multer = require('multer');
const firebase = require('firebase/app'); 
const sharp = require('sharp')
const fireStorageConnect = require('./src/db/fireStorageConnect')
const user = require('./src/db/user/user')
const recipe = require('./src/db/recipe/recipe')
const recipeCategory = require('./src/db/recipe_category/recipeCategory')
const ingredientCategory = require('./src/db/ingredient_category/ingredient_category')
const ingredientCategoryDetail = require('./src/db/ingredient_category/ingredient_category_detail')
const {v1,v2,v3,v4} = require('uuid');

require('dotenv').config();
const firebaseConfig = {
    apiKey: "AIzaSyCuKsZsvf4KTDIg-A_EK5SLB9mgWSYO5ww",
    authDomain: "recipesunjaelee.firebaseapp.com",
    databaseURL: "https://recipesunjaelee.firebaseio.com",
    projectId: "recipesunjaelee",
    storageBucket: "recipesunjaelee.appspot.com",
    messagingSenderId: "1012084358432",
    appId: "1:1012084358432:web:027ef459aee227ef162b45",
    measurementId: "G-49BE5WJ3VX"
  };
 
firebase.initializeApp(firebaseConfig);

const app = Express();   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/ingredient_category',(req,res)=>{ 
    ingredientCategory.Ingredient_category.sync().then(e=>{
        ingredientCategory.Ingredient_category.findAll().then(f=>{ 
            res.send(f)
        })
    })
})

app.post('/getRecipes',(req,res)=>{
   
    recipe.User_recipes.sync().then(e=>{
        recipe.User_recipes.findAll({where:{userid:req.body.userid}}).then(f=>{
            res.send(f);
        })
    }) 
})

app.post('/getAllRecipes',(req,res)=>{
    recipe.User_recipes.sync().then(e=>{
        recipe.User_recipes.findAll({limit:5*req.body.page||5,order:[['timeStamp','DESC']]}).then(f=>{
            res.send(f);
        })
    }) 
})

app.post('/getNewFeeds',(req,res)=>{
    recipe.User_recipes.sync().then(e=>{
        recipe.User_recipes.findAll({limit:1,order:[['timeStamp','DESC']]}).then(f=>{
            console.log(f)
            if(req.body.dataId !== f[0]){
                
            }
        })
    })
})

// app.get('/user', (req, res) => {
//     user.User.sync().then(e => {
//         // user.User.update(req.query,{where:{id:req.query.id}}).then(f=>{
//         //     res.send(f);
//         // })
//         user.User.create(req.query).then(e=>res.send(e))
//     })
// })



app.post('/recipe',multer().array('images'),(req,res)=>{  
    let {name,type,ingredients,descriptions,calorie,price,time,userid,user,images} = req.body; 
    let aRecipe = {id:v4(),userid:userid,name,type:JSON.parse(type),image_urls:images,descriptions:JSON.parse(descriptions),time,calorie,price,ingredients:JSON.parse(ingredients),user:JSON.parse(user),timeStamp:new Date().getTime()}
    recipe.User_recipes.sync().then(e =>{
        recipe.User_recipes.create(aRecipe).then(e=>res.json(e)).catch(err=>console.log(err));
    })
})

app.get('/ingredient_category_detail',(req,res)=>{ 
    ingredientCategoryDetail.Ingredient_category_detail.sync().then(e=>{
        ingredientCategoryDetail.Ingredient_category_detail.findAll().then(f=>{ 
            res.send(f)
        })
    })
})

app.post('/addUser',(req,res)=>{
    let {email,name,photo,id,platform} = req.body.user;
    console.log(req.body.user)
    user.User.sync().then(e=>{
        user.User.findAll({where:{id:id}}).then(u=>{ 
            if(u.length == 0){
                console.log('comein')
                let tempUser = {id:id,email:email,nickname:name,profileUrl:photo,platform:platform};
                user.User.create(tempUser).then(e=>res.send(e));
            } else {
                res.send(req.body.user);
            }
        })
    })
    
})

app.post('/editUser',multer({dest:'profile'}).single('image'), (req, res) => {
    let { nickname,email,platform,id,image } = req.body;   
    user.User.sync().then(e => {
        if (image) {  
             console.log(image)
                user.User.update({ nickname: nickname, profileUrl: image }, {
                    where: {
                        email: email, platform: platform
                    }, returning: true
                }).then(f => {
                    res.json(f[1][0])
                }); 
        } else {
            user.User.update({ nickname: nickname }, {
                where: {
                    email: email, platform: platform
                },returning:true
            }).then(f => { 
                res.json(f[1][0])});
        } 
    }) 
})

app.post('/getUserByEmail', (req, res) => {
    let {platform,email} =req.body 
    user.User.sync().then(e=>{
        user.User.findOne({where:{
            email:email,platform:platform
        }}).then(f=>{ 
            res.send(f)
        })
    })
})
  
app.listen(process.env.PORT,(res,err)=>{
    if(!err){ 
        console.log(process.env.PORT + 'connected!')
    }
})