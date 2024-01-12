let fs=require("fs")
let readLine=require("readline-sync");

//let fname="abcd.txt"
let fname=readLine.question("Enter name of file to")
let txt=readLine.question("enter text to be appende file");

fs.access(fname,function(err){
    if(err){
fs.writeFile(fname,txt,function(err){
    if(err) console.log(err)
    else {
        console.log("Write successfull")
        fs.readFile(fname,"utf8",function(err1,content){
            if(err1) console.log(err1)
            else{
                console.log(content)
            }
        })
    }
})
    }
    else{
        fs.readFile(fname,"utf8",function(err,content){
            if(err) console.log(err)
            else{
                console.log("before:" ,content)
            }
        })
    }
})

fs.appendFile(fname,txt,function(err,content){
    if(err) console.log(err)
    else{
        //fs.readFile(fname,"utf8", function(err,content){
            ////if(err) console.log(err)
            //else console.log(content)

        //})
        console.log("befire:",content)
        fs.appendFile(fname,txt,function(err){
            if(err) console.log(err)
            else{
      console.log("Append successfull")
      fs.readFile(fname,"utf8",function(err,content){
        if(err) console.log(err)
        else{
            console.log("After:",content)
        }
      })
            }
        })
    }
})