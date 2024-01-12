let express=require("express")
let cors = require('cors')
let app=express()
app.use(cors())
app.use(express.json());
//app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"

    )

    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,content-Type,accept"
    );
    next();
});
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
let baseURL="https://repo-8qu2.onrender.com/productServer/"
let axios=require("axios")
app.get("/myServer/customers",function(req,res){
    axios.get(baseURL+"/customers")
    .then(function(response){
        console.log(response)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})


app.get("/myServer/products",function(req,res){
    axios.get(baseURL+"/products")
    .then(function(response){
        console.log(response)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})

app.get("/myServer/orders",function(req,res){
let {cust,prod}=req.query;
let params={};
if (cust) params.cust=cust;
if(prod) params.prod=prod


    axios.get(baseURL+"/orders",{params:params})
    .then(function(response){
        //console.log(response)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
           // console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})

app.get("/myServer/orders/customer/:cust",function(req,res){
    let {cust}=req.params;
    axios.get(`${baseURL}/orders/customer/${cust}`)
    .then(function(response){
        console.log(response)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})

app.get("/myServer/orders/product/:prod",function(req,res){
    let {prod}=req.params;
    axios.get(`${baseURL}/orders/product/${prod}`)
    .then(function(response){
        console.log(response)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})


app.post("/myServer/orders",function(req,res){
    let body=req.body;
    axios.post(baseURL+"/orders",body)
    .then(function(response){
        //console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            //console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    
    })
})