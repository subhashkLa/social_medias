const express = require('express');
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");

//mongoose 
mongoose.connect('mongodb://localhost:27017/rocky', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log("DB connect")});

mongoose.connection.on("error", (err) => {
    console.log(`Connection Failed ${ err }`);
});

//middleware
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

//router
const authRouter = require("./routes/auth");

app.use("/", authRouter);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: "Invaild Token..." });
    }
});

//port
const port = 6000;
app.listen(port, () => console.log(`Node js Started ${ port }`));