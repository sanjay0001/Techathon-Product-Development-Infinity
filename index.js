const express = require("express")
var bodyParser = require('body-parser');
const mysql = require("mysql")
const path = require("path");
const bcrypt = require("bcrypt");


const app = new express()
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.json)



var con = mysql.createConnection({
    host: "localhost",
    port:"4306",
    user: "root",
    password: "",
    database:"recafe"
  });
  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  });



// API s
app.get('/',function(req,res){
    res.render('index'); 
});

app.post("/userRegister",async function (req,res){
    var name=req.body.name;
    var mail=req.body.email;
    var phoneNumber=req.body.phn;
    var password=req.body.pwrd;
    var address=req.body.adr;
    //user_details.pwrd=await bcrypt.hash(user_details.pwrd,10); 
    password=await bcrypt.hash(password,10);
    
    var sql="INSERT INTO `user`(`userName`, `address`, `phone`, `email`, `password`) VALUES ('"+name+"','"+address+"','"+phoneNumber+"','"+mail+"','"+password+"')"
    con.query(sql,function(err,result){
        if(err) throw err;
        res.send("Success"); 
    });

}) 


 
app.post("/ulogin",function(req,res){

})


app.get("/order",(req,res)=>{
    res.render("user")
})

app.get("/adminPanel",(req,res)=>{
    res.render("adminPanel")
})

app.get("/delivery",(req,res)=>{
    res.render("delivery.ejs")
})
// app.post("/login",(res,req)=>{
//     var phoneNumber=req.body.phoneNumber;
//     var password=req.body.password;
//     let getUser="select * from user where phoneNumber="+phoneNumber;
//     con.query(getUser,function(err,result){
//         if(err)
        
//     })
// })















// app.get("test",(req,res)=>{
//     let sql = "insert into recafe.items (itemName,price) values (?,?,?)"
//     con.query(sql,["Dosa",60], function (err, result) {
//     if (err) throw err;
//     console.log("Done");
//     con.query('SELECT * FROM `items` WHERE 1',function(result,qerr){
//         if(qerr) throw qerr;
//         console.log(result);
        
//       })
//     res.send("TESET");
//     console.log("HEllo");
// }
// )











// app.get("/admin",(req,res)=>{
//     res.render('admin.ejs')
// })
// app.post("/home",(req,res)=>{
//     var k = {
//         name : req.body.name
//     }
//     console.log(k)
//     if(req.body.name){
//         res.render('home',k)
//     }else{
//         res.send("Invalid name")
//     }
// })

// app.post("/insert",(req,res)=>{

//     let sql = "insert into tamilmovies.movies (name,storyline,directors,writers,productionCompany,rating,releaseDate,stars,length,genre) values (?,?,?,?,?,?,?,?,?,?)"
//     con.query(sql,[req.body.name,req.body.storyline,req.body.directors,req.body.writers,req.body.productioncompany,req.body.rating,req.body.releasedate,req.body.stars,req.body.length,req.body.genre], function (err, result) {
//       if (err) throw err;
//       console.log("Done");
//     res.redirect("/admin")
//   });

// })


var server = app.listen(8069, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })