const User = require("../model/user");
const _ = require("lodash");

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
    }).select("name email updated created");
};

exports.singleUser = (req, res) => {
    req.userprofile.hashed_password = undefined;
    req.userprofile.salt = undefined;
    return res.json(req.userprofile);
};

exports.updateUser = (req, res, next) => {
    let user = req.userprofile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({ user });
        next();
    });
}
