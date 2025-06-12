import Order from "../models/order.js"
import Product from "../models/product.js";

export async function createOrder(req,res){

    if(req.user == null){
        res.stattus(403).json({
            message : "Unauthorized"
        })
        return
    }

    const orderInfo = req.body

    if (orderInfo.name == null) {
		orderInfo.name = req.user.firstname + " " + req.user.lastname;
	}

    let order_id = "CBC00001"

    const lastOrder = await Order.find().sort({ date: -1 }).limit(1);


    if(lastOrder.length > 0){

        const lastOrderId = lastOrder[0].order_id;

        const lastOrderNumberString = lastOrderId.replace("CBC","");
        const lastOrderNumber = parseInt(lastOrderNumberString);
        const newOrderNumber = lastOrderNumber + 1;
        const newOrderNumberString = String(newOrderNumber).padStart(5, "0");
        order_id = "CBC" + newOrderNumberString;
   
    }

    try{

        let total = 0;
        let labelledTotal = 0;
        const products = [];

        for(let i = 0 ; i < orderInfo.products.length ; i ++){

            const item = await Product.findOne({product_id : orderInfo.products[i].product_id})

            if(item == null){
                res.status(404).json({
                    message : "Product Not Found"
                })
                return
            }

            if(item.isAvailable == false){
                res.status(404).json({
                    message : "Product Not Available"
                })
                return
            }

            products[i]={
                productInfo :{
                    product_id : item.product_id,
                    name : item.productname,
                    altName : item.altName,
                    description : item.description,
                    images : item.images,
                    labelledPrice : item.labelledPrice,
                    price : item.price
                },

                quantity : orderInfo.products[i].quantity,
                
            }
            total += item.price * orderInfo.products[i].quantity;
            labelledTotal += item.labelledPrice * orderInfo.products[i].quantity;
        }
            

    
    

    const order = new Order({
        order_id : order_id,
        email : req.user.email,
        name : orderInfo.name,
        address : orderInfo.address,
        total: 0,
        phone : orderInfo.phone,
        products : products,
        labelledTotal : labelledTotal, 
        total : total
        
    })
     
  

        const createOrder =  await order.save()
        res.status(200).json({
            message : "Order created successfully",
            order : createOrder
        })

    }
    catch(error){
        res.status(500).json({
            message : "Error creating order",
            error : error.message
        })
    }


}