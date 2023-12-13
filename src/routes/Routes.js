// Routes.js
import express from "express";
import TaskController from "../controllers/TaskController.js";
import { router as middlewares, indexPath, validateTaskId } from '../middlewares/middlewares.js';


const taskController = new TaskController();
const router = express.Router();

router.use(middlewares);

router.get("/", async (req, res) => {
  res.sendFile(indexPath);
});

router.post("/add/task", async (req, res) => {
  try {
    await taskController.addTask(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
});

router.get('/task/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const oneTask = await taskController.taskListOne(taskId);
    res.status(200).json(oneTask);
  } catch (error) {
    console.error(error);
    if (error.message.includes('não encontrada')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro ao obter detalhes da tarefa.' });
    }
  }
});

router.get('/list/task', (req, res) => taskController.taskList(req, res));

router.put("/update/task/:id", validateTaskId, async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao } = req.body;

    if (!id || !descricao) {
      return res.status(400).json({ error: 'ID da tarefa e descrição são obrigatórios.' });
    }

    const updatedTask = await taskController.taskUpdate(id, descricao);
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

router.put('/complete/task/:id', async (req, res) => {
  const { id: taskId } = req.params;

  try {
    const updatedTask = await taskController.markTaskAsCompleted(taskId);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao marcar tarefa como concluída.' });
  }
});

router.put('/incomplete/task/:id', async (req, res) => {
  const { id: taskId } = req.params;

  try {
    const updatedTask = await taskController.markTaskAsIncomplete(taskId);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao marcar tarefa como não concluída.' });
  }
});


export default router;
