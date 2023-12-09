// TaskServices.js
import pool from "../database/connection.js";
import TaskModel from '../models/TaskModel.js';

class TaskService {

  constructor() {
    // Configuração do pool
    this.tasks = []; // Inicializar a lista de tarefas vazia
    this.connection = pool;
    
  }
  async addTask({ tarefa, descricao, responsavel }) {
    try {
      const [result] = await pool.execute('INSERT INTO tasks (tarefa, descricao, responsavel) VALUES (?, ?, ?)', [tarefa, descricao, responsavel]);

      const taskId = result.insertId;
      const newTask = new TaskModel(taskId, tarefa, descricao, responsavel);
      return newTask;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar tarefa.");
    }
  }

  async taskList() {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM tasks');
      console.log(rows);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar tarefas.");
    }
  }

  async taskListOne(id) {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM tasks WHERE id = ?',
        [id]
      );

      if (rows.length === 0) {
        throw new Error(`Tarefa com ID ${id} não encontrada.`);
      }

      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter tarefa.");
    }
  }

  async taskUpdate(id, descricao) {
    try {
      await this.connection.execute(
        'UPDATE tasks SET descricao = ? WHERE id = ?',
        [descricao, id]
      );

      const updatedTask = await this.taskListOne(id);
      return updatedTask;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar tarefa.");
    }
  }
 
  async taskDelete(id) {
    try {
      const deletedTask = await this.taskListOne(id);
      await this.connection.execute(
        'DELETE FROM tasks WHERE id = ?',
        [id]
      );
      return deletedTask;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao excluir tarefa.");
    }
  }

  async markTaskAsCompleted(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      this.tasks[taskIndex].concluida = true;
      return this.tasks[taskIndex];
    } else {
      throw new Error('Tarefa não encontrada');
    }
  }

  async markTaskAsIncomplete(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      this.tasks[taskIndex].concluida = false;
      return this.tasks[taskIndex];
    } else {
      throw new Error('Tarefa não encontrada');
    }
  }
}


export default TaskService;