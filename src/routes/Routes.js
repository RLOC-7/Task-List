// Routes.js
import express from "express";
import TaskController from "../controllers/TaskController.js";
import { router as middlewares, indexPath } from '../middlewares/middlewares.js';

const taskController = new TaskController();
const router = express.Router();

router.use(middlewares);


router.get("/", async (req, res) => {
  res.sendFile(indexPath);
});

router.post("/taskAdd", async (req, res) => {
  const { tarefa, descricao, responsavel } = req.body;

  try {
    const task = await taskController.addTask({
      tarefa,
      descricao,
      responsavel
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await taskController.taskList();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar tarefas." });
  }
});

router.get("/task/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const oneTask = await taskController.taskListOne(taskId);
    res.status(200).json(oneTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter tarefa mencionada." });
  }
});


router.put("/update/task/:id", async (req, res) => {
  const { id: taskId } = req.params;
  const { descricao } = req.body;

  try {
    const updatedTask = await taskController.taskUpdate(taskId, descricao);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
});

router.delete("/delete/task/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await taskController.taskDelete(taskId);
    res
      .status(200)
      .json({ message: "Tarefa excluída com sucesso.", deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir tarefa." });
  }
});

export default router;
