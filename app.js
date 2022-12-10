const express=require('express');
const router=require('./API/routes/products');
const routerorder=require('./API/routes/orders');
const app=express();
app.use('/products',router);
app.use('/orders',routerorder);
module.exports=app;