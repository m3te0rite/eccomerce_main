import express from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripeGateway = stripe(process.env.STRIPE_API);
const DOMAIN = process.env.DOMAIN;

app.use(express.json());

app.post("/stripe-checkout", async (req, res) => {
    const lineItems = req.body.items.map((item) => {
       const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100);
       return {
        price_data: {
        currency: 'usd',
        product_data: {
            name: item.title,
            images: [item.productImg]
        },
        unit_amount: unitAmount,
    },
    quantity: item.quantity,
       };
    });

    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,
        billing_address_collection: "required",
    });
    res.json({ url: session.url });
});

export default app;