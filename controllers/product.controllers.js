const Product = require('../Model/product');

exports.create = (req,res)=>{
const {name , price , specification , quantity} = req.body;
if(!name || !price || !specification || !quantity){
    res.status(400).send({message: "Content cannot be empty"});
}

const product = new Product({
    
    name,
    price,
    specification,
    quantity

});

product.save(product).then((data)=>{
    res.redirect('/product/details');
}).catch((err)=>{
    res.status(500).send({message:err.message||"some error occur"})
})
    
}

exports.findAll = (req , res) =>{
   
Product.find({}).lean().sort({date:"desc"}).then((allproducts)=>{
    res.render("./products/productList" , {allproducts:allproducts})
}).catch((err)=>{
    res.status(500).send({message:"Error while retriveing the products"})
});
   
};
exports.find = (req , res) =>{
   
    Product.find({}).lean().sort({date:"desc"}).then((allproducts)=>{
        res.render("./products/invoice", {allproducts:allproducts})
    }).catch((err)=>{
        res.status(500).send({message:"Error while retriveing the products"})
    });
       
    };

 
exports.findOne = (req , res)=>{
    Product.findOne({_id:req.params.id}).lean().then((product)=>{
       res.render('./products/editProduct' , {product:product})
    }).catch((err)=>{
        console.log(err);
    })
}

exports.findOne = (req,res)=>{
    Product.findOne({_id:req.params.id})
    .lean()
    .then((editProduct)=>{
        res.render("./products/editProduct",{editProduct:editProduct});
     
    }) .catch((err)=>console.log(err));
}

  
  
//updating an product

exports.update = (req , res)=>{

    Product.findOne({ _id: req.params.id })
    .then((updateProduct)=>{
      updateProduct.name=req.body.name,
      updateProduct.price=req.body.price,
      updateProduct.specification=req.body.specification,
      updateProduct.quantity=req.body.quantity,
    updateProduct.save().then(
      (update)=>{
        
        res.redirect("/product/details", 302, {update});
      }
    ).catch((err) =>console.log(err));
    
    })
    .catch((err)=>console.log(err));
}

exports.delete = (req, res) =>{
    
        Product.remove({ _id:req.params.id })
        .then((delete_product)=>{
          
          res.redirect("/product/details",201,{delete_product:delete_product});
        })
        .catch(err=>console.log(err));
    
        
}