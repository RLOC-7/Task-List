import express from "express";
import TaskController from "../controllers/TaskController.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use(express.static(path.join(__dirname, "../../public")));


router.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "../../public/pages/index.html");
  res.sendFile(indexPath);
});


router.post("/taskAdd", (req, res) => {
  res.send(TaskController.addTask);
});

router.get("/tasks", (req, res) => {
  res.send(TaskController.taskList);
});

router.get("/task:id", (req, res) => {
  res.send(TaskController.taskLisOne);
});

router.put("/update/task/:id", (req, res) => {
  res.send(TaskController.taskUpdate);
});

router.delete("/delete/task/:id", (req, res) => {
  res.send(TaskController.taskDelete);
});

export default router;
