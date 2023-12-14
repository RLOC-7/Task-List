class TaskModel {
  constructor(id, tarefa, descricao, responsavel, concluida = false) {
    this.id = id;
    this.tarefa = tarefa;
    this.descricao = descricao;
    this.responsavel = responsavel;
    this.concluida = concluida;
  }

  toJSON() {
    return {
      id: this.id,
      tarefa: this.tarefa,
      descricao: this.descricao,
      responsavel: this.responsavel,
      concluida: this.concluida,
    };
  }
}

export default TaskModel;
