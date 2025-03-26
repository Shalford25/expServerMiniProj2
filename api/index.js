import express from "express";
import cors from "cors";
import bookRouter from "./routes/BookRoutes.js";
import pool from "./routes/PoolConnection.js";
import userRouter from "./routes/UserRoutes.js";
const app=express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/shop', bookRouter);
app.use("/users",userRouter);
app.get("/", async (req, res) => {
  try {res.send("Hello from Apps for User");}
    catch (error) {console.error("Query error:", error);
    res.send(" Sorry Error")
    }
});
app.listen(3000, () => console.log("Server ready on port 3000."));