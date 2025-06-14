import mongoose from "mongoose";

const productSchema = mongoose.Schema({

    product_id :{
        type : String,
        required : true,
        unique : true
    },
    productname :{
        type : String,
        required : true
    },
    // category :{
    //     type : String,
    //     required : true
    // },
   
    altName: [
    {
        type: String,
        required: true
    }
],

    description :{
        type : String,
        required : true
    },

    images :[
        {
            type : String
        }
    ],

    labelledPrice :{
        type : Number,
        required : true
    },

    price :{
        type : Number,
        required : true
    },

    stock :{
        type : Number,
        required : true
    },

    isAvailable :{
        type : Boolean,
        required : true,
        default : true
    },


   
});

const Product = mongoose.model("Product", productSchema);

export default Product;
