const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: "./.env",
});
const app = express();
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const index = require("./routes/index");
const paypal = require("paypal-rest-sdk");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(
  express.urlencoded({
    extended: false,
  })
);

paypal.configure({
  mode: "live", //sandbox or live
  client_id:
   process.env.CLIENT_ID,
  client_secret:
    process.env.CLIENT_SECRET,
});

app.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "https://teamdowhile-cloud.herokuapp.com/success",
      cancel_url: "https://teamdowhile-cloud.herokuapp.com/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Partnership Initiation call",
              sku: "Partnership Initiation call",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "Partnership Initiation Call",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.render('success');
      }
    }
  );
});

app.get("/cancel", (req, res) => res.send("Cancelled"));


app.post("/pay2", (req, res) => {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://21stcloud.com/success2",
        cancel_url: "http://21stcloud.com/cancel2",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Partnership deep drive",
                sku: "Partnership deep drive",
                price: "2.00",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "2.00",
          },
          description: "Partnership Deep drive",
        },
      ],
    };
  
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  });

  app.get("/success2", (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "2.00",
          },
        },
      ],
    };
  
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log(JSON.stringify(payment));
          res.render('success2');
        }
      }
    );
  });
  
  app.get("/cancel2", (req, res) => res.send("Cancelled"));


app.use("/", index);
app.listen(port);


