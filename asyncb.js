let fs=require("fs")
let readLine=require("readline-sync")
let txt=readLine.question("Enter txt")
/*let fname="studentData.js"
 async function exer(fname,data){
    try{
        await fs.promises.appendFile(fname,data)
        let data1=await fs.promises.readFile(fname,"utf8")
        console.log(data1)
    }
    catch(err){
console.log(err)
    }
 }

 exer(fname,txt)*/

 let fname=readLine.question("Enter the name of file")

 async function exer(fname,data){
    try{
        await fs.promises.access(fname)
        try{
        let data1=await fs.promises.readFile(fname,"utf8")

        console.log("before",data1)
        await fs.promises.appendFile(fname,data)
        console.log("Appned sucess")
        let data2=await fs.promises.readFile(fname,"utf8")
        console.log("after",data2)
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
await fs.promises.writeFile(fname,data)
console.log("write success")
let data3=await fs.readFile(fname,"utf8")
console.log(data3)
    }
 }

 exer(fname,txt)