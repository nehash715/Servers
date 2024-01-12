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
        "Origin,X-Requested-With,Content-Type,accept"
    )
    next();
    
})

const port=2410
app.listen(port,()=>console.log(`Node app are listening on port ${port}`))
let {students}=require("./student.js")
//console.log(students)
let fs=require("fs")
let fname="students.json"
app.get("/svr/resetData",function(req,res){

    let data=JSON.stringify(students)
    console.log(data)
    fs.writeFile(fname,data,function(err){
        if(err) res.status(404).send(err)
        else res.send("Data in file is reset")
    })
})

app.get("/svr/students",function(req,res){
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err)
        else{
            let studentsArray=JSON.parse(data)
            res.send(studentsArray)
        }
        })
})
app.get("/svr/students/:id",function(req,res){
    let id=+req.params.id
    fs.readFile(fname,"utf8",function(err,data){
        if(err) console.log(err)
        else{
            //let studentsArray=JSON.stringify(data)
            
            let student=students.find((p)=>{
                return p.id==id
            })
            if(student) res.send(student)
            else res.status(404)
        }
    })
})

app.get("/svr/students/course/:name",function(req,res){
    let name=req.params.name
    fs.readFile(fname,"utf8",function(err,data){
        if(err) console.log(err)
        else{
            //let studentsArray=JSON.stringify(data)
            let student=students.filter((p)=>{
                return p.course==name
            })
            if(student) res.send(student)
            else res.status(404).res.send("Not found")
        }
    })
})

app.post("/svr/students",function(req,res){
    let body=req.body
    //console.log(body)
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err)
        else{
            let studentsArray=JSON.parse(data)
            let maxid=studentsArray.reduce((acc,curr)=>{
                return curr.id>acc?curr.id:acc
            },0)
            let newId=maxid+1
            let newStudent={id:newId,...body}
    //console.log(body)
            studentsArray.push(newStudent)
            let data1=JSON.stringify(studentsArray)
            fs.writeFile(fname,data1,function(err){
                if(err) res.status(404).send(err)
                else res.send(newStudent)
            })
        }
    })
})



app.put("/svr/students/:id",function(req,res){
    let body=req.body
    let id=+req.params.id
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err)
        else{
            let studentsArray=JSON.parse(data)
            
            let index=studentsArray.findIndex((s)=>s.id===id)

           if(index>=0){
            let updatedStudent={...studentsArray[index],...body}
            studentsArray[index]=updatedStudent
            let data1=JSON.stringify(studentsArray)
            fs.writeFile(fname,data1,function(err){
                if(err) res.status(404).send(err)
                else res.send(updatedStudent)
            })
           }
           else{
            res.status(404).send("Not found")
           }
        }
    })
})
app.delete("/svr/students/:id",function(req,res){
    
    let id=+req.params.id
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err)
        else{
            let studentsArray=JSON.parse(data)
            
            let index=studentsArray.findIndex((s)=>s.id===id)

           if(index>=0){
            let deltedStudent=studentsArray.splice(index,1)
            let data1=JSON.stringify(studentsArray)
            fs.writeFile(fname,data1,function(err){
                if(err) res.status(404).send(err)
                else res.send(deltedStudent)
            })
           }
           else{
            res.status(404).send("Not found")
           }
        }
    })
})


