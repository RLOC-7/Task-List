import database from "../database/connection.js";

class TaskService {
  async addTask({ responsavel, tarefa, descricao }) {
    try {
      const [id] = await database("tasks").insert({
        responsavel,
        tarefa,
        descricao,
      });

      console.log(`Tarefa criada com sucesso! ID: ${id}`);
      const newTask = await this.taskListOne(id)
      
      return newTask;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar tarefa.");
    }
  }

  async taskList() {
    try {
      const tasks = await database.select("*").table("tasks");
      console.log(tasks);
      return tasks;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar tarefas.");
    }
  }
  
  async taskListOne(id) {
    try {
      const task = await database("tasks").select("*").where({ id }).first();
      return task;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter tarefa.");
    }
  }

  async taskUpdate(id, descricao) {
    try {
      await database("tasks").where({ id }).update({ descricao });
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
      await database("tasks").where({ id }).del();
      return deletedTask;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao excluir tarefa.");
    }
  }
}

export default TaskService;
