const router = require("express").Router();
const Post = require("../models/Post");

// 投稿を作成する
router.post("/", async(req, res) => {
    const newPost  = new Post(req, res);
    try{
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    }catch(err){
        return res.status(500).json(err);
    }
});

// 投稿を更新する
router.put("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿の編集に成功しました!");
        }else{
            return res.status(403).json("あなたは他人の投稿を編集できません");
        }
    }catch(err){
        return res.status(403).json(err);
    }
});

// 投稿を削除する
router.put("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            return res.status(200).json("投稿の削除に成功しました!");
        }else{
            return res.status(403).json("あなたは他人の投稿を削除できません");
        }
    }catch(err){
        return res.status(403).json(err);
    }
});

// 特定の投稿を取得する
router.get("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
        }catch(err){
        return res.status(403).json(err);
    }
});

module.exports = router;