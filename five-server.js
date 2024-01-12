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
let app=express()
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


var token;
app.all('*' , (req, res, next) => {

    if (!token) {
      console.log('token: undefined');
    } else {
      req.headers.authorization =  token; 
    }
    
    next();
  });
//app.use("/myOrders",authenticateToken)
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
const cookieParser=require("cookie-parser")
app.use(cookieParser())
//app.use(authenticateToken)
const jwt=require("jsonwebtoken")
const jwt_key="secretkey237483"
const jwtExpiryTime='1h';
let {users,orders}=require("./jwtdata")
let cookieName="jwtToken"



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


let arr2=[]
app.post("/login",function(req,res){
  
let {empCode,name}=req.body
let user=arr.find(u=>u.name==name && u.empCode==empCode)
if(user){
    const accessToken=jwt.sign({user},jwt_key,{
        algorithm:"HS256",
        expiresIn:jwtExpiryTime,
    })
    token=accessToken
    let user1=arr.find(p=>p.empCode==empCode)
let json={user:user1.name,url:req.url}
arr2.push(json)
console.log(arr2)
res.cookie("tracker",arr2)
   res.cookie(cookieName,token)
  // res.send("Login successfully")
    res.send(token)
}
else{
    res.status(401).send("Login failed")
}
})

app.get("/myDetails",function(req,res){
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
let user1=arr.find(p=>p.empCode==data.user.empCode)
res.send(user1)
            }
        })
    }
})


app.get("/myJuniors",function(req,res){
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
let user1=arr.find(p=>p.empCode==data.user.empCode)
let ans;
if(user1.designation==="VP"){
ans=arr.filter((p)=>{
    return p.designation==="Manager" || p.designation==="Trainee"
})

}
else if(user1.designation==="Manager"){
    ans=arr.filter((p)=>{
        return p.designation==="Trainee"
    })
    
}
else {
    ans=[]
}
res.send(ans)
            }
        })
    }
})


/*app.get("/myOrders",function(req,res){
    
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
/*app.get("/user",function(req,res){
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
})*/

app.get("/company",function(req,res){
  res.send("Welcome to the Portal of XYZ Company")
})

app.get("/tracker")
