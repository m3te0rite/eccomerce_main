import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';
import path from 'path';

// Load variables 
dotenv.config();

//Start Server
const app = express(process.env.stripe_api);
app.use(express.static("public"));
app.use(express.json());

const __dirname = path.resolve();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// App Routes:

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// services page Route
app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "services.html"));
});

// Home Route
app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "products.html"));
});

// Home Route
app.get("/all-keyboards", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "allkeyboards.html"));
});

// Home Route
app.get("/all-pcs", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "allpcs.html"));
});

//success
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "order-status", "success.html"));
});

//cancel
app.get("/cancel", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "order-status", "cancel.html"));
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Stripe
let stripeGateway = stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;

app.post("/stripe-checkout", async(req, res) => {
    const lineItems = req.body.items.map((item) => {
       console.log()
       console.log(item)
       const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100);
       console.log('item-price:', item.price);
       console.log("unitAmount:",unitAmount);
       return {
        price_data: {
        currency: 'usd',
        product_data: {
            name:item.title,
            images: [item.productImg]
        },
        unit_amount: unitAmount,
    },
    quantity: item.quantity,
       };
    });
    console.log("lineItems:", lineItems);


    //  Create Checkout Session 
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode:"payment",
        success_url: `${DOMAIN}/order-status/success.html`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,
        // Asking Address In Stripe Checkout page
        billing_address_collection: "required",
    });
    res.json(session.url);
});

app.listen(3000, () => {
    console.log('listening on port 3000;');
});

