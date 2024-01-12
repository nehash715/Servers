/*let mysql=require("mysql")
let connData={
    host:"localhost",
    user:"root",
    password:"",
    database:"testDB"
}*/
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
const port=2410
app.listen(port,()=>console.log(`Node app are listening on port ${port}`))

app.get("/mobiles", function (req, res, next) 
{
    console.log("Inside /users get api");
    
const query = `SELECT * FROM mobiles;`;
client.query(query, function (err, result)

 {if (err) {
    console.log(err)
     res.status(400).send(err);}
     else{

     
 res.send(result.rows); 
 //console.log(result.rows)  
} 
//client.end()
});
});


app.get("/mobiles/:brand", function (req, res, next) 
{
    let brand=req.params.brand
    console.log("Inside /users get api");
    
const query = ` SELECT * FROM mobiles WHERE  brand='${brand}';`;
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
});




app.post('/mobiles', (req, res)=> {
    const user = req.body;
    let insertQuery = `INSERT INTO mobiles(brand, model, price) VALUES('${user.brand}', '${user.model}', '${user.price}');`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            console.log(result)
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    
})

app.put('/mobiles/:model', (req, res)=> {
    let model=req.params.model
    let user = req.body;
    console.log(user)
    let updateQuery = `UPDATE mobiles SET brand = '${user.brand}',
                       model = '${user.model}',
                       price = '${user.price}'
                       WHERE model = '${model}';`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    
})



app.delete('/mobiles/:model', (req, res)=> {
    let insertQuery = `delete from mobiles where model='${req.params.model}'`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
})

/*







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