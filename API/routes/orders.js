const express=require('express');
const router=express.Router();
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Orders Fetched Successfully'

    });
});
router.post('/',(req,res,next)=>{
    const order={
       productId:req.body.productId,
       quantity:req.body.quantity

    };
    res.status(201).json({
        message:'Orders Posted Successfully',
        order:order

    });
});
router.get('/:orderId',(req,res,next)=>{
    const id=req.params.orderId;
        res.status(200).json({
            message:'Orders by id getted Successfully',
            id:id
    });
});
router.patch('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Orders Updated Successfully'
    });
});
router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Orders deleted Successfully'
    });
});

module.exports=router;