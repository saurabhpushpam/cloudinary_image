const Store= require('../models/store');
const Upload= require('../helper/upload');

const uploadfile= async(req, res) => {
    try{
        
        const upload= await Upload.uploadfile(req.file.path);   //filename, path
       
        let store= new Store({
            file_url: upload.secure_url
        });
        let record= await store.save();
        res.send({ success: true, msg: 'file uploaded successfuly', url: record});
    }

    catch(error) {
        res.send({ success: false, msg: error.message});
    }
}

module.exports ={
    uploadfile
}