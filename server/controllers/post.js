import { Express } from "express";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";

export const createPost = async(req, res)=>{
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.locationg,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        
        const post = await Post.find();
        res.status(201).json(post);

    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

export const getFeedPost = async(req, res)=>{
    try {
        const post = await Post.find();
        res.status(201).json(post);
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export const getUserPosts = async(req, res)=>{
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(Post);
    } catch (error) {
        console.log(first)
    }
}


// UPDATE
export const likePost = async(req, res)=>{
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.find();
        const isLiked = post.likes.get(userId);
        console.log(isLiked, "is liked 😊" );

        if(isLiked){
          post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {
            likes: post.likes
        }, {new: true})


        res.status(200).json(post);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
