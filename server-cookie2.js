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
let {laptops,mobiles,users}=require("./cookiedata.js")
app.get("/mobiles",function(req,res){
    let userdata=req.signedCookies.userdata;
    console.log(JSON.stringify(userdata))
    if(!userdata) userdata={user:"Guest",pages:[]}
    userdata.pages.push({url:"/mobiles",date:Date.now()});
    res.cookie("userdata",userdata,{maxAge:30000,signed:true})
    res.send(mobiles)
})
app.get("/laptops",function(req,res){
    let userdata=req.signedCookies.userdata;
    console.log(JSON.stringify(userdata))
    if(!userdata) userdata={user:"Guest",pages:[]}
    userdata.pages.push({url:"/laptops",date:Date.now()});
    res.cookie("userdata",userdata,{maxAge:30000,signed:true})
    res.send(laptops)
})
app.post("/login",function(req,res){
    let {name,password}=req.body;
    let userdata=req.signedCookies.userdata;
    let user=users.find(u=>u.name===name && u.password===password)
if(!user){
    res.status(401).send("Login Failed")
}
else{
    res.cookie("userdata",{user:name,pages:[]},
    {maxAge:30000,signed:true})
    res.send("Login success")
}
})
app.get("/logout",function(req,res){
    res.clearCookie("userdata")
    res.send("cooies cleared")
})

app.get("/users",function(req,res){
    let userdata=req.signedCookies.userdata;
    console.log(userdata)
    let {user,pages}=userdata;
    if(!userdata || user==="Guest"){
        res.status(401).send("No access.Please log in")
    }
    else{
        let u1=users.find(u=>u.name===user)
if(u1.role==="admin"){
    let names=users.map(u=>u.name)
    res.send(names)
}
else res.status(404).send("Forbidden")
    }
})





app.get("/cookieData",function(req,res){
    let userdata=req.signedCookies.userdata
    res.send(userdata)
})