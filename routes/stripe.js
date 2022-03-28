const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const items = new Map([
  [1, {priceInRupees : 100, name : "something"}],
  [2, {priceInRupees : 500, name : "second_something"}]
])

router.post("/payment", async (req, res) => {

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      mode: 'payment',
      line_items : req.body.items.map( item => {
        const storeItem = items.get(item.id)
        return {
          price_data : {
            currency : "inr",
            product_data:{
              name : storeItem.name
            },
            unit_amount : storeItem.priceInRupees
          },
          quantity : item.quantity
        }
      }),
      success_url: `${process.env.BASE_URL}/success.html`,
      cancel_url: `${process.env.BASE_URL}/cancel.html`,
    });
  } catch (e) {
    console.log(e);
  }
  res.redirect(303, session.url);
});

module.exports = router;
