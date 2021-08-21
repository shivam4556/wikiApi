const express = require("express");
const app = express();
const mongoose  =require('mongoose');
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser : true, useUnifiedTopology :true}, function(err){
    if(!err)
        console.log("Conneced to Server!");
})


const articleSchema = new mongoose.Schema({
    title : String,
    content : String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles",function(req,res){
    res.send("Articles Route \n");
})
.get(function(req,res){
    Article.find({},function(err, obj){
        if(!err){
            res.render("home", {articles : obj});
        }
    })
})
.post( function(req,res){
    const newTitle = req.body.title;
    const newContent = req.body.content;
    let newArticle = new Article({
        title : newTitle,
        content : newContent
    })
    newArticle.save(function(err){
        if(!err)
            res.send("Saved Successfully");
        else    
            res.send(err);
    })
})
.delete(function(req,res){
    Article.deleteMany({},function(err){
        if(!err)
            res.send("Deleted all successfully1");
        else
            res.send(err);
    })
});



///////////// Specific Article //////////////////

app.route("/articles/:articleTitle",function(req,res){

})
.get(function(req,res){
    Article.findOne({title : req.params.articleTitle}, function(err, obj){
        if(!err && !obj)
            res.send(obj);
        else
            res.send(err);
    })
})
.put(function(req,res){
    Article.updateOne({title : req.params.articleTitle},{title : req.body.title, content : req.body.content}, function(err,obj){
        if(!err)
            {
                res.send("Updated Record Successfully.");
            }
        else 
            res.send(err);
    })
})
.patch(function(req,res){

})
.delete(function(req,res){
    Article.deleteOne({title : req.params.articleTitle}, function(err,obj){
        if(!err && !obj){
            console.log("Deleted successfully\n");
            res.send(obj);
        }
        else  
            res.send(err);   
    })
})
app.listen("3000", function(){
    console.log("Server is listening to Port : 3000");
})
