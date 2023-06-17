const express=require("express");
const body=require("body-parser");
var router = express.Router();

// const Server = require("mysql2/typings/mysql/lib/Server");
const app=express();
//ENCODED
app.use(body.urlencoded({ extended: false }))
app.use(body.json())
//USE FOR CSS FILES
app.use(express.static(__dirname))
//SET FOR EJS FILES  
app.set('view engine', 'ejs');
app.set('views',__dirname)
// var name=null,pass=null,age=null;   
app.get("/",function(req,res)
{
     res.sendFile(__dirname+"/sample.html");
})
app.get("/",function(req,res)
{
     res.redirect("/student_details.html");
})
//DATABASE CONNECTIONr
const mysql=require("mysql2");
var con=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"details"
    });
    app.post('/yt',function(req,res){
     // res.send("view")
     con.connect(function(error)
     {
         if(error)throw error;
         const val=req.body;
         console.log(val);
         var sql="insert into form set ? "
         console.log("connect");
         con.query(sql,val,function(error,result)
         {
           if(error)throw error
          //  res.render("view");
          res.send("data was saved successfully")
          })
     });
})
app.get('/output',function(req,res){
     sql="select * from form"
     con.query(sql,function(err,data){
          if(err)throw err
          console.log(data.length)
          // console.log(data);
          res.render('view',{data:data})
     })})
app.get('/project',function(req,res){
     sql="select * from form"
     con.query(sql,function(err,data){
          if(err)throw err
          console.log(data.length)
          // console.log(data);
          res.render('out',{data:data})
          })})
app.get('/edit/:Fullname',function(req,res){
     const val=req.params.Fullname
     sql="select * from form where Fullname=?"
     con.query(sql,val,function(err,data)
     {
          // console.log(data);
          console.log(data);
     res.render('edit',{data:data}) 
     })
     })
app.post('/up',function(req,res){
          console.log("jog");
           var n=req.body.name;
          //  const ft=JSON.stringify(n)
          // const name=req.body.name;
          const age=req.body.age;
          const dob=req.body.dob;
          const father_name=req.body.father_name;
          const mother_name=req.body.mother_name;
          const phone_number=req.body.phone_number;
          const percent10=req.body.percent10;
          const percent12=req.body.percent12;
          const college_name=req.body.college_name;
          const department=req.body.department;
          const year=req.body.year;
          const cgpa=req.body.cgpa;
          const languages=req.body.languages;
          const project_title=req.body.project_title;
          const project_links=req.body.project_links;
          const val={age,dob,father_name,mother_name,phone_number,percent10,percent12,college_name,department,year,cgpa,languages,project_title,project_links}
          // res.send(ft)
          // console.log(val);
          var sql="update form set ? where Fullname=?"
          // console.log("connect");
          con.query(sql,[val,n],function(error,result)
          {
            if(error)throw error
          //   res.render('view',{data:result});
          // res.send("resaved succesfully");
          res.redirect('/output');
          }) 
     })
     console.log("exc");
app.listen(8087,function(err)
{
     if(err)throw err
     console.log("connet");
});