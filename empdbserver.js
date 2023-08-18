var exp=require('express');
var app=exp();
var mysql=require('mysql2');
var bp=require('body-parser');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"test"
})

con.connect(function(err){
    if(!err){
        console.log("database connected");
        
    }
    else{
        console.log("database connection failed");
    }
})

app.listen(9000, function(){console.log("server 9000 started")});

app.use(exp.static('scripts'));

app.use(bp.urlencoded({extended:false}));

app.get('/empform',function(req,res){
    res.sendFile(__dirname+"/empdbjson.html");
});

app.post('/getemps',function(req,res){
    var dno=req.body.deptno;
    
    con.query("select * from emp where deptno="+dno, function(err,result){
        if(!err){
            res.send(JSON.stringify(result));
        }
    })
})

app.post('/getuser',function(req,res){
    var uid=req.body.userid;
    console.log(uid);
    con.query("select ename,job from emp where userid='"+uid+"'", function(err,result){
        if(!err){
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result[0]));
            
        }
    })
})

