/*jshint esversion: 6 */

const Product = require("../models/product");

module.exports = (req, res) => {

    let datoBusqueda = req.params.productId;

    Product.findById(datoBusqueda, (err, product) => {
        if (err) return res.status(500).send({
            message: `Error al borrar el producto ${err}`
        });

        product.remove(err => {
            if (err) return res.status(500).send({
                message: `Error al borrar el producto ${err}`
            });
          //  res.status(200).send({
            //    message: 'El producto ha sido eliminado'
          //  });
          res.redirect('/api/product');
        });
    });

};