
var express = require('express');
var logger = require('morgan');
require('dotenv').config();
const connection = require("./db");
const cors = require("cors");
var indexRouter = require('./routes/index');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/authenticaton");
const passwordResetRoutes = require("./routes/passwordReset");

var app = express();

// database connection
connection();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// routes
app.use('/', indexRouter);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);



// database connection
//connection();

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
