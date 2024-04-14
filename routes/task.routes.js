import express from "express";
import {
  deleteMyTask,
  getMyTask,
  newTask,
  updateMyTask,
} from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/myAllTask", isAuthenticated, getMyTask);
router
  .route("/:id")
  .put(isAuthenticated, updateMyTask)
  .delete(isAuthenticated, deleteMyTask);

export default router;
