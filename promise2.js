let fs=require("fs")
let readLine=require("readline-sync")
let fname="studentData.js"
let number=readLine.question("enter the option")
function write(data){
   fs.promises.writeFile(fname,data)
   .then(()=>console.log("Write success"))
   .catch((err)=>console.log(err));

  
}

function read(){
    fs.promises.readFile(fname,"utf-8")
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
}
/*function add2(){
    fs.promises.readFile(fname,"utf-8")
    .then((data)=>{
        console.log("i", data)
        data= `${+data+2}`
        console.log("f", data)
       
    }
    )
    .then((d)=>{
        fs.promises.writeFile(fname,d)
        .then(()=>console.log("Write success"))
        .catch((err)=>console.log(err));
     
    })
    .catch((err)=>console.log(err))
}*/

function add2(){
    fs.promises.readFile(fname, 'utf8') 
        .then(data => { 
            data= `${+data+2}`
            console.log(data)
               // json.myArr.push({name: "Krishnan", salary: 5678});

                fs.promises.writeFile(fname, data)
                        .then(  () => { console.log('Append Success'); })
                        .catch(err => { console.log("Append Failed: " + err);});
            })
        .catch(err => { console.log("Read Error: " +err);});
}

function add3(){
    fs.promises.readFile(fname, 'utf8') 
        .then(data => { 
            data= `${+data+3}`
            console.log(data)
               // json.myArr.push({name: "Krishnan", salary: 5678});

                fs.promises.writeFile(fname, data)
                        .then(  () => { console.log('Append Success'); })
                        .catch(err => { console.log("Append Failed: " + err);});
            })
        .catch(err => { console.log("Read Error: " +err);});
}

if(number==1){
    write('0')
}
else if(number==2){
    read()
}
else if(number==3){
    add2()
}
else{
    add3()
}