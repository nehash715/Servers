let fs=require("fs")
let fname="customerData.js"
let wname="studentData.js"
 

/*function getStat(filename){
    fs.promises.stat(filename)
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
}

function checkAccess(filename){
    console.log("access",filename)
    fs.promises.access(filename).then(()=>console.log("exists"))
    .catch((err)=>console.log("nor exist"))
}

function readFile(filename){
    fs.promises.readFile(filename,"utf-8")
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
}
function write(filename,data){
    console.log("access",filename)
    fs.promises.writeFile(filename,data)
    .catch((err)=>console.log(err))
}
function append(filename,data)
{
    fs.promises.appendFile(filename,data)
    .catch((err)=>console.log(err))
}*/
//append(wname,"ansjd")
//write(wname,"nodeapp")
//readFile(wname)
//getStat(fname)
//checkAccess(fname)

let readLine=require("readLine-sync")
let txt=readLine.question("Enter the text to appen")
fs.promises.appendFile(wname,txt)
.then(()=>fs.promises.readFile(wname,"utf-8"))
.then((content)=>console.log(content))
.catch((err)=>console.log(err))