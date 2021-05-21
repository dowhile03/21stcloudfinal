const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require('body-parser')   
const path = require("path");
dotenv.config({
  path: "./.env",
});
const app = express();
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const index = require("./routes/index");


 const PUBLISHABLE_KEY = "pk_test_51HVx9ZGhHrWNdBHOxLcKuR39ApxdTx3ZP6JUEazZZ7SAJaXUvx1o4YsmBpb2PlWSJWnXVS48GRV2UAPVjs6l4R7o00WrtUNumL"
const SECRET_KEY = "sk_test_51HVx9ZGhHrWNdBHOq8vtsvM0gXu4omgWgbmjCr8iexRvnlZ9WKAcqFyvrXda3upvfLGS2FIvCk8ohLzfToRmec5I00rcQIZclC"

 const stripe = require('stripe')(SECRET_KEY) 


 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get('/payment1',(req,res) => {
  res.render('payment1',{
      key:PUBLISHABLE_KEY
  });
})




app.post('/pay', function(req, res){ 

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: '21stcloud', 
      address: { 
          line1: 'Old MES colony', 
          postal_code: '95074', 
          city: 'New Delhi', 
          state: 'Delhi', 
          country: 'US', 
      } 
  }) 
  .then((customer) => { 

      return stripe.charges.create({ 
          amount: 70,    
          description: 'Partnership initiation call', 
          currency: 'INR', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.render('success',{
        title:"payment Successful"
      }); 
  }) 
  .catch((err) => { 
      res.send(err)  
      console.log(err);  
  }); 
})

app.get('/payment2',(req,res) => {
  res.render('payment2',{
    key2:PUBLISHABLE_KEY
  });
})

app.post('/pay2', function(req, res){ 

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: '21stcloud', 
      address: { 
          line1: 'Old MES colony', 
          postal_code: '95074', 
          city: 'New Delhi', 
          state: 'Delhi', 
          country: 'US', 
      } 
  }) 
  .then((customer) => { 

      return stripe.charges.create({ 
          amount: 70,    
          description: 'Partnership Deep drive', 
          currency: 'INR', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.render('success2',{
        title:"payment Successful"
      }); 
  }) 
  .catch((err) => { 
      res.send(err)  
      console.log(err);  
  }); 
})



app.use("/", index);
app.listen(port);


