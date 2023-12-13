// TaskController.js
import TaskService from "../services/TaskServices.js";

const taskService = new TaskService();

class TaskController {

  constructor() {
    this.taskService = new TaskService();    
  }

  async addTask(req, res) {
    try {
      const { tarefa, descricao, responsavel } = req.body;

      if (!tarefa || !descricao || !responsavel) {
        throw new Error("Campos 'tarefa', 'descricao' e 'responsavel' são obrigatórios.");
      }

      const task = await taskService.addTask({ tarefa, descricao, responsavel });
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message || "Erro ao criar tarefa." });
    }
  }

  async taskList(req, res) {
    try {
      const tasks = await this.taskService.taskList();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao obter a lista de tarefas.");
    }
  }

  async taskListOne(taskId) {
    try {
      const taskDetails = await this.taskService.taskListOne(taskId);
      return taskDetails;
    } catch (error) {
      console.error(error);
      throw error; // Deixe o tratamento do erro para a rota
    }
  }

  async taskUpdate(id, descricao) {
    try {
      console.log('Updating task with ID:', id);
      
      // Verifica se id e descricao são definidos antes de executar a consulta
      if (!id || !descricao) {
        throw new Error('ID da tarefa ou descrição não fornecidos.');
      }
  
      await this.taskService.taskUpdate(id, descricao);
  
      console.log('Task updated successfully.');
  
      const updatedTask = await this.taskListOne(id);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error("Erro ao atualizar tarefa.");
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

  async markTaskAsCompleted(req, res) {
    const taskId = req.params.id;

    try {
      const updatedTask = await taskService.markTaskAsCompleted(taskId);
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao marcar tarefa como concluída.' });
    }
  }

  async markTaskAsIncomplete(req, res) {
    const taskId = req.params.id;

    try {
      const updatedTask = await taskService.markTaskAsIncomplete(taskId);
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao marcar tarefa como não concluída.' });
    }
  }

}

export default TaskController;