const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPWD,
    {
        host:'localhost',
        user:'postgres',
        password:'1234',
        port:'5432',
        dialect:'postgres', 
    }
) 
   
module.exports.init = sequelize.authenticate().then(()=>{ 
    console.log('db connection success')
}).catch(err=>{
    console.log('db connection error: ' + err)
})

module.exports.sq = sequelize;

 