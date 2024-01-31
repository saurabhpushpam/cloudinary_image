const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
     name:{
         type: String,
         required: true
     },
     email:{
         type: String,
         required: true
     },
     phone:{
         type: String,
         required: true
     },
     password:{
         type: String,
         required: true
     },
     gender:{
        type: String,
        required: true
    },
    exprience:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

    // file_url: {
    //     type: String,
    //      require: true
    //  },
    profile: {
        type: String,
         require: true
     },

     charge: {
        type: String,
         require: true
     },

     description: {
        type: String,
         require: true
     },
     status: {
        type: String,
         require: true
     },
    id_name: {
        type: String,
         require: true
     },
     id_number: {
        type: String,
         require: true
     },
     address:{
        city:{
            type: String,
            require: true
        },
        district:{
            type: String,
            require: true
        },
        state:{
            type: String,
            require: true
        },
        country:{
            type: String,
            require: true
        },
        pincode:{
            type: String,
            require: true
        },
     }


    //  tokens:{
    //      type: Array,
    // //     default: ''
    //  }

    
});

module.exports= mongoose.model("x", userSchema);