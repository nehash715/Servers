let express=require("express")
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    
    res.header("Access-Control-Allow-Credentials",true);
    next();
})


/*var token;
app.all('*' , (req, res, next) => {

    if (!token) {
      console.log('token: undefined');
    } else {
      req.headers.authorization =  token; 
    }
    
    next();
  });*/
//app.use("/myOrders",authenticateToken)
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
const cookieParser=require("cookie-parser")
//app.use(cookieParser())
//app.use(authenticateToken)
const jwt=require("jsonwebtoken")
const jwt_key="secretkey237483"
const jwtExpiryTime=300;
let {users,orders}=require("./jwtdata")
//let cookieName="jetToken"



//app.use(addHeader)
/*function authenticateToken(req,res,next){
  console.log(req.headers)
    const token=req.headers["authorization"];
   // console.log(token)
   //const token=req.cookies[cookieName]
   console.log(token)
    if(!token) res.status(401).send('Plaese login first')
    else{
        jwt.verify(token,jwt_key,function(err,data){
            if(err){
                res.send(err)
            }
            else{
                console.log(data)
                req.user=data.user
next()

            }
        })
    }
}

*/




app.post("/login",function(req,res){
let {username,password}=req.body
let user=users.find(u=>u.name==username && u.password==password)
if(user){
    const token=jwt.sign({user},jwt_key,{
        algorithm:"HS256",
        expiresIn:jwtExpiryTime,
    })
    

  // res.cookie(cookieName,token)
  // res.send("Login successfully")
    res.send(token)
}
else{
    res.status(401).send("Login failed")
}
})

app.get("/myOrders",function(req,res){
    
console.log(req.headers)
    const token=req.headers["authorization"];
    console.log(token)
    if(!token) res.status(401).send('Plaese login first')
    else{
        jwt.verify(token,jwt_key,function(err,data){
            if(err){
                res.send(err)
            }
            else{
                console.log(data)
let orders1=orders.filter(p=>p.userId==data.user.id)
res.send(orders1)
            }
        })
    }
})
/*app.get("/myOrders", function(req,res){
  let user=req.user
  console.log(user)
  let orders1=orders.filter(p=>p.userId==user?.id)
res.send(orders1)
})*/
app.get("/user",function(req,res){
  const token=req.headers["authorization"];
  console.log(token)
  if(!token) res.status(401).send('Plaese login first')
  else{
      jwt.verify(token,jwt_key,function(err,data){
          if(err){
              res.send(err)
          }
          else{
              console.log(data)
let user=users.find(p=>p.id==data.user.id)
res.send(user)
          }
      })
  }
})

app.get("/info",function(req,res){
  res.send("Hello.Welcome to tutorial")
})