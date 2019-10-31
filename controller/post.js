const Post = require("../model/post");

exports.postById = (req, res, id) => {
    Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
        if(err || !post) {
            return res.status(400).json({ error: err });
        }
        res.postByUsers = post; 
    });
}

exports.post = (req, res) => {
    let createpost = new Post(req.body);
    createpost.postedBy = req.userprofile;
    req.userprofile.hashed_password = undefined;
    req.userprofile.salt = undefined;
    req.userprofile.created = undefined;
    req.userprofile.updated = undefined;
    req.userprofile.__v = undefined;
    createpost.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
}

exports.getPost = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err));   
};