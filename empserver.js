var exp=require('express');
var app=exp();
var mysql=require('mysql2');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"test"
})

con.connect(function(err){
    if(!err)
        console.log("Database connected");
    else
        console.log("DB connection failed");
})

app.listen(8000,function(){console.log("server 8000 started")});

app.use(exp.static('scripts'));

app.get('/empform',function(req,res){
    res.sendFile(__dirname+"/empform.html");
})

app.get('/empdetailform',function(req,res){
    res.sendFile(__dirname+"/newempform.html");
})

app.get('/welcome',function(req,res){
    var eid=req.query.empid;
    str="";

    con.query("select * from emp where empno="+eid, function(err,result){
        if(!err)
        {
            str+="<h1>Welcome "+result[0].ENAME+"</h1>";
            res.send(str);
        }
    })
})

app.get('/getemp',function(req,res){
    var eid=req.query.empid;
    str="<table border='1' style='border-collapse:collapse'>";
    str+="<tr><th>Empno</th><th>Ename</th><th>Job</th><th>Manager</th><th>HireDate</th><th>Salary</th></tr>";

    con.query("select * from emp where empno="+eid,function(err,result){
        if(!err){
        result.forEach(function(v){
            str+="<tr><td>"+v.EMPNO+"</td><td>"+v.ENAME+"</td><td>"+v.JOB+"</td><td>"+v.MGR+"</td><td>"+v.HIREDATE+"</td><td>"+v.SAL+"</td></tr>";
          
        })
        str+="</table>";
        res.send(str);
        
    }
    else{
            res.send("empid not found");
    }

    })
})

