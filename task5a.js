let mysql=require("mysql")
let connData={
    host:"localhost",
    user:"root",
    password:"",
    database:"testDB"
}
function showpersons(){
    let connection=mysql.createConnection(connData);
    let sql="SELECT * FROM persons";
    connection.query(sql,function(err,result){
        if(err) console.log(err)
        else console.log(result)
    })
}
function showPersonByName(name){
    let connection=mysql.createConnection(connData)
    let  sql="SELECT * FROM persons WHERE name=?"
    connection.query(sql,name,function(err,result){
        if(err) console.log(err)
        else console.log(result)
    })
}
function insertPerson(params){
    let connection=mysql.createConnection(connData)
 let sql="INSERT INTO persons(name,age) VALUES(?,?)"
    connection.query(sql,params, function(err,result){
        if(err) console.log(err)
        else console.log(result)

    })
}
function insertPersons(params){
    let connection=mysql.createConnection(connData)
    let sql="INSERT INTO persons(name,age) VALUES ?"
    connection.query(sql,[params], function(err,result){
        if(err) console.log(err)
        else console.log(result)

    })
}

function incrementage(id){
let connection=mysql.createConnection(connData)
let sql="UPDATE persons SET age=age+1 where id=?"
connection.query(sql,id,function(err,result){
    if(err) console.log(err)
    else console.log(result)
})
}
function changeage(id,newage){
    let connection=mysql.createConnection(connData)
    let sql="UPDATE persons SET age=? where id=?"
    connection.query(sql,[newage,id],function(err,result){
        if(err) console.log(err)
        else console.log(result)
    })
}
function resetData(){
    let connection=mysql.createConnection(connData);
    let sql="DELETE FROM persons"
    connection.query(sql,function(err,result){
        if(err) console.log(err)
        else {
            
            console.log(result.affectedRows)
let {persons}=require("./testData.js")
let arr= persons.map(p=>[p.name,p.age])
let sql2="INSERT INTO persons(name,age) VALUES ?"
connection.query(sql2,[arr],function(err,result){
    if(err) console.log(err)
    else console.log("successfully inserted")
})
        }
    })
}
//resetData()
showpersons()
//showPersonByName("Bob")
//insertPerson(["Neha",21])
//insertPersons([['','Tim',20],['','Amy',18],['','Annie',30]])
//incrementage(6)
//changeage(3,33)
