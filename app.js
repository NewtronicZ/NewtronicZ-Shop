const express = require('express');
const chalk = require('chalk')
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
//const products = require('./data/products.json'); ย้ายไปใช้ที่ ProductsRouter
//const productsRouter = express.Router(); ย้ายไปใช้ที่ ProductsRouter

const app = express();
const PORT = process.env.PORT || 4000;
const productsRouter = require('./src/router/productsRouter');

app.use(morgan('combined'));
//app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, 'src/')));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use('/products', productsRouter);

//ย้ายไปใช้ที่ ProductsRouter
/*productsRouter.route('/').get((req, res) => {
    res.render("products",
        products,
    );
});

productsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    res.render("product",{
        product: products[id],
    });
});*/

//ปิดไว้จะไปใช้ EJS เเทน
/*app.get('/', (req, res) => {
    res.render('index');
});*/

const products = require('./src/data/products.json');

app.get('/catalog', (req, res) => {
    res.render('catalog', {
        products: products,
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/', (req, res) => {
    res.redirect('/products');
});

app.listen(PORT, () => {
    debug("Listening on port: " + chalk.red(" : " + PORT));
});