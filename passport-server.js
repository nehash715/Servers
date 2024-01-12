let express=require("express")
const { use } = require("passport")
let passport=require("passport")
let localStrategy=require("passport-local").Strategy

let {users,orders}=require("./jwtdata")
let app=express()
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})
app.use(passport.initialize())
app.listen(2410,()=>console.log("Server at 2410"))
let strategyAll=new localStrategy(function(username,password,done){
    console.log("In localstrategy",username,password)
    let user=users.find(u=>u.name===username &&u.password===password)
    console.log(user)
    if(!user){
        return done(null,false,{message:"incorect username or password"})
    }
  
    else return done(null,user)
    
})

let strategyAdmin=new localStrategy(function(username,password,done){
    console.log("In localstrategy",username,password)
    let user=users.find(u=>u.name===username &&u.password===password)
    console.log(user)
    if(!user){
        return done(null,false,{message:"incorect username or password"})
    }
    else if(user.role!=="admin") return done(null,false,{message:"you do not have admin role"})
    else return done(null,user)
    
})
passport.use("roleAll", strategyAll)
passport.use("roleAdmin", strategyAdmin)
app.post("/user",function(req,res){
    let {username,password}=req.body
    let user=users.find(u=>u.name===username &&u.password===password)
    if(user){
        let payload={id:user.id}
        res.send(payload)
    }
    else{
        res.sendStatus(401)
    }
})

app.get("/user",passport.authenticate("roleAll",{session:false}),function(req,res){
    console.log("inget ")
    res.send(req.user)
})
app.get("/myOrders",passport.authenticate("roleAll",{session:false}),function(req,res){
    let order1=orders.filter(o=>o.userId===req.user.id)
    res.send(order1)
})

app.get("/allOrders",passport.authenticate("roleAdmin",{session:false}),function(req,res){
    console.log("In get",req.user)
    res.send(orders)
})