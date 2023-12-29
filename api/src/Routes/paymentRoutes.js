const { Router } = require('express');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);
const { doc,updateDoc } = require('firebase/firestore') 
const paymenRoutes = Router();

// Stripe:
paymenRoutes.post('/premium', async (req, res) => {
    try {   
        const { id, username, email } = req.body;
        let clientId = '';

        const newCustomer = await stripe.customers.create({
            name: username,
            email: email,
            payment_method: id,
            invoice_settings: { default_payment_method: id }
        });

        clientId = newCustomer.id;

        
        const subscription = await stripe.subscriptions.create({
            currency: 'usd',
            description: 'Kinema Premium',
            customer: clientId,
            items: [
                {price: 'price_1LvYP5FFC0gF7yTenRItnb4g'},
            ],
        });

        const subId = subscription.id

        res.send({ message: 'Your payment has been successfully processed. Enjoy Kinema Premium', subId, success: true });
    } 
    catch (error) {
        res.json({ message: error.message, sucess: false });
    }
});
  
paymenRoutes.post('/rent', async (req, res) => {
    try {
        const { id, username, email, title  } = req.body;
        let clientId = '';

        const existingCustomer = await stripe.customers.list({
            email: email,
            limit: 1
        });

        if (existingCustomer.data.length){
            clientId = existingCustomer.data[0].id;
        }
        else {
            const newCustomer = await stripe.customers.create({
                name: username,
                email: email,
            });
            clientId = newCustomer.id
        }

        const payment = await stripe.paymentIntents.create({
            amount: '199',
            currency: 'usd',
            description: 'Kinema Rent - ' + title,
            payment_method: id,
            confirm: true,
            customer: clientId,
        });

        res.send({ message: 'Your payment has been successfully processed. Enjoy your movie!', success: true });
    } 
    catch (error) {
        res.json({ message: error.message, sucess: false });
    }
});

paymenRoutes.post('/downgrade', async (req, res ) => {
    try {
        const { id } = req.body;
        stripe.subscriptions.del(id);
        res.send({message : 'Your subscription has been canceled.', success: true})
    } catch (error) {
        res.json({ message: "Fail downgrade.", sucess: false });
    }
})


module.exports = paymenRoutes;



