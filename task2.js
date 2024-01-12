let fs=require("fs")
let readLine=require("readline-sync");
const { compileFunction } = require("vm");

let option1=readLine.question("Enter option 1")
let option2=readLine.question("Enter opton 2")
let option3=readLine.question("Enter opton 3")
let option4=readLine.question("Enter opton 4")
let number=readLine.question("enter the option")

let filename="abcd.txt"
 
function writeFile(filename,data){
    console.log("writeFile:",filename)
    fs.writeFile(filename,data,function(err,data){
        if(err) console.log(err)
    })
}
function readFile(filename){
    console.log('readFile:',filename)
    fs.readFile(filename,"utf8",function(err,data){
        if(err) console.log(err)
        else console.log(data)
    })
}
function increment(filename){
    fs.readFile(filename,"utf8",function(err,data){
        if(err) console.log(err)
        else {
            console.log(data)
            data=+data+1
            let d=`${data}`
            
            fs.writeFile(filename,d,function(err,data){
                if(err) console.log(err)
            })
        }
    })

}
function decrement(filename){
    fs.readFile(filename,"utf8",function(err,data){
        if(err) console.log(err)
        else {
            console.log(data)
            data=+data-1
            let d=`${data}`
            
            fs.writeFile(filename,d,function(err,data){
                if(err) console.log(err)
            })
        }
    })

}
if(number==1){
    writeFile(filename,'0')
}
else if(number==2){
    readFile(filename)
}
else if(number==3){
increment(filename)
}
else if(number==4){
decrement(filename)
}