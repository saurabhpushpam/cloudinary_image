const user = require("../models/vendorModel");
const Upload = require('../helper/upload');

const path = require("path");
const fs = require("fs");
const bcryptjs = require('bcryptjs');

const config = require("../config/config");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const randomstring = require("randomstring");
//const { profile } = require("console");



const create_token = async (id) => {

    try {

        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    }
    catch (error) {

        //res.status(400).send(error.message);

    }
}



const uploadfile = async (req, res) => {
    try {

        const pswd = req.body.password;
        const cpswd = req.body.confirmpassword;
        console.log(pswd);

        if (pswd == cpswd) {

            const spassword = await securePassword(pswd);

            const userData = await user.findOne({ email: req.body.email });
            if (userData) {

                const status = await userData.status;
                console.log(status);
                if (status == 1) {
                    const id = await userData._id;
                    console.log(status);
                    console.log(id)
                    id_name = req.body.id_name;
                    id_number = req.body.id_number;
                    const new_status = "2";
                    const userdata = await user.findByIdAndUpdate({ _id: id }, { $set: { id_name: id_name, id_number: id_number, status: new_status } }, { new: true })


                    res.send({ success: true, msg: 'data updated', /*  url: record, */ data: userdata });
                }
                else {
                    res.status(200).send({ success: false, msg: "This email is already exist" });
                }

            }
            else {
                const userphone = await user.findOne({ phone: req.body.phone });
                if (userphone) {

                    const status = await userphone.status;
                    console.log(status);
                    if (status == 1) {
                        const id = await userData._id;
                        console.log(status);
                        console.log(id)
                        id_name = req.body.id_name;
                        id_number = req.body.id_number;
                        const new_status = "2";
                        const userdata = await user.findByIdAndUpdate({ _id: id }, { $set: { id_name: id_name, id_number: id_number, status: new_status } }, { new: true })

                        //res.status(200).send({ success: true, msg: "This email is already exist" });
                        res.send({ success: true, msg: 'data updated', /*  url: record, */ data: userdata });
                    }
                    else {
                        res.status(200).send({ success: false, msg: "This phone number is already exist" });
                    }
                }
                else {
                    console.log("first");
                    const status = 1;
                    // const upload = await Upload.uploadfile(req.file.path);   //filename, path
                    // console.log(upload);
                    // console.log(upload.secure_url);
                    console.log("hello", spassword);
                    const address = {
                        city: req.body.city,
                        district: req.body.district,
                        state: req.body.state,
                        country: req.body.country,
                        pincode: req.body.pincode

                    }
                    let store = new user({
                        // profile: upload.secure_url,
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: spassword,
                        gender: req.body.gender,
                        category: req.body.category,
                        exprience: req.body.exprience,
                        charge: req.body.charge,
                        description: req.body.description,
                        status: status,
                        id_name: "",
                        id_number: "",
                        address: address
                    });
                    let record = await store.save();
                    res.send({ success: true, msg: 'Registration successful', /*  url: record, */ data: record });
                }
            }
        }
        else {
            res.status(200).send({ success: false, data: "password and confirmpassword did not match" });
        }
    }

    catch (error) {
        res.send({ success: false, msg: error.message });
    }
}


