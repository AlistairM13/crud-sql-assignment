import express from "express";
import {
  createNewUser,
  fetchAllUsers,
  updateUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").get(fetchAllUsers).post(createNewUser);

userRouter.put("/:id", updateUser);

export default userRouter;
