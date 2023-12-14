// TaskController.js
import TaskService from "../services/TaskServices.js";

const taskService = new TaskService();

class TaskController {

  constructor() {
    this.taskService = new TaskService();    
  }

  async addTask(req, res) {
    try {
      const { tarefa, descricao, responsavel, concluido } = req.body;
  
      if (!tarefa || !descricao || !responsavel) {
        throw new Error("Campos 'tarefa', 'descricao' e 'responsavel' são obrigatórios.");
      }
  
      const newTask = await taskService.addTask({ tarefa, descricao, responsavel, concluido });
      res.status(201).json({ message: 'Tarefa adicionada com sucesso!', task: newTask.toJSON() });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar tarefa.");
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

  async taskUpdate(id, tarefa, descricao, responsavel, concluido) {
    try {
      console.log('Updating task with ID:', id);
  
      // Verifica se id é definido antes de executar a consulta
      if (!id) {
        throw new Error('ID da tarefa não fornecido.');
      }
  
      await this.taskService.taskUpdate(id, tarefa, descricao, responsavel, concluido);
  
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