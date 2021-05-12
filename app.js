const express = require('express');
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({
    path: './.env'
})
const app = express();
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const index = require('./routes/index')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set('view engine','hbs')
app.use(express.urlencoded({
    extended: false
}))

app.use('/',index);
app.listen(port);

