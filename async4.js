let fs=require("fs")
let fname="studentData.js"
 async function write(fname,txt){
    try{
    await fs.promises.writeFile(fname,txt);
    console.log("write success")
    }
    catch(err){
        console.log(err)
    }
 }
  async function  read(fname){
    try{
      let data=  await fs.promises.readFile(fname,"utf8")
      console.log(data)
    }
    catch(Err){
        console.log(Err)
    }
  
  }
  async function add2(){
try{
    let data=  await fs.promises.readFile(fname,"utf8")
      console.log(data)
      data=+data+2
      await fs.promises.writeFile(fname,JSON.stringify( data))
}
catch(err){
    console.log(err)
}
  }
  async function add3(){
    try{
        let data=  await fs.promises.readFile(fname,"utf8")
          console.log(data)
          data=+data+3
          await fs.promises.writeFile(fname,JSON.stringify( data))
    }
    catch(err){
        console.log(err)
    }
      }
add3()
  //write(fname,"0")
  //read(fname)