let arr=[
    {id: "DFI61", name:"Vishal", city:"Delhi", age:27, gender:"Male", payment:"Credit Card"},
    {id: "JUW88", name:"Amit", city:"Noida", age:49, gender:"Male", payment:"Debit Card"},
    {id: "KPW09", name:"Pradeep", city:"Gurgaon", age:21, gender:"Male", payment:"Wallet"},
    {id: "ABR12", name:"Rohit", city:"Jaipur", age:34, gender:"Male", payment:" Debit Card"},
    {id: "BR451", name:"Preeti", city:"Delhi", age:29, gender:"Female", payment:"Credit Card"},
    {id: "MKR52", name:"Neha", city:"Noida", age:42, gender:" Female ", payment:"Debit Card"},
    {id: "BTT66", name:"Swati", city:"Gurgaon", age:24, gender:" Female ", payment:"Wallet"},
    {id: "CDP09", name:"Meghna", city:"Jaipur", age:38, gender:" Female ", payment:" Debit Card"},
    {id: "KK562", name:"Irfan", city:"Delhi", age:25, gender:"Male", payment:"Credit Card"},
    {id: "LPR34", name:"Gagan", city:"Noida", age:51, gender:" Female ", payment:"Debit Card"},
    {id: "MQC11", name:"John", city:"Gurgaon", age:24, gender:"Male", payment:"Wallet"},
    {id: "AXY22", name:"Gurmeet", city:"Jaipur", age:31, gender:"Male", payment:" Debit Card"}
   ]
   let fs=require("fs")
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
let fname="pro2data.js"
app.get("/customer",function(req,res){
res.send(arr)

    fs.promises.writeFile(fname,JSON.stringify(arr))
    .then(()=>console.log("write success"))
    
    .catch((err)=>console.log(err))

})

app.post("/customer",function(req,res){
    let b=req.body
    let json={id:b.id,name:b.name,city:b.city,age:b.age,gender:b.gender,payment:b.payment}
    arr.push(json)
res.send(b)
    fs.promises.readFile(fname,"utf-8")
    .then((data)=>{
        let j=JSON.parse(data)
          j.push(json)
    
    fs.promises.writeFile(fname,JSON.stringify(j))
    .then(()=>console.log("Append"))
    .catch((err)=>console.log(err))
})
.catch((err)=>console.log("read ree"))



})


app.put("/customer/:id",function(req,res){
    let id=req.params.id
    let c=arr.findIndex((p)=>{
        return p.id==id
    })
    let body=req.body
    arr[c]=body
    res.send(body)

    fs.promises.readFile(fname,"utf-8")
    .then((data)=>{
       console.log(data)
       let json=JSON.parse(data)
       json[c]=body

       fs.promises.writeFile(fname,JSON.stringify(json))
       .then(()=>console.log("append"))
       .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log("reda",err))


})

app.delete("/customer/:id",function(req,res){
    let id=req.params.id
    let c=arr.findIndex((p)=>{
        return p.id==id
    })
    let body=req.body
    arr.splice(c,1)
    res.send("Deleted")

    fs.promises.readFile(fname,"utf-8")
    .then((data)=>{
       console.log(data)
       let json=JSON.parse(data)
       json.splice(c,1)

       fs.promises.writeFile(fname,JSON.stringify(json))
       .then(()=>console.log("append"))
       .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log("reda",err))


})