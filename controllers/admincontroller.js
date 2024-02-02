const Store = require('../models/store');
const Upload = require('../helper/upload');

const uploadfile = async (req, res) => {
    try {

        const upload = await Upload.uploadfile(req.file.path);   //filename, path


        const userData = await user.findOne({ phone: req.body.phone });

        if (userData) {
            let store = new Store({
                phone: req.body.phone,
                file_url: upload.secure_url
            });
            let record = await store.save();
            res.send({ success: true, msg: 'file uploaded successfuly', url: record });
        }
        else {
            res.send({ success: true, msg: 'phone already added', url: record });
        }
    }

    catch (error) {
        res.send({ success: false, msg: error.message });
    }
}


const getalldata = async (req, res) => {
    try {

        const data = await Store.find();
        const formattedData = data.map(item => ({

            id: item._id,
            phone: item.phone,
            file: item.file_url
        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    uploadfile,
    getalldata
}