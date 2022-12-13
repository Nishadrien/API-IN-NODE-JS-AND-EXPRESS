const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');


const routerproduct=require('./API/routes/products');
const routerorder=require('./API/routes/orders');
mongoose.connect('mongodb+srv://admin:AydamcDFhOXOyFwF@cluster0.hcj3zr6.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true
})


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/products',routerproduct);
app.use('/orders',routerorder);

app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports=app;