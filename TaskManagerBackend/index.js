const express = require("express");
const app = express();
const {dbConnect} = require("./config/database");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User");
const todoRoutes = require("./routes/Todo");
const authRoutes = require("./routes/googleUser");
const cors = require("cors");
const session = require('express-session');
require("dotenv").config();



const PORT = process.env.PORT || 3000;

app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET 
}));


dbConnect();

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);
app.use("/", authRoutes)


app.listen(PORT, ()=>{
    console.log(`Server Started Successfully at ${PORT}`);
});