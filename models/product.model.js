const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let productScehma=new Schema({
    name: String,
    price: String
    }  , {
        timestamps: true
    }
);
//export the model
module.exports=mongoose.model('Product',productScehma);

