let express=require("express")
let app=express()
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"

    )
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,accept"
    );
    next();
});
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
let baseURL="https://repo-8qu2.onrender.com/studentServer/"
let axios=require("axios");

app.get("/testServer/getToken",function(req,res){
    axios.get(baseURL+"/getToken")
    .then(response=>{
        console.log(response.data)
        res.send(""+response.data)
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


app.get("/testServer/students",function(req,res){
  
    axios.get(baseURL+"/students",)
    .then(response=>{
        console.log(response.data)
        res.send(response.data)
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

app.get("/testServer/students/:id",function(req,res){
    let {id}=req.params
 
    axios.get(`${baseURL}/students/${id}`)
    .then(response=>{
        console.log(response.data)
        res.send(response.data)
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

app.get("/testServer/students/course/:name",function(req,res){
    let {name}=req.params
   
    axios.get(`${baseURL}/students/course/${name}`)
    .then(response=>{
        console.log(response.data)
        res.send(response.data)
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


app.post("/testServer/students",function(req,res){
    
    let body=req.body;
    axios.post(baseURL+"/students",body)
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

app.put("/testServer/students/:id",function(req,res){
    let {id}=req.params
 
    let body=req.body;
    axios.put(`${baseURL}/students/${id}`,body)
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


app.delete("/testServer/students/:id",function(req,res){
    let {id}=req.params
 
    
    axios.delete(`${baseURL}/students/${id}`)
    .then(function(response){
        console.log(response.data)
        res.send("deleted")
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
