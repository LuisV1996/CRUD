/*jshint esversion: 6 */

//import Modules
const express = require('express');
const Product = require('../models/product');
const path = require('path');
const product = require('../models/product');


//Create a router object
const router = express.Router();

//export our router
module.exports = router;

//Pagina home
router.get('/', (req, res) => {
    res.render('home');
});

//Insertar Datos
router.get('/insertProduct', (req, res) => {
    res.render('product');
})

//Consulta de todos los datos
router.get('/api/product', (req, res) => {

    Product.find({}, (err, products) => {

        if (err) return res.status(500).send({
            message: `Error  al realizar la peticion ${err}`
        });

        if (!products) return res.status(404).send({
            message: 'No existen productos'
        });

        // res.status(200).send({ product: [product] });

        res.render('showproducts', { products });

    }).lean();
});

//Consulta por filtro
router.get('/api/product/:datoBusqueda', (req, res) => {

    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (err, todoOK) => {
        // Product.findOne({ name: datoBusqueda },(err, todoOK)=>{
        if (err) return res.status(500).send({
            message: `Error  al realizar la peticion ${err}`
        });

        if (!todoOK) return res.status(404).send({
            message: 'El producto no existe'
        });
        //res.status(200).send({ product: todoOK });
        res.render('editar', {products: todoOK});
    }).lean();

});

//Modificar producto PUT
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productId', putProduct)

//Borrar un registro Delete
const delProduct = require('../controllers/delProduct');
router.delete('/api/product/:productId', delProduct);


//Insertar valores en la BD
router.post('/api/product', (req, res) => {

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description;

    console.log(req.body);

    product.save((err, productStored) => {
        if (err) return res.status(500).send({
            message: `Error  al realizar la peticion ${err}`
        });

        // res.status(200).send({product:productStored});
        res.redirect('/api/product');
    });
});

//Pagina login
const loginController = require('../controllers/login');
router.get('/auth/login', loginController);

const loginUserController = require('../controllers/loginUser');
router.post('/users/login', loginUserController);

//Pagina registro
const newUser = require('../controllers/newUser');
router.get('/users/register', newUser);

//Metodo POST registro
const newUserController = require('../controllers/storeUser');
router.post('/auth/register', newUserController);

//Pagina 404 not found
router.use((req, res) => {
    res.render('notfound');
});