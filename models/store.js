const mongoose= require('mongoose');

const storeSchema= mongoose.Schema({
     file_url: {
        type: String,
         require: true
     }
    
});

module.exports= mongoose.model("store", storeSchema);