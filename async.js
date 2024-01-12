let fs=require("fs")
let fname="studentData.js"
  async function read(fname){
try{
let data=await fs.promises.readFile(fname,"utf-8")
console.log(data)
}
catch(err){
    console.log(err)
}
}

async function write(fname,txt){
    try{
        await fs.promises.writeFile(fname,txt);
        console.log("write suucess")
    }
    catch(err){
        console.log(err)
    }
}
 async function getStat(fname){
    try{
        let status=await fs.promises.stat(fname)
        console.log(status)
    }
    catch(err){
        console.log(err)
    }
}
async function accesscheck(fname){
    try{
        await fs.promises.access(fname)
        console.log("file exists")
    }
    catch(Err){
        console.log(Err)
    }
}

async function append(fname,txt){
    try{
        await fs.promises.appendFile(fname,txt)
        console.log("append success")
    }
    catch(err){
        console.log(err)
    }
}
append(fname,"hello")
//accesscheck(fname)
//getStat(fname)
//write(fname,"XYZZ")
//read(fname)