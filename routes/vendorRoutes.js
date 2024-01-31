const express= require("express");
const get_route= express();

const auth= require("../middleware/auth");
const storecontroller= require("../controllers/admincontroller");
const user_controller= require("../controllers/vendorController");
const xcontroller= require("../controllers/xcontroler");

const path= require("path");

const bodyParser= require("body-parser");
get_route.use(bodyParser.urlencoded({extended: true}));

get_route.use(express.static(path.resolve(__dirname,'public')));

get_route.set('view engine', 'ejs');
get_route.set('views', "./views/users");
//get_route.set('views', __dirname + '/views/users');

get_route.use(bodyParser.json());


const multer= require("multer");

let uploader= multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000}
});


get_route.post('/upload-file', uploader.single("file"), storecontroller.uploadfile);
get_route.post('/upload', uploader.single("file"), xcontroller.uploadfile);
get_route.get('/getx', xcontroller.getuser);
get_route.post('/reg', xcontroller.reg);
/*
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/productImages'), function(err, success){

            if(err){
                throw err
            }

        });
    },
    
    filename: function(req, file, cb){

        const name= Date.now()+'-'+file.originalname;
        cb(null, name, function(error, success){

            if(error){
                throw error
            }

        });

    }
});

const upload= multer({storage: storage});

*/

get_route.post('/registervendor', user_controller.uploadfile);
get_route.post('/vendorlogin', user_controller.user_login);
get_route.post('/vendorlogout', auth, user_controller.logout);
get_route.post('/vendorlogout/:token', auth, user_controller.logoutone);
get_route.get('/getvendor', user_controller.getuser);

get_route.post('/vendorreset/:token', auth, user_controller.resetpassword);

get_route.post('/vendorforget', user_controller.forget_password);
get_route.get('/vendorresetpassword', user_controller.emailforgot);
get_route.post('/vendorresetpassword', user_controller.forgetuser);

//get_route.post('/resetpassword', user_controller.e);

module.exports= get_route;

