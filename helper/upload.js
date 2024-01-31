const cloudinary= require("cloudinary").v2;

cloudinary.config({
   /* cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET  */

    cloud_name: "dr1gqb7u4",
    api_key: "125115619854455",
    api_secret: "SYTZ7m_yEPC_y04Ml6ARnlekO4Q"
    
});

const uploadfile= async(filepath) => {
    try{

        const result= await cloudinary.uploader.upload(filepath);
        
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    uploadfile
}