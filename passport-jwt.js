let express=require("express")
const { use } = require("passport")
let passport=require("passport")
let jwt=require("jsonwebtoken")
let JWTStrategy=require("passport-jwt").Strategy
let ExtractJwt=require('passport-jwt').ExtractJwt

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
var token;
app.all('*' , (req, res, next) => {

    if (!token) {
      console.log('token: undefined');
    } else {
      req.headers.authorization =  token; 
    }
    
    next();
  });
app.use(passport.initialize())
app.listen(2410,()=>console.log("Server at 2410"))

const params={
    jwtFromRequset:ExtractJwt.fromAuthHeaderAsBearerToken(),
  //jwtfromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey:"jwtsecret23647832"
}
const jwtExpirySeconds=30
let strategyAll=new JWTStrategy(params,  function(token,done){
   
    console.log("In localstrategy",token)
    let user=users.find(u=>u.id===token.id)
   
    console.log(user)
    if(!user){
        return done(null,false,{message:"incorect username or password"})
    }
 
    else return done(null,user)
  
    
})

let strategyAdmin=new JWTStrategy( params,function(token,done){
    console.log("In localstrategy",token)
    let user=users.find(u=>u.id===token.id)
   
    console.log(user)
    if(!user){
        return done(null,false,{message:"incorect username or password"})
    }
    else if(user.role!=="admin") return done(null,false,{message:"you do not have admin role"})
    else return done(null,user)
    
})
passport.use( strategyAll)
passport.use( strategyAdmin)
app.post("/user",function(req,res){
    let {username,password}=req.body
    let user=users.find(u=>u.name===username &&u.password===password)
    if(user){
        
        let payload={id:user.id}
        let token=jwt.sign(payload,params.secretOrKey,{
            algorithm:"HS256",
            expiresIn:jwtExpirySeconds
        })
     
        res.send({token:"bearer "+token})
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