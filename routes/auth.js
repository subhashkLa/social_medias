const express = require('express');
const router = express.Router();
const { Signup, Signin, signout, requireSignin } = require("../controller/user");
const { alluser, singleUser, userById, updateUser } = require("../controller/users");
const { postById, post, getPost } = require("../controller/post");

router.post("/signup", Signup);
router.post("/signin", Signin);
router.get('/signout', signout);
router.get("/user",   alluser);
router.get("/user/:userId", requireSignin, singleUser);
router.put("/user/:userId", requireSignin, updateUser);

//post
router.post("/post/new/:userId", requireSignin, post);
router.get("/post", getPost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
