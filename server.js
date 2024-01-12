let express=require("express")
let app=express()
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,accept"
    );
    next();
});
const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))
let {studentsData}=require("./student.js")
//console.log(studentData)
app.get("/svr/test",function(req,res){
    res.send("Test Response");
})
app.post("/svr/students",function(req,res){

    let body=req.body
    console.log(body)
    let maxid=studentsData.reduce(
        (acc,curr)=>(curr.id>=acc?curr.id:acc),
        0
    )
    let newid=maxid+1
    let newStudent={id:newid,...body}
    studentsData.push(newStudent)
    res.send(newStudent)

})
app.get("/svr/students",function(req,res){
    
    let courseStr=req.query.course;
    let grade=req.query.grade
    let sort=req.query.sort
    let arr1=studentsData
if(courseStr){
let courseArr=courseStr.split(",")

     arr1=arr1.filter((st)=>courseArr.find((c1)=>c1===st.course))

}
if(grade){
    arr1=arr1.filter((s)=>s.grade===grade)
}
if(sort==="name"){
    arr1.sort((st1,st2)=>st1.name.localeCompare(st2.name))
}
if(sort==="course"){
    arr1.sort((st1,st2)=>st1.course.localeCompare(st2.course))
}
    res.send(arr1)
})
app.get("/svr/students/:id",function(req,res){
    let id=+req.params.id;
    let student=studentsData.find((st)=>{
       return  st.id===id
    });
    if(student){
        res.send(student)
    }
    else{
        res.status(404).send("No student found")
    }
    
})
app.get("/svr/students/course/:name",function(req,res){

    let name=req.params.name
    console.log(name)
    const arr1=studentsData.filter((s)=>{
        return s.course===name
    })
    res.send(arr1)
})
app.put("/svr/students/:id",function(req,res){
    let id=+req.params.id
    let body=req.body
    let index=studentsData.findIndex((p)=>{
        return p.id===id
    })
    
console.log(index)
    
    let updatedStudent={id:id,...body}
    studentsData[index]=updatedStudent
    res.send(updatedStudent)
   
})
app.delete("/svr/students/:id",function(req,res){
    let id=+req.params.id
    let index=studentsData.findIndex((p)=>{
        return p.id===id
    })
    let deleteStudent=studentsData.splice(index,1)
    res.send(deleteStudent)

})