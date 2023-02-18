const express=require("express");
const bodyParser=require("body-parser");
const port=3000

const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));   //to render css using express

let items=["Wake Up","Exercise","Breakfast"];
let workItems=[];
let fun=[];

app.get("/",(req,res)=>{
    let options={
        weekday:'long',
        day:'numeric',
        month:'long'
    };
    let today=new Date();
    let day=today.toLocaleDateString("en-US",options);

    res.render('list',{listTitle:day,newAdd:items}); 

});

app.post("/",(req,res)=>{
    let item=req.body.newItem;  //searches for newItem
    //console.log(req.body);
    if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work");
    }
    else if(req.body.list==="Entertainment"){
        fun.push(item);
        res.redirect("/fun");
    }
    else{
    items.push(item);
    res.redirect("/");
    }
});

app.get("/work",(req,res)=>{
    res.render('list',{listTitle:"Work Title", newAdd:workItems});
});

app.get("/fun",(req,res)=>{
    res.render('list',{listTitle:"Entertainment", newAdd:fun});
});

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})