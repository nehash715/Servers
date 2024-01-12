let express=require("express")
let cors = require('cors')
let app=express()

//app.use(cors())
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
  });
app.use(cors())
//app.use(express.json());
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
let baseURL="https://repo-8qu2.onrender.com/messageServer/"
let axios=require("axios")

app.post("/myserver2/login",function(req,res){
    let body=req.body
    axios.post(baseURL+"/login",body)
    .then(response=>{
        console.log(response.data)
        res.send(""+ response.data)
    }).catch(error=>{
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})

app.get("/myserver2/messages",function(req,res){
    let token=req.header("authorization") || "dummyvalue"
    axios
    .get(baseURL +"/messages",{headers:{authorization:token}})
    .then(function(response){
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})

app.post("/myserver2/messages",function(req,res){
    let token=req.header("authorization") ;
    if(!token) res.status(401).send("No token found.")
    else{
let body=req.body
    
    axios
    .post(baseURL +"/messages",body, {headers:{authorization:token}})
    .then(function(response){
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
}
})