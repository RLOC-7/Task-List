import pool from "../database/connection.js";

class TaskService {
  
  async addTask({ tarefa, descricao, responsavel}) {
    try {
      console.log('Creating task with data:', data);
      const [result] = await pool.promise().execute(
        'INSERT INTO tasks (TAREFA, DESCRICAO, RESPONSAVEL) VALUES (?, ?, ?)',
        [ tarefa, descricao, responsavel]
      );
  
      const id = result.insertId;
      console.log(`Tarefa criada com sucesso! ID: ${id}`);
  
      const newTask = await this.taskListOne(id);
      console.log('Task created successfully');
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error("Erro ao criar tarefa.");
    }
  }

  async taskList() {
    try {
      const [rows] = await pool.promise().execute('SELECT * FROM tasks');
      console.log(rows);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar tarefas.");
    }
  }
  
  async taskListOne(id) {
    try {
      const [rows] = await pool.promise().execute(
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
      await pool.promise().execute(
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
      await pool.promise().execute(
        'DELETE FROM tasks WHERE id = ?',
        [id]
      );
      return deletedTask;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao excluir tarefa.");
    }
  }
}

export default TaskService;