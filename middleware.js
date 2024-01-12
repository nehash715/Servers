const { Client } = require("pg");


const client = new Client(
    {user: "postgres",
    password: "root",
    database: "test_db",
    port: 5432,
    host: "localhost",

   //ssl: { rejectUnauthorized: false },
});
client.connect(function (res, error) {console.log('connected')})

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
app.use(sayHello)
app.use(sayBye)
app.use(showURLMethod)
app.use( "/orders",showBody)
app.use(insertUser)
app.use( allrequest)
app.use(allrequestDB)
let port=2410;
app.listen(port,()=>console.log(`Node app listtening on port ${port}`));

function sayHello(req,res,next){
console.log("Hello New Requset Received")
next()
}
function sayBye(req,res,next){
    console.log("Bye :Middleware over")
    next()
}

function showURLMethod(req,res,next){
    console.log(`url:${req.url} Method ${req.method}`)
    next()
}
function showBody(req,res,next){
    console.log(`Body is ${JSON.stringify(req.body)}`)
    next()
}
let arr=[]
function allrequest(req,res,next){
    let json={url:req.url,method:req.method}
    arr.push(json)
    console.log(arr)
next()
}

function insertUser(req,res,next){
    req.user={name:"Temp",role:"Guest"}
next()
}

function allrequestDB(req,res,next){
    const user=req.body
    let insertQuery=`insert into allrequset(url,method) values('${req.url}','${req.method}');`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            console.log(result)
            //res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
   next()
}
app.get("/allRequest",function(req,res){
   // let arr=[]
//arr.push({url:req.url,method:req.method})

res.send(arr)
   
})
app.get("/allRequestDB",function(req,res){
    const query = `select * from allrequset;`;
client.query(query, function (err, result)

 {if (err) {
    console.log(err)
     res.status(400).send(err);}
     else{

     
 res.send(result.rows); 
 //console.log(result.rows) 
 } 
//client.end();
});
})

app.get("/products",function(req,res){
    console.log("in the rote :GET /products")
    res.send({route:"/products",user:req.user})
})
app.get("/orders",function(req,res){
    console.log("in the rote :GET /orders")
    res.send({route:"/orders",user:req.user})
})
app.post("/orders",function(req,res){
    
    console.log("in the rote :POST /orders")
    res.send({route:"/orders",data:req.body,user:req.user})
})
