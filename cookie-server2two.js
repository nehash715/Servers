let arr=[
    {empCode:1451,name:"Jack",department:"Finance",designation:"Manager",salary:52500,gender:"Male"},
    {empCode:1029,name:"Steve",department:"Technology",designation:"Manager",salary:71000,gender:"Male"},
    {empCode:1891,name:"Anna",department:"HR",designation:"Manager",salary:55100,gender:"Female"},
    {empCode:1322,name:"Kathy",department:"Operations",designation:"Manager",salary:49200,gender:"Female"},
    {empCode:1367,name:"Bob",department:"Marketing",designation:"Manager",salary:39000,gender:"Male"},
    {empCode:1561,name:"George",department:"Finance",designation:"Trainee",salary:22500,gender:"Male"},
    {empCode:1777,name:"Harry",department:"Technology",designation:"Trainee",salary:31000,gender:"Male"},
    {empCode:1606,name:"Julia",department:"HR",designation:"Manager",Trainee:25100,gender:"Female"},
    {empCode:1509,name:"Kristina",department:"Operations",designation:"Trainee",salary:19200,gender:"Female"},
    {empCode:1533,name:"William",department:"Marketing",designation:"Trainee",salary:16200,gender:"Male"},
    {empCode:1161,name:"Stephen",department:"Finance",designation:"VP",salary:82500,gender:"Male"},
    {empCode:1377,name:"Winston",department:"Technology",designation:"VP",salary:91000,gender:"Male"},
    {empCode:1206,name:"Victoria",department:"HR",designation:"Manager",VP:65100,gender:"Female"},
    {empCode:1809,name:"Pamela",department:"Operations",designation:"VP",salary:78600,gender:"Female"},
    {empCode:1033,name:"Tim",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    {empCode:1787,name:"Peter",department:"Technology",designation:"Manager",salary:47400,gender:"Male"},
    {empCode:1276,name:"Barbara",department:"Technology",designation:"Trainee",salary:21800,gender:"Female"},
    {empCode:1859,name:"Donna",department:"Operations",designation:"Trainee",salary:21900,gender:"Female"},
    {empCode:1874,name:"Igor",department:"Operations",designation:"Manager",salary:48300,gender:"Male"},
    ]

    let express=require("express")
let app=express();
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
let port=2410;
app.listen(port,()=>console.log(`Node app listtening on port ${port}`));

const cookieParser=require("cookie-parser")
app.use(cookieParser("abcdef-3477819"))


app.post("/login",function(req,res){
   

    let {empCode,name}=req.body;
    let e=+empCode
    //console.log(req.body)
   // console.log(e)
   // let userdata=req.signedCookies.userdata;
    let user=arr.find((p)=>{
        //console.log(p.empCode===e && p.name===name)
        return p.empCode===e && p.name===name
    })
  //  console.log(user)
 
if(!user){
    res.cookie("tracker", {user:"Guest",url:req.url,date:Date.now()})
    res.status(401).send("Login Failed")
}
else{
    res.cookie("empCode",empCode)
    res.cookie("tracker", {user:user.name,url:req.url,date:Date.now()})
    res.send("Login success")
}
})
app.get("/logout",function(req,res){
    res.clearCookie("empCode")
    res.send("cooies cleared")
})
app.get("/myDetails",function(req,res){
   // let empCode=req.signedCookies.empCode;
    let e=req.cookies.empCode
    console.log(e)
    if(!e){
        res.status(401).send("No access.Please Login")
    }
    else{
        let user=arr.find((p)=>{
            return p.empCode==e
        })
        res.send(user)
    }
})
app.get("/company",function(req,res){
   res.send("Welcome to the Employee Portal of XYZ Company")
})
app.get("/myJunior",function(req,res){
    let e=req.cookies.empCode
    let user=arr.find((p)=>{
        return p.empCode==e
    })
    if(user.designation==="VP"){
        let ans=arr.filter((p)=>{
            return p.designation==="Manager"||p.designation==="Trainee"
        })
        res.send(ans)
    }
    else if(user.designation=="Manager"){
        let ans=arr.filter((p)=>{
            return p.designation==="Trainee"
        })
        res.send(ans)
    }
    else{
res.send("No juniors of trianee")
    }
})


app.get("/tracker",function(req,res){
    let e=req.cookies.empCode
    console.log(e)
    if(!e){
       res.cookie("tracker", {user:"Guest",url:req.url,date:Date.now()})
    
    }
    else{
        let user=arr.find((p)=>{
            return p.empCode==e
        })
       res.cookie("tracker", {user:user.name,url:req.url,date:Date.now()})
    }
})