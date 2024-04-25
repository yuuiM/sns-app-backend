const router = require("express").Router();
const User = require("../models/User");

// CURD
// ユーザー情報の更新
router.put("/:id", async(req, res) => {
    if(req.body.userID === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("ユーザー情報が更新されました")
        }catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res
        .status(403)
        .json("アカウントが違います。情報を更新できません。")
    }
});

// ユーザー情報の削除
// ユーザー情報の取得

// router.get("/", (req, res) => {
//     res.send("user router");
// });

module.exports = router;