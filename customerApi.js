let express=require("express")
let app=express()
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,accept"
    );
    next();
});
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
let {customerData}=require("./customerData.js")
app.get("/customers",function(req,res){

let city=req.query.city
let gender=req.query.gender
let payment=req.query.payment
let sortBy=req.query.sortBy
let arr1=customerData
if(city){
    arr1=arr1.filter((p)=>p.city===city)
}
if(gender){
    arr1=arr1.filter((p)=>p.gender===gender)
}
if(payment){
    arr1=arr1.filter((p)=>p.payment===payment)
}
if(sortBy){
    if(sortBy==="city"){
        arr1.sort((st1,st2)=>st1.city.localeCompare(st2.city))
    }
    else if(sortBy==="age"){
        arr1.sort((a,b)=>a.age-b.age)
    }
    else if(sortBy==="payment"){
        arr1.sort((st1,st2)=>st1.payment.localeCompare(st2.payment))       
    }
}
    res.send(arr1)
})
app.post("/customers",function(req,res){
    let body=req.body
    console.log(body)
    customerData.push(body)
    res.send(customerData)
})
app.put("/customers/:id",function(req,res){
    let id=req.params.id
     let body=req.body
    let index=customerData.findIndex((p)=>{
        return p.id===id
    })
    let  updatedcustomer={id:id,...body}
    customerData[index]=updatedcustomer
    res.send(updatedcustomer)
})
app.delete("/customers/:id",function(req,res){
    let id=req.params.id
     
    let index=customerData.findIndex((p)=>{
        return p.id===id
    })
    let deleteCustomer=customerData.splice(index,1)
    
    res.send(deleteCustomer)
})