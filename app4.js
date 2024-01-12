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
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    next();
});
//const port=2410;
var port=process.env.PORT || 2410;
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
    let token=req.header("authorization") || "dummyvalue"
    axios.get(baseURL+"/students",{headers:{authorization:token}})
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
    let token=req.header("authorization") || "dummyvalue"
    axios.get(`${baseURL}/students/${id}`,{headers:{authorization:token}})
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
    let token=req.header("authorization") || "dummyvalue"
    axios.get(`${baseURL}/students/course/${name}`,{headers:{authorization:token}})
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
    let token=req.header("authorization") || "dummyvalue"
    let body=req.body;
    axios.post(baseURL+"/students",body,{headers:{authorization:token}})
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
    let token=req.header("authorization") || "dummyvalue"
    let body=req.body;
    axios.put(`${baseURL}/students/${id}`,body,{headers:{authorization:token}})
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
    let token=req.header("authorization") || "dummyvalue"
    
    axios.delete(`${baseURL}/students/${id}`,{headers:{authorization:token}})
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
