let express=require("express")
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,accept"
    )
    next();
})
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
let {productData}=require("./productData.js")

app.get("/products",function(req,res){
    let category=req.query.category
    let maxprice=req.query.maxprice
    let minqty=req.query.minqty
    let maxqty=req.query.maxqty
    let arr1=productData
    if(category){
arr1=arr1.filter((s)=>s.category===category)
    }
    if(maxprice){
        arr1=arr1.filter((p)=>p.price<=maxprice)
    }
    if(minqty){
        arr1=arr1.filter((p)=>p.quantity>=minqty)
    }
    if(maxqty){
        arr1=arr1.filter((p)=>p.quantity<=maxqty)
    }
    res.send(arr1)
})
app.get("/products/:prodname",function(req,res){
    let prodname=req.params.prodname
    let products=productData.find((p)=>{
        return p.prod===prodname
    })
    if(products){
        res.send(products)
    }
    else{
        res.status(404).send("No result found")
    }
})
app.get("/products/category/:catname",function(req,res){
    let catname=req.params.catname
    let products=productData.filter((p)=>{
        return p.category===catname
    })
    if(products){
        res.send(products)
    }
    else{
        res.status(404).send("No result found")
    }
})

app.get("/products/order/:field",function(req,res){
    let field=req.params.field;
    let arr1=productData
    if(field==="price"){
   arr1.sort((a,b)=>a.price-b.price)
    }
        if(field==="quantity"){
   arr1.sort((a,b)=>a.quantity-b.quantity)
    }
        if(field==="value"){
   arr1.sort((a,b)=>a.value-b.value)
    }
    res.send(arr1)
})