/*
const register_user = async (req, res) => {


    try {
        
        const pswd= req.body.password;
        const cpswd= req.body.confirmpassword;

        if(pswd== cpswd){

        const spassword = await securePassword(pswd);


        const mail= req.body.email;
        const validEmail = /\S+@\S+\.\S+/.test(mail);       //  /\S+@\S+\.\S+/
        if(!validEmail){
            res.status(200).send({ success: false, msg: "invalid email form" });
        }
       
        else{
            
        const userData = await user.findOne({ email: req.body.email });
        if (userData) {
            res.status(200).send({ success: false, msg: "This email is already exist" });

        }
        else {
            const userphone = await user.findOne({ phone: req.body.phone });
        if (userphone) {
            res.status(200).send({ success: false, msg: "This phone number is already exist" });

        }
        else{console.log("hi hello");

            const upload= await Upload.uploadfile(req.file.path);   //filename, path

            const users = new user({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: spassword,
                gender: req.body.gender,
                exprience: req.body.exprience,
                category: req.body.category,
                profile_img: upload.secure_url
                // password: req.body.password,
    
            });
            
            const user_data = await users.save();
            res.status(200).send({ success: true, data: user_data });
        }
    }
        }

    }
    else{
        res.status(200).send({ success: false, data: "password and confirmpassword did not match" });
    }
    }

    catch (error) {
        
console.log("catch");
        res.status(400).send(error.message);
    }

}
*/


//login Method

