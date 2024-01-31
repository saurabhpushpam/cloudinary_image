const Store = require('../models/store1');
const Upload = require('../helper/upload');
const user = require("../models/vendorModel");
const path = require("path");
const fs = require("fs");
const bcryptjs = require('bcryptjs');

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


        if (pswd == cpswd) {

            const spassword = await securePassword(pswd);

            const userData = await Store.findOne({ email: req.body.email });
            if (userData) {

                const status = await userData.status;
                console.log(status);
                if (status == 1) {
                    const id = await userData._id;
                    console.log(status);
                    console.log(id)
                    id_name= req.body.id_name;
                    id_number= req.body.id_number;
                    const new_status= "2";
                    const userdata = await Store.findByIdAndUpdate({ _id: id }, { $set: { id_name: id_name, id_number: id_number, status: new_status } }, { new: true })

                    
                    res.send({ success: true, msg: 'data updated', /*  url: record, */ data: userdata });
                }
                else {
                    res.status(200).send({ success: false, msg: "This email is already exist" });
                }

            }
            else {
                const userphone = await Store.findOne({ phone: req.body.phone });
                if (userphone) {
                    
                const status = await userphone.status;
                console.log(status);
                if (status == 1) {
                    const id = await userData._id;
                    console.log(status);
                    console.log(id)
                    id_name= req.body.id_name;
                    id_number= req.body.id_number;
                    const new_status= "2";
                    const userdata = await Store.findByIdAndUpdate({ _id: id }, { $set: { id_name: id_name, id_number: id_number, status: new_status } }, { new: true })

                    //res.status(200).send({ success: true, msg: "This email is already exist" });
                    res.send({ success: true, msg: 'data updated', /*  url: record, */ data: userdata });
                }
                    else{
                    res.status(200).send({ success: false, msg: "This phone number is already exist" });
                    }
                }
                else {
                    console.log("first");
                    const status = 1;
                    const upload = await Upload.uploadfile(req.file.path);   //filename, path
                    console.log(upload);
                    console.log(upload.secure_url);
                    console.log(spassword);
                    const address= {
                        city: req.body.city,
                        district: req.body.district,
                        state: req.body.state,
                        country: req.body.country,
                        pincode: req.body.pincode

                    }
                    let store = new Store({
                        profile: upload.secure_url,
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

const getuser = async (req, res) => {
    try {

        const data = await Store.find();
        const formattedData = data.map(item => ({

            id: item._id,
            name: item.name,
            profile: item.profile,
            email: item.email,
            phone: item.phone,
            password: item.password,
            gender: item.gender,
            category: item.category,
            exprience: item.exprience,
            charge: item.charge,
            description: item.description,
            status: item.status,
            id_name: item.id_name,
            id_number: item.id_number,
            address: item.address
            //      token: item.tokens

        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}





const register = async (req, res) => {


    try {

        const pswd = req.body.password;
        const cpswd = req.body.confirmpassword;

        if (pswd == cpswd) {

            const spassword = await securePassword(pswd);


            // const mail= req.body.email;
            // const validEmail = /\S+@\S+\.\S+/.test(mail);       //  /\S+@\S+\.\S+/
            // if(!validEmail){
            //     res.status(200).send({ success: false, msg: "invalid email form" });
            // }
            let x = 1;
            if (x > 2) { }

            else {

                const userData = await user.findOne({ email: req.body.email });
                if (userData) {
                    res.status(200).send({ success: false, msg: "This email is already exist" });

                }
                else {
                    const userphone = await user.findOne({ phone: req.body.phone });
                    if (userphone) {
                        res.status(200).send({ success: false, msg: "This phone number is already exist" });

                    }
                    else {
                        console.log("hi hello");

                        //             const upload= await Upload.uploadfile(req.file.path);   //filename, path
                        // console.log(upload);
                        //             const users = new user({
                        //                 name: req.body.name,
                        //                 email: req.body.email,
                        //                 phone: req.body.phone,
                        //                 password: spassword,
                        //                 gender: req.body.gender,
                        //                 exprience: req.body.exprience,
                        //                 category: req.body.category,
                        //                 profile_img: upload.secure_url
                        //                 // password: req.body.password,

                        //             });

                        //             const user_data = await users.save();
                        //             res.status(200).send({ success: true, data: user_data });
                        //         


                        const upload = await Upload.uploadfile(req.file.path);   //filename, path
                        console.log(upload);
                        console.log(upload.secure_url);
                        let store = new Store({
                            file_url: upload.secure_url,
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                            password: req.body.password,
                            gender: req.body.gender,
                            category: req.body.category,
                            exprience: req.body.exprience
                        });
                        let record = await store.save();
                        res.send({ success: true, msg: 'file uploaded successfuly', /*  url: record, */ data: record });
                    }
                }
            }

        }
        else {
            res.status(200).send({ success: false, data: "password and confirmpassword did not match" });
        }
    }

    catch (error) {

        console.log("catch");
        res.status(400).send(error.message);
    }

}



const reg = async (req, res) => {
    try {

        const upload = await Upload.uploadfile(req.file.path);   //filename, path
        console.log(upload);
        console.log(upload.secure_url);
        let store = new Store({
            file_url: upload.secure_url,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            gender: req.body.gender,
            category: req.body.category,
            exprience: req.body.exprience
        });
        let record = await store.save();
        res.send({ success: true, msg: 'file uploaded successfuly', /*  url: record, */ data: record });
    }

    catch (error) {
        res.send({ success: false, msg: error.message });
    }
}



module.exports = {
    uploadfile,
    getuser,
    register,
    reg
}