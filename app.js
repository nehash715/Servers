const { Client } = require("pg");


const client = new Client(
    {//user: "postgres",
    //password: "root",
   // database: "test_db",
   // port: 5432,
    //host: "localhost",
    DB_Host:  process.env.DB_Host|| "localhost",
    DB_User: process.env.DB_User||"postgres",
    DB_Password:process.env.DB_Password||"root",
    DB_Name:process.env.DB_Name||"test_db",
    DB_Port:process.env.DB_Port|| 5432,


   ssl: { rejectUnauthorized: false },});
client.connect(function (res, error) {console.log('connected')})

let express=require("express")
let app=express()
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");

res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
)

    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,accept"
    )
    next();
    
})

app.use(express.json())
//const port=2410
var port=process.env.PORT || 2410;
app.listen(port,()=>console.log(`Node app are listening on port ${port}`))

app.get("/users", function (req, res, next) 
{
    console.log("Inside /users get api");
    
const query = `SELECT * FROM mobiles`;
client.query(query, function (err, result)

 {if (err) {
    console.log(err)
     res.status(400).send(err);}
     else{

     
 res.send(result.rows); 
 console.log(result.rows)  } 
client.end();
});
});

/*let mysql=require("mysql")
/*let connData={
    host:"localhost",
    user:"root",
    password:"",
    database:"testDB"
}
let connData={
    DB_Host:  process.env.DB_Host|| "localhost",
    DB_User: process.env.DB_User||"root",
    DB_Password:process.env.DB_Password||"",
    DB_Name:process.env.DB_Name||"testDB",
    DB_Port:process.env.DB_Port||3306,

    
}


let express=require("express")
let app=express()
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");

res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
)

    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,accept"
    )
    next();
    
})

app.use(express.json())
//const port=2410
var port=process.env.PORT || 2410;
app.listen(port,()=>console.log(`Node app are listening on port ${port}`))

app.get("/svr/mobiles",function(req,res){
    let connection=mysql.createConnection(connData)
    let sql="SELECT * FROM mobiles"
    connection.query(sql,function(err,result){
        if(err) res.status(404).send(err)
        else res.send(result)
    })
})

app.get("/svr/mobiles/:id",function(req,res){
    let id=+req.params.id
    console.log(id)
    let connection=mysql.createConnection(connData)
    let sql=`SELECT * FROM mobiles where id=${id}`
    connection.query(sql,function(err,result){
        if(err) res.status(404).send("Not found")
        else res.send(result)
    })
})
app.get("/svr/mobiles/:brand",function(req,res){
    let brand=req.params.brand
    console.log(brand)
    let connection=mysql.createConnection(connData)
    let sql=`SELECT * FROM mobiles where brand='${brand}'`
    connection.query(sql,function(err,result){
        if(err) res.status(404).send("Not found")
        else res.send(result)
    })
})

app.post("/svr/mobiles",function(req,res){
    let body=req.body
    value=[body.brand,body.model,body.price]
    let connection=mysql.createConnection(connData)
    let sql="INSERT INTO mobiles(brand, model, price) VALUES(?,?,?)"
connection.query(sql,value,function(err,result){
    if(err) res.status(404).send("Camt insertsed")
    else res.send(result)
})

})

app.put("/svr/mobiles/:id",function(req,res){
    let id=+req.params.id
    let body=req.body
    let connection=mysql.createConnection(connData)
    let sql=`UPDATE mobiles SET brand=?,model=?,price=? WHERE id=${id}`
    connection.query(sql,[body?.brand,body?.model,body?.price],function(err,result){
if(err) res.status(404).send("Not forunf")
else res.send(result)
    })
})
app.delete("/svr/mobiles/:id",function(req,res){
    let id=+req.params.id
    console.log(id)
    let connection=mysql.createConnection(connData)
    let sql=`DELETE FROM mobiles WHERE id=${id}`
    connection.query(sql,function(err,result){
        if(err)  res.status(404).send(err)
        else res.send(result)
    })
})*/