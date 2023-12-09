import TaskService from "../services/TaskServices.js";

const taskService = new TaskService();

class TaskController {
  
  async addTask(req, res) {
    const { tarefa, descricao, responsavel } = req.body;

    try {
      const task = await taskService.addTask({ tarefa, descricao, responsavel });
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar tarefa." });
    }
  }

  async taskList(req, res) {
    try {
      const tasks = await taskService.taskList();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar tarefas." });
    }
  }

  async taskListOne(req, res) {
    const taskId = req.params.id;

    try {
      const oneTask = await taskService.taskListOne(taskId);
      res.status(200).json(oneTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao obter tarefa mencionada." });
    }
  }

  async taskUpdate(req, res) {
    const { id: taskId } = req.params;
    const { descricao } = req.body;

    try {
      const updatedTask = await taskService.taskUpdate(taskId, descricao);
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar tarefa." });
    }
  }

  async taskDelete(req, res) {
    const taskId = req.params.id;

    try {
      const deletedTask = await taskService.taskDelete(taskId);
      res.status(200).json({ message: "Tarefa excluída com sucesso.", deletedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir tarefa." });
    }
  }
}

export default TaskController;