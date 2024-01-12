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
app.get("/viewPage",function(req,res){
    //let name=req.cookies.name
    let name=req.signedCookies.name
    let counter=req.signedCookies.counter
    //let counter=req.cookies.counter
    console.log(name)
    if (!name){
    res.cookie("name","Guest",{maxAge:150000,signed:true})
    res.cookie("counter",1,{maxAge:150000,signed:true})
    res.send("cookie set")
    }
    else{
        res.cookie("counter",+counter+1,{signed:true})
        res.send(`cookie received for name:${name} and counter is ${counter}`)
    }
})

app.post("/viewPage",function(req,res){
    let {name}=req.body
    let counter=req.cookies.counter
    res.cookie("name",name,{maxAge:150000,signed:true})
    res.cookie("counter",1,{maxAge:150000,signed:true})
    res.send(`Cookie set with name:${name} counter is ${counter}`)
})

app.delete("/viewPage",function(req,res){
    res.clearCookie("name")
    res.clearCookie("counter")
    res.send("Cookie deleted")
})
