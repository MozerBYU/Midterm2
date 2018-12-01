var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var Amazon = mongoose.model('Amazon');

router.param('product', function(req, res, next, id) {
    console.log("In product PARAM route");
    var query = Amazon.findById(id);
    query.exec(function(err, product) {
        if (err) { return next(err); }
        if (!product) { return next(new Error("Can't find prodcut")); }
        req.product = product;
        console.log("Returning product");
        return next();
    });
    console.log("Product PARAM route complete");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("In basic GET route");
    console.log("Navigating to the homepage");
    res.render('index.html', { source: 'public' });
});

router.get('/amazon/:product', function(req, res, next) {
    console.log("In product GET route");
    res.json(req.product);
    console.log("Product GET route complete");
});

router.put('/amazon/:product/upPurchase', function(req, res, next) {
    console.log("In product PUT route");
    console.log("Product Name: " + req.product.ProductName);
    console.log("Product Price: " + req.product.ProductPrice);
    console.log("Product Picture Url: " + req.product.ProductPictureUrl);
    console.log("Product Purchase Count: " + req.product.ProductPurchaseCount);

    req.product.uppurchase(function(err, product) {
        console.log("Running uppurchase");
        if (err) { return next(err); }
        console.log("Still running it");
        console.log("Product " + product);
        res.json(product);
    });
    console.log("Product PUT route complete");
});

router.delete('/amazon/:product', function(req, res, next) {
    console.log("In product DELETE route");
    req.product.remove();
    res.sendStatus(200);
    console.log("Product DELETE route complete");
});

router.get('/amazon', function(req, res, next) {
    console.log("In amazon GET route");
    Amazon.find(function(err, product) {
        if (err) { return next(err); }
        res.json(product);
    });
    console.log("Amazon GET route complete");
});

router.post('/amazon', function(req, res, next) {
    console.log("In amazon POST route");
    var product = new Amazon(req.body);
    console.log("Product: " + product);
    product.save(function(err, product) {
        if (err) { return next(err); }
        res.json(product);
        console.log("Saving " + product);
    });
    console.log("Amazon POST route complete");
});
module.exports = router;
