const Post = require("../model/post");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

exports.postById = (req, res, next, id) => {
    Post.findById(id)
   .populate("postedBy", "_id name")
   .populate('comments', 'text created')
   .populate('comments.postedBy', '_id name')
   .select('_id title body created likes photo')
   .exec((err, post) => {
        if(err || !post) {
            return res.status(400).json({
                error: err
            })
        } 
        req.post = post;
        next();
   }); 
}

// exports.post = (req, res) => {
//     let createpost = new Post(req.body);
//     createpost.postedBy = req.userprofile;
//     req.userprofile.hashed_password = undefined;
//     req.userprofile.salt = undefined;
//     req.userprofile.created = undefined;
//     req.userprofile.updated = undefined;
//     req.userprofile.__v = undefined;
//     createpost.save((err, result) => {
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         res.json(result);
//     });
// }

exports.post = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(400).json({ err: "Post is not successfully" });

        let createpost = new Post(req.body);
        createpost.postedBy = req.userprofile;
        req.userprofile.hashed_password = undefined;
        req.userprofile.salt = undefined;
        req.userprofile.created = undefined;
        req.userprofile.updated = undefined;
        req.userprofile.__v = undefined;
        createpost = _.extend(createpost, fields);

        if(files.photo) {
            createpost.photo.data = fs.readFileSync(files.photo.path);
            createpost.photo.contentType = files.photo.type;    
        }

        createpost.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
        });
        
    });    
}

exports.getPost = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id name")
    .populate('comments', 'text created')
    .populate('comments.postedBy', '_id name')
    .select("_id title body created likes")
    .sort({ created: -1 })
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err));   
};

exports.postByUser = (req, res) => {
    Post.find({postedBy: req.userprofile._id})
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts);
        });
}

exports.postUrl = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

exports.singlePost = (req, res) => {
    return res.json(req.post);
};

exports.likes = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, 
        { $push: { likes: req.body.userId }},
        { new: true }
    ).exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);   
        }
    });
}

exports.unlikes = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, 
        { $pull: { likes: req.body.userId }},
        { new: true }
    ).exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);   
        }
    });
}

exports.comment = (req, res) => {
    let comment = req.body.comment;
    comment.postedBy = req.body.userId;

    Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true })
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
};

exports.uncomment = (req, res) => {
    let comment = req.body.comment;

    Post.findByIdAndUpdate(req.body.postId, { $pull: { comments: { _id: comment._id } } }, { new: true })
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
};