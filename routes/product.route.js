
module.exports = app =>{
    const products = require("../controllers/product.controllers");
    const router = require('express').Router();
     const {ensureAuthenticated} = require('../middleware/auth');
   
    router.get("/add-product",ensureAuthenticated, (req, res) => {
        res.render("./products/add-product");
      });

      //adding the product
      router.post('/add-product', ensureAuthenticated, products.create );

      //Retriveing all the product
      router.get("/details",ensureAuthenticated,products.findAll );
      router.get("/invoice",products.find );

      //finding one product
      router.get("/edit-product/:id",ensureAuthenticated,products.findOne);

      router.get('/prod-details/:id',ensureAuthenticated, products.findOne);
      //updating the product

      router.put("/update/:id" ,ensureAuthenticated, products.update);

      //deleting the product

      router.delete("/delete/:id",ensureAuthenticated , products.delete)


   app.use('/product' , router)
}







