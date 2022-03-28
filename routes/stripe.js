const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const uuid = require('uuid');

const items = new Map([
  [1, {priceInRupees : 100, name : "something"}],
  [2, {priceInRupees : 500, name : "second_something"}]
])

router.post("/payment", async (req, res) => {

  const {product, token} = req.body;
  const idempotencyKey = uuid();

  return stripe.customers.create({
    email : token.eamil,
    source : token.id
  }).then( customer => {
    stripe.charge.create({
      amount : product.price * 100,
      currency : 'inr',
      customer : customer.id,
      receipt_email : token.email,
      description : `Purchasing ${product.name}`,
      shipping : {
        name : token.card.name,
        address : {
          country : token.card.address_country 
        } 
      }
    },
    {idempotencyKey})
  })
  .then( result => res.status(200).json(result))
  .catch( err => console.log(err))
});

module.exports = router;
