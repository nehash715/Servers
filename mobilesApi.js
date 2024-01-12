const mobileData= [
    {
      RAM: ["8 GB"],
      ROM: ["256 GB", "128 GB", "64 GB"],
      name: "Pixel 3",
      brand: "Google",
      colors: ["Blue", "Black", "White"]
    },
    {
      RAM: ["6 GB", "4 GB"],
      ROM: ["128 GB", "64 GB"],
      name: "Redmi 5",
      brand: "Xiaomi",
      colors: ["Red", "Gold", "Black", "White"]
    },
    {
      RAM: ["3 GB"],
      ROM: ["32 GB"],
      name: "Redmi Y2",
      brand: "Xiaomi",
      colors: ["Rose Gold", "Gold", "Black", "White"]
    },
    {
      RAM: ["6 GB"],
      ROM: ["128 GB", "64 GB"],
      name: "Moto E5 Plus",
      brand: "Motorola",
      colors: ["Grey", "Black", "Pink"]
    },
    {
      RAM: ["6 GB"],
      ROM: ["128 GB"],
      name: "6.1",
      brand: "Nokia",
      colors: ["Grey", "Black", "Blue"]
    },
    {
      RAM: ["6 GB", "4 GB", "3 GB"],
      ROM: ["128 GB", "64 GB"],
      name: "C1",
      brand: "Realme",
      colors: ["Red", "Gold", "Black", "White", "Grey"]
    },
    {
      RAM: ["4 GB", "3 GB"],
      ROM: ["64GB", "32 GB"],
      name: "X",
      brand: "Realme",
      colors: ["Rose Gold", "Gold", "Black", "White", "Pink"]
    },
    {
      RAM: ["6 GB", "4 GB"],
      ROM: ["64 GB"],
      name: "Galaxy S10",
      brand: "Samsung",
      colors: ["Red", "Gold", "White"]
    },
    {
      RAM: ["8 GB", "6 GB"],
      ROM: ["128 GB", "64  GB"],
      name: "Z1 Pro",
      brand: "Vivo",
      colors: ["White", "Deep Blue"]
    },
    {
      RAM: ["6 GB", "4 GB", "3 GB"],
      ROM: ["256 GB", "128 GB", "64 GB"],
      name: "Poco F1",
      brand: "Xiaomi",
      colors: ["Gold", "Black", "White"]
    },
    {
      RAM: ["4 GB", "3 GB"],
      ROM: ["64GB", "32 GB"],
      name: "F207",
      brand: "Vivo",
      colors: ["Gold", "Black", "White"]
    },
    {
      RAM: ["6 GB", "4 GB"],
      ROM: ["64 GB"],
      name: "M32",
      brand: "Samsung",
      colors: ["Gold", "Rose Gold", "White"]
    },
    {
      RAM: ["8 GB", "6 GB"],
      ROM: ["128 GB", "64  GB"],
      name: "Z6 Duo",
      brand: "Vivo",
      colors: ["Black", "Deep Blue"]
    }];
   





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
//let mobileData}=require("./mobileData")
app.get("/mobiles",function(req,res){
    let arr1=mobileData
let ram=req.query.ram
let rom=req.query.rom
let color=req.query.color
let brand=req.query.brand
if(ram){
    arr1=arr1.filter((p)=>{
        return p.RAM.find((e)=>{
           return e===ram
        })
    })
}
    if(rom){
        arr1=arr1.filter((p)=>{
            return p.ROM.find((e)=>{
               return e===rom
            })
        })
    }
    if(color){
        arr1=arr1.filter((p)=>{
            return p.colors.find((e)=>{
               return e===color
            })
        })
    }
if(brand){
    arr1=arr1.filter((p)=>{
        return p.brand===brand
    })
}


    res.send(arr1);
})
app.get("/mobiles/:name",function(req,res){
    let name=req.params.name
    let mob=mobileData.find((p)=>{
        return p.name===name
    })
    if(name){
        res.send(mob)
    }
    else{
        res.status(404).send("Not found")
    }
})
app.get("/mobiles/brand/:brandname",function(req,res){
    let brandname=req.params.brandname
    let mob=mobileData.filter((p)=>{
        return p.brand===brandname
    })
    res.send(mob)
})
app.get("/mobiles/color/:colorname",function(req,res){
    let colorname=req.params.colorname
    let mob=mobileData.filter((p)=>{
        return p.colors.find((e)=>{
           return e===colorname
        })
    })
    res.send(mob)
})
app.get("/mobiles/RAM/:ramSize",function(req,res){
    let ramSize=req.params.ramSize
    let mob=mobileData.filter((p)=>{
        return p.RAM.find((e)=>{
           return e===ramSize
        })
    })
    res.send(mob)
})
app.get("/mobiles/RoM/:romSize",function(req,res){
    let romSize=req.params.romSize
    let mob=mobileData.filter((p)=>{
        return p.ROM.find((e)=>{
           return e===romSize
        })
    })
    res.send(mob)
})