const AWS = require('aws-sdk');
const md5 = require('md5')
AWS.config.loadFromPath('./config.json');
const multer = require('multer');
const multerS3 = require('multer-s3')
const sharp = require('sharp')
const S3 = new AWS.S3();
 
 
// const params = {
//     Key: `image/${image.url}.jpg`,
//     Bucket: 'recipeappbucket',
//     ContentType: 'image/jpg'
// }

//         S3.upload(params,(err,data)=>{
//             console.log(err)
//             console.log(data)
//         }) 

module.exports = {
    upload: multer({
        storage:multerS3({
            s3:S3,
            bucket:'recipeappbucket',
            transforms:[{
                id:'original',
                key: function (req,file,cb){
                    console.log(req.body)
                    let extension = file.originalname;
                    cb(null,req.body.name+extension)
                },
                transform:function (req,file,cb){
                    cb(null, sharp().resize(500, 500).max())
                }
            }],
            acl: 'public-read-write'
        })
    }),

    uploadProfile: multer({
        storage:multerS3({
            s3:S3,
            bucket:'recipeappbucket',
            key:function (req,file,cb){ 
                let extension = file.originalname;
                cb(null,'userProfileImage/'+req.body.email+'_profile'+extension);
            },
            transforms:[{
                id:'original', 
                transform:function (req,file,cb){
                    cb(null,sharp().resize(100, 100).max())
                }
            }],
            acl: 'public-read-write'
        })
    })
}