const user_login = async (req, res) => {

    const { email, phone, password } = req.body;

    console.log('Received login request:', { email, phone, password }); // Debugging log
    try {

        const isEmail = /\S+@\S+\.\S+/.test(email);

        // Check if the 'email' or 'mobile' is provided
        if (!isEmail && !phone) {
            return res.status(400).json({ message: 'Email or mobile number is required' });
        }

        // Find the user based on email or mobile number
        let userData;

        // Find the user based on email or mobile number
        if (isEmail) {
            userData = await user.findOne({ email });
        } else {
            userData = await user.findOne({ phone });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        /*
        
                const email = req.body.email;
                const phone = req.body.phone;
                const password = req.body.password;
        
        
        
                const userData = await user.findOne({
                    $or: [{ email: email }, { phone: phone }]
                });
               
        
        */
        if (userData) {

            const passwordmatch = await bcryptjs.compare(password, userData.password);


            if (passwordmatch) {

                const tokenData = await create_token(userData._id);
                const id = await userData._id;
                const savetoken = await user.updateOne({ _id: id }, { $push: { tokens: tokenData } });


                const userResult = {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone,
                    category: userData.category,
                    gender: userData.gender,
                    exprience: userData.exprience,
                    token: tokenData

                }

                const response = {
                    success: true,
                    msg: "User Details",
                    data: userResult
                }

                res.status(200).send(response);

            }
            else {
                res.status(200).send({ success: false, msg: "login details are incorrect" });
            }

        }
        else {
            res.status(200).send({ success: false, msg: "login details are incorrect" });
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


const getuser = async (req, res) => {
    try {

        const data = await user.find();
        const formattedData = data.map(item => ({

            id: item._id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            password: item.password,
            gender: item.gender,
            category: item.category,
            exprience: item.exprience,
            token: item.tokens

        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// reset password while login
const resetpassword = async (req, res) => {
    try {

        //const token = req.query.token;
        const token = req.headers.authorization;
        const tokenData = await user.findOne({ tokens: token });

        if (tokenData) {

            const password = req.body.password;
            //  const oldpassword = tokenData.password;

            const passwordmatch = await bcryptjs.compare(password, tokenData.password);
            if (passwordmatch) {
                const new_password = req.body.newpassword;
                const confirmpassword = req.body.confirmpassword;
                if (new_password === confirmpassword) {
                    const newpassword = await securePassword(new_password);
                    const userdata = await user.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newpassword } }, { new: true })

                    res.status(200).send({ success: true, msg: "User password has been reset", data: userdata });
                }
                else {
                    res.status(200).send({ success: true, msg: "new_password and confirm_password didn't match" });
                }

            }
            else {
                res.status(200).send({ success: true, msg: "password is wrong" });
            }
        }

        else {
            res.status(200).send({ success: true, msg: "invalid token" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}



const sendresetpasswordmail = async (username, email, token) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOption = {
            from: config.emailUser,
            to: email,
            subject: 'For reset password',
            html: '<p> Hii ' + username + ', please click the link for <a href= "http://localhost:8000/api/vendorresetpassword"> reset your password </a>'
        }

        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);

            }
            else {
                console.log("Mail has been sent : ", info.response);
            }
        });



    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


// send mail for reset password
const forget_password = async (req, res) => {

    try {
        const email = req.body.email;
        const userData = await user.findOne({ email: email });
        if (userData) {

            const Randomstring = randomstring.generate();
            const data = await user.updateOne({ email: email }, { $set: { token: Randomstring } });
            sendresetpasswordmail(userData.name, userData.email, Randomstring);
            res.status(200).send({ success: true, msg: "Please check your inbox of email and reset your password" })

        }
        else {

            res.status(200).send({ success: true, msg: "This email does not exist" });

        }

    } catch (error) {

        res.status(200).send({ success: false, msg: error.message });

    }

}



/*
// reset password

const reset_password = async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await user.findOne({ token: token });

        if (tokenData) {
            const password = req.body.password;
            const newpassword = await securePassword(password);
            const userdata = await user.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newpassword, token: '' } }, { new: true })

            res.status(200).send({ success: true, msg: "User password has been reset", data: userdata })
        } else {
            res.status(200).send({ success: true, msg: "This link is invalid" });
        }

    } catch (error) {
        res.status(200).send({ success: false, msg: error.message });
    }
}
*/


// when we open link what we get on email, this will open reset.ejs file on browser
const emailforgot = async (req, res) => {
    try {
        res.render('reset');
    } catch (error) {
        console.log(error.message);
    }
}


// this is after submit form that opened from email link
const forgetuser = async (req, res) => {
    try {

        const email = req.body.email;

        const userdata = await user.findOne({ email: email })
        if (!userdata) {
            res.render('reset', { message: " invalid email" });
        }



        else {

            const newpassword = req.body.newpassword;
            const confirmpassword = req.body.confirmpassword;


            if (newpassword === confirmpassword) {


                const newpswd = await securePassword(newpassword);
                const userd = await user.findByIdAndUpdate({ _id: userdata._id }, { $set: { password: newpswd } }, { new: true })

                res.render('data', { message: " your password has been reset successfully" });

            }


            else {

                res.render('reset', { message: " new password and confirm password did not match" });

            }

        }

    } catch (error) {
        res.render('reset', { message: error.message });

    }
}




// logout from all device
const logout = async (req, res) => {
    try {

        // const token = req.params.token;
        const token = req.headers.authorization;
        //  const token= req.query.token;

        const tokenData = await user.findOne({ tokens: token });

        if (tokenData) {


            const newtoken = [];
            const userdata = await user.findByIdAndUpdate({ _id: tokenData._id }, { $set: { tokens: newtoken } }, { new: true })

            res.status(200).send({ success: true, msg: "Logout Successfully" });
        }
        else {
            res.status(200).send({ success: true, msg: "Invalid token" });
        }
        //      const foundDocuments = await DataModel.find({ name: value });
    }


    catch (error) {
        res.status(400).send(error.message);
    }
}



// logout from 1(current) device
const logoutone = async (req, res) => {
    try {

        const token = req.params.token;
        //  const token= req.query.token;

        const tokenData = await user.findOne({ tokens: token });

        if (tokenData) {

            const mytoken = tokenData.tokens;

            // Use the filter method to exclude the element you want to delete.
            const newArray = mytoken.filter((item) => item !== token);

            const userdata = await user.findByIdAndUpdate({ _id: tokenData._id }, { $set: { tokens: newArray } }, { new: true })

            res.status(200).send({ success: true, msg: "Logout Successfully" });
        }
        else {
            res.status(200).send({ success: true, msg: "Invalid token" });
        }
        //      const foundDocuments = await DataModel.find({ name: value });
    }


    catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {

    // register_user,
    uploadfile,
    user_login,
    getuser,
    forget_password,
    emailforgot,
    forgetuser,
    resetpassword,
    logout,
    logoutone


}