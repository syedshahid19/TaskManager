const mongoose = require("mongoose");


exports.dbConnect = ()=>{
    mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=>console.log("DB Connected Successfully"))
    .catch((error)=>{
        console.log("DB Connection Failed");
        console.log("error details", error);
        process.exit(1);
    })
}