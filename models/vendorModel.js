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

    profile_img: {
        type: String,
        required: true
    },


     tokens:{
         type: Array,
    //     default: ''
     }

    
});

module.exports= mongoose.model("vendor", userSchema);