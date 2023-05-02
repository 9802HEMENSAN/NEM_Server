const express=require("express");
const { PostModel } = require("../models/post.model");

const PostRoute=express.Router()

// Post
PostRoute.post("/create",async (req,res)=> {
    try {
         const new_post = PostModel(req.body)
         await new_post.save();
         res.send({"msg" : "New Post Created !"})

    } catch (error) {
        console.log("error")
        res.send(error)

    }
})
// Get 
PostRoute.get("/",async(req,res)=>{
    try {
      let posts=  await PostModel.find({ authorId : req.body.authorId});
       res.send(posts)
    } catch (error) {
         res.send(error)
    }
})
PostRoute.get("/:id",async(req,res)=>{
    const {id}=req.params
    try {
      let posts=  await PostModel.find({_id : id });
       res.send(posts)
    } catch (error) {
         res.send(error)
    }
})

//Updated Successfully 
PostRoute.patch("/update/:id",async(req,res)=>{
    try {
       const {id}=req.params;
       const {authorId}=req.body;

    const post =await PostModel.findOne({_id : id ,authorId})
        
        if(!post){
            return res.status(404).json({ error: "Post not found" });
        } else{
            await PostModel.findByIdAndUpdate(id,req.body)
            res.send({"msg" : "Post Updated"})
        }

    } catch (error) {
         res.send(error)
    }
})
// Delete Route
PostRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {authorId}=req.body;

        const post= await PostModel.findOne({ _id : id , authorId})

        if(!post){
            res.status(400).json({"msg" : "Post Not found"});
        } 
           await PostModel.findByIdAndDelete(id);
           res.status(200).json({"msg" : "Post deleted Successfully "})
      
         
    } catch (error) {
         res.send(error)
    }
})

module.exports={
    PostRoute
}