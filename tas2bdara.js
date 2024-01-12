let {json}=require("express")
let fs=require("fs")
let readLine=require("readline-sync")
let fname="task2b.json"
let j={A:'0',B:'0'}
let option=readLine.question("1:Create/Reset 2:Read 3:IncrementA 4:IncrementB")
function writeJson(){
    let str=JSON.stringify(j)
    fs.writeFile(fname,str,function(err){
        if(err) console.log(err)
    })
}
function IncrementA(){
    let a=+j.A
    a=a+1
    j.A=a
    let str=JSON.stringify(j)
    fs.writeFile(fname,str,function(err){
        if(err)console.log(err)
    })
}
function IncrementB(){
    j.B++;
    fs.writeFile(fname,j,function(err){
        if(err)console.log(err)
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
switch(option){
    case "1":
        writeJson()
        break;
    case "2":
        readJson()
        break;
    case "3":IncrementA()
    break
    case "4":IncrementB()
    break;

}