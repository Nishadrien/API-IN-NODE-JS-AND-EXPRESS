const express=require('express');
const router=express.Router();

router.get('/',(re,res,next)=>{
    res.status(200).json({
        message:'All products fetched successfully ',
        
    });
});
router.post('/',(re,res,next)=>{
    res.status(201).json({
        message:'it is post method of products ',
        
    });
});
router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    if(id=='1234'){
        res.status(200).json({
            message:'it is first products in products tables',
            id:id
        })
    }
    else{
        res.status(200).json({
            message:'enter valid Id'
        })
    }});
    router.patch('/:productId',(req,res,next)=>{
         res.status(200).json({
         message:'Updated successfully'
        });
    });
    router.delete('/:productId',(req,res,next)=>{
        res.status(200).json({
        message:'deleted successfully'
       });
   });
module.exports=router;