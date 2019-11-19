const User = require("../model/user");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

exports.userById = ( req, res, next, id ) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.userprofile = user //  adds profile object an req with user info
        next();
    }); 
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = 
        req.userprofile && req.auth && req.userprofile._id == req.auth._id;
    if(!authorized) {
        return res.status(400).json({
            error: "User is not authorized to perform this action"
        });      
    }
};

exports.alluser = (req, res) => {
    User.find((err, users) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select("name email photo updated created");
};

exports.singleUser = (req, res) => {
    req.userprofile.hashed_password = undefined;
    req.userprofile.salt = undefined;
    return res.json(req.userprofile);
};

// exports.updateUser = (req, res, next) => { 
//     let user = req.userprofile;
//     user = _.extend(user, req.body);
//     user.updated = Date.now();
//     user.save((err) => {
//         if(err) {
//             return res.status(400).json({
//                 error: "You are not authorized to perform this action"
//             });
//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json({ user });
//         next();
//     });
// }

exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) { return res.status(400).json({error: "Photo Could not be uploaded"}) };
        
        //save
        let user = req.userprofile;
        user = _.extend(user, fields);
        user.updated = Date.now();

        if(files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    });    
}

exports.photoUrl = (req, res, next) => {
    if(req.userprofile.photo.data) {
        res.set(("Content-Type", req.userprofile.photo.contentType));
        return res.send(req.userprofile.photo.data)
    }    
    next();
}

exports.addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.addFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

// remove follow unfollow
exports.removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.unfollowId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.removeFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.body.userId } }, { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};