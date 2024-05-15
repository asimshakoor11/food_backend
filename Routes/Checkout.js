


const express = require('express')
const router = express.Router()
const stripe = require("stripe")("sk_test_51PG1tYJAAxwzjlgZ8vRTNPPWoSxToyPoV5ZZocmUwFYP4wH7wOLYFc1WICyQUyERlmN5C8xC7b3dxj5HSkovdS9s00D1MY9se6");




router.post('/create-checkout-session', async (req, res) => {

    let datas = req.body.order_data

    console.log("hittted")

    const lineItems = datas.map((data)=>({
        price_data:{
            currency:"pkr",
            product_data:{
                name:data.name,
            },
            unit_amount:data.price * 100,
        },
        quantity:data.qty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/failed",
    });

    res.json({id:session.id})
    
})

module.exports = router;