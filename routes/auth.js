const express = require('express');
const router = express.Router();
const { Signup, Signin, signout, requireSignin } = require("../controller/user");

const { alluser, singleUser, userById, updateUser, photoUrl,
        addFollowing, addFollower, removeFollowing,
        removeFollower, } = require("../controller/users");

const { postById, post, getPost, postByUser, postUrl, likes , unlikes,
         singlePost, comment, uncomment} = require("../controller/post");

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

//likes And Unlikes
router.put("/post/likes", requireSignin, likes);
router.put("/post/unlikes", requireSignin, unlikes);

//comment
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);

//user
router.post("/signup", Signup);
router.post("/signin", Signin);
router.get('/signout', signout);
router.get("/user",   alluser);
router.get("/user/:userId", requireSignin, singleUser);
router.put("/user/:userId", requireSignin, updateUser);

//post
router.post("/post/new/:userId", requireSignin, post);
router.get("/post", getPost);
router.get("/user/post/:userId", postByUser);
router.get('/post/:postId', singlePost);

//photo
router.get("/user/photo/:userId", photoUrl);
router.get("/post/photo/:postId", postUrl);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
