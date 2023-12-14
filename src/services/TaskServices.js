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

  async taskListOne(id) {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);
  
      if (rows.length === 0) {
        throw new Error(`Tarefa com ID ${id} não encontrada.`);
      }
  
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter tarefa.");
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

  async taskUpdate(id, tarefa, descricao, responsavel, concluido) {
    try {
      const params = {
        tarefa: tarefa || null,
        descricao: descricao || null,
        responsavel: responsavel || null,
        concluido: concluido !== undefined ? concluido : null,
      };
  
      const values = Object.values(params); // Obtemos os valores do objeto
      values.push(id); // Adicionamos o ID ao final do array
  
      const query = 'UPDATE tasks SET tarefa = ?, descricao = ?, responsavel = ?, concluido = ? WHERE id = ?';
      await this.connection.execute(query, values);
  
      console.log('Task updated in the database.');
    } catch (error) {
      console.error('Error updating task in the database:', error);
      throw new Error("Erro ao atualizar tarefa.");
    }
  }

  async taskDelete(id) {
    const deletedTask = await this.taskListOne(id);

    try {
      await this.connection.execute('DELETE FROM tasks WHERE id = ?',[id]);
      return deletedTask;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao excluir tarefa.");
    }
  }

  async markTaskAsCompleted(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      this.tasks[taskIndex].concluida = 1;
      return this.tasks[taskIndex];
    } else {
      throw new Error('Tarefa não encontrada');
    }
  }

  async markTaskAsIncomplete(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      this.tasks[taskIndex].concluida = 0;
      return this.tasks[taskIndex];
    } else {
      throw new Error('Tarefa não encontrada');
    }
  }
}

export default TaskService;