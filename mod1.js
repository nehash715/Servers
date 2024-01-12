/*let name="Jack"
let age="25"
let techs=["JS","Node","React"]

function knowsTech(tech){
return techs.find(t=>t===tech)?true:false
}
module.exports.name=name
module.exports.age=age
module.exports.techs=techs
module.exports.knowsTech=knowsTech*/
const mobiles = 
 [{id:1, brand:"Apple",model:"iPhone11",price:55000},
{id:2, brand:"Xiaomi", model:"Poco F1",price:16000},
{id:3, brand:"Apple", model:"iPhone12",price:71000},
{id:4, brand:"Xiaomi", model:"Poco F2",price:19000},
{id:5, brand:"Xiaomi", model:"Mi 11",price:21000},
{id:6, brand:"Apple", model:"iPhoneXR",price:48500}]
const brands = ["Apple","Xiaomi"]
function getMobileByModel(){
   let a=orders.reduce((acc,curr)=>{
     acc=acc+1
     return acc
   },0)
   return a
}
const orders =  [{orderNo:134, mobileId:1, quantity:2},
    {orderNo:156, mobileId:2, quantity:1},
    {orderNo:188, mobileId:4, quantity:3},
    {orderNo:291, mobileId:2, quantity:4},
    {orderNo:322, mobileId:4, quantity:4},
    {orderNo:215, mobileId:3, quantity:1}];
//module.exports.mobiles=mobiles
//module.exports.brands=brands
module.exports.orders=orders
module.exports.getMobileByModel=getMobileByModel