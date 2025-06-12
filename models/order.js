import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    order_id :{
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "Pending"
    },
    labelledTotal : {
        type : Number,
        required : true
    },
    
    total : {
        type : Number,
        required : true
    },

    products : [
        {
            productInfo : {
                product_id : {
                    type : String,
                    required : true
                },
                name : {
                    type : String,
                    required : true
                },
                images :[{

                }],
                labelledPrice : {
                    type : Number,
                    required : true
                },

                price :{
                    type : Number,
                    required : true
                },

               
            },
            quantity : {
                type : Number,
                required : true
    }
        }
    ],
    date : {
        type : Date,
        default : Date.now
    }


   

});

const Order = mongoose.model("Order", orderSchema);
export default Order