const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('../models/products');
router.get('/',(req,res,next)=>{
Product.find()
.select('name price _id')
.then((result)=>{
    const response={
        count:result.length,
        products:result.map(result=>{
            return {
                _id:result._id,
                name:result.name,
                price:result.price,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+result._id
                }
            }
        })
    }
   
        res.status(200).json(response);  
})
});
router.post('/',(req,res,next)=>{
   
    const product=new Product({
_id:new mongoose.Types.ObjectId(),
name:req.body.name,
price:req.body.price
    });
    product.save().then((result)=>{
        console.log('inserted successfully');
        res.status(201).json({
            message:'product created successfully ',
            createdProduct:{
                _id:result._id,
                name:result.name,
                price:result.price,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+result._id
                }
            }
            
        });
    })
    .catch(err=>{
        res.status(500).json({
            Error:err
        });
    })
   
});
router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
   Product.findById({_id:id})
   .exec()
   .then((result)=>{
    
    if(result){
        console.log('One Element Fetched');
        res.status(200).json({
            ProductDetails:{
                _id:result._id,
                name:result.name,
                price:result.price,
                request:{
                    type:'GET_ALL_PRODUCTS',
                    url:'http://localhost:3000/products/'
                }
            }
         })
    }
    else{
        res.status(404).json({
            message:'No data found for this '+id
        })
    }
   }).catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
   })
    });
    router.patch('/:productId',(req,res,next)=>{
        const id=req.params.productId;
        // const updateOps={};  can be used when there is only one update
        // for(const ops of req.body){
        //     updateOps[ops.propName]=ops.value;        }
        Product.updateOne({_id:id},{$set:{name:req.body.name,price:req.body.price}}).exec()
        .then(result=>{
            console.log(result);
            res.status(200).json(
                {
                    message:'product updated successfully',
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/products/'+id
                    }

                }
            )

        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })

        });
       
    });
    router.delete('/:productId',(req,res,next)=>{
       const id=req.params.productId;
       Product.remove({_id:id})
       .exec()
       .then((result)=>{
        console.log(result);
        res.status(200).json({
            message:'deleted successfully'
        })
       })
       .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        });
       });
   });
module.exports=router;