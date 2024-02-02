const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
     // phone: {
     //      type: String,
     //      // require: true
     // },

     file_url: {
          type: String,
          require: true
     }

});

module.exports = mongoose.model("store", storeSchema);