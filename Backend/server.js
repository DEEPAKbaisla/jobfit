import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

connectDB()


let PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log("server is running on http://localhost:3000")
})