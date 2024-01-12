let fs=require("fs")
let readLine=require("readline-sync")

let arr=[{x:2,y:3}, {x:-4,y:10}, {x:0,y:0}, {x:6,y:-1}]
let fname="studentData.js"
let number=readLine.question("enter the option")
async function write(data){
try{
 await  fs.promises.writeFile(fname,data)
 console.log("write sccess")
}
   catch(err){
    console.log(err)};

  
}

 async function read(){
    try{
       let data=await fs.promises.readFile(fname,"utf-8")
       console.log(data)
    }
   
catch(Err){
    console.log(Err)
  }

}
function point(){
    let x1=readLine.question("enter the value of x")
    let y1=readLine.question("enter the value of y")
    fs.promises.readFile(fname, 'utf8') 
        .then(data => { 
                let json= JSON.parse(data);
                console.log(json)
                json.push({x: x1, y: y1});

                fs.promises.writeFile(fname, JSON.stringify(json))
                        .then(  () => { console.log('Append Success'); })
                        .catch(err => { console.log("Append Failed: " + err);});
            })
        .catch(err => { console.log("Read Error: " +err);});
}



if(number==1){
    write(JSON.stringify( arr))
}
else if(number==2){
    read()
}
else if(number==3){
    point()
}
