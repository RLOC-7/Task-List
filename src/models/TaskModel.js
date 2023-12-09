// src/models/TaskModel.js

class TaskModel {
  constructor(id, tarefa, descricao, responsavel, concluida = false) {
    this.id = id;
    this.tarefa = tarefa;
    this.descricao = descricao;
    this.responsavel = responsavel;
    this.concluida = concluida;
  }
}

export default TaskModel;
