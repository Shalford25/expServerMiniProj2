import express from "express";
const userRouter = express.Router();
import pool from "./PoolConnection.js";
userRouter.get("/", async (req, res) => {
  try {res.send("Hello from Routes for User");}
    catch (error) {console.error("Query error:", error);
    res.send(" Sorry Error")
    }
});
export default userRouter;