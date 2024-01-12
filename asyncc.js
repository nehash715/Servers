let fs=require("fs")
let readLine=require("readline-sync")
let fname="studentData.js"
let coursedata={
    course:"Node.js",
    students:[
        {name:"Jack",age:25},
        {name:"Steve",age:26},
        {name:"Anna",age:27}
    ]
}

async function write(){
    try{
        let str=JSON.stringify(coursedata)
        await fs.promises.writeFile(fname,str);
        console.log("write success")
    }
    catch(err){
        console.log(err)
    }
}

async function enrollnew(){
    let name=readLine.question("Enter name of student")
    let age=readLine.question("Enter age of student")
    let newStudent={name,age}
    try{
    let data1=await fs.promises.readFile(fname,"utf8")
    let obj=JSON.parse(data1)
    obj.students.push(newStudent)
    let data2=JSON.stringify(obj)
    await  fs.promises.writeFile(fname,data2)
    console.log("Student enroll")
    }
    catch(err){
        console.log(err)
    }
}

async function readjdon(){
    try{
        let data=await fs.promises.readFile(fname,"utf8")
        console.log("In string format",data)
        let obj=JSON.parse(data)
        console.log(obj)
    }
    catch(err){
        console.log(err)
    }
}

let option=readLine.question("Enter option 1:Write 2:ENroll 3:Read")
switch(option){
    case "1":write();break
    case "2":enrollnew();break;
    case "3":readjdon();break
}