import express from "express";
import {
  createNewUser,
  fetchAllUsers,
  updateUser,
} from "../controllers/userController";
import { upload } from "../config/multer";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(fetchAllUsers)
  // .post(upload.single("image"), createNewUser);
  .post(
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "pdf", maxCount: 1 },
    ]),
    createNewUser
  );

userRouter.put("/:id", updateUser);

export default userRouter;
