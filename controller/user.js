const User = require('../model/user');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const jwt_secret = "JKDJKDKFKDJHFKJDHSKJF";

exports.Signup = async (req, res) => {
    const UserExist = await User.findOne({ email: req.body.email});
        if(UserExist) return res.status(400).json({ error: "Email is Taken" });

    const user = await User(req.body);
    await user.save((err, user) => {
        if(err) return res.status(400).json({ error: "Something went wrong" });

        res.status(200).json({ user: user });
    });
};

exports.Signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if(err || !user) return res.status(403).json({ error: "Email I'd not found" });
        

        if(!user.authenciate(password)) return res.status(403).json({ error: "Email I'd and password not found" });
        
        
        const token = jwt.sign({_id: user._id}, jwt_secret);

        res.cookie("t", token, {expire: 360000 + Date.now()});

        const { _id, name, email } = user;
        
        res.status(200).json({token, user: { _id, name, email }});
    });
};

exports.requireSignin = expressJwt({
    // if the token is valid, express jwt appends the verified user id
    // in an auth key to the request object
    secret: jwt_secret,
    userProperty: "auth"
});

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout Success! "});
};