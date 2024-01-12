const { json } = require("express");
let fs=require("fs");
let readLine=require("readline-sync")
let fname="data.json"
let courseData={
    course:"Nodejs",
    students:[
  {name:"Jack",age:24},
{name:"Steve",age:26},
{name:"Anna",age:27}
]
}

function writeJson(){
    let str=JSON.stringify(courseData)
    fs.writeFile(fname,str,function(err,data){
        if(err) console.log(err)
    })
}
//add new stident
function updateJson(){
    let name=readLine.question("Enter name of student:")
    let age=readLine.question("enter age of student:")
    let newStudent={name:name,age:age}
    fs.readFile(fname,"utf8",function(err,data){
        if(err) console.log(err)
        else{
            let obj=JSON.parse(data)
            obj.students.push(newStudent)
            let data1=JSON.stringify(obj)
            fs.writeFile(fname,data1,function(err){
                if(err) console.log(err)
                else console.log("data updated")
            })
        }
    })
}
function readJson(){
    fs.readFile(fname,"utf8",function(err,data){
        if(err) console.log(err)
        else{
            let obj=JSON.parse(data)
            console.log(obj)
        }
    })
}
let options=readLine.question("Enter option 1:write 2:Enroll New 3:Read-")
switch(options){
    case "1":
        writeJson()
        break;
    case "2":
        updateJson()
        break;
    case "3":readJson()
    break

}