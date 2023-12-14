// utils/tasks.js
async function addTask(tarefa, descricao, responsavel, concluido) {
    try {
        const response = await fetch('/add/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tarefa, descricao, responsavel, concluido }),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar tarefa');
        }

        const responseData = await response.json();

        // Exibindo um alerta
        alert('Tarefa adicionada com sucesso!');

        // Atualizando a lista de tarefas na sessão
        updateTaskList(responseData);
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error.message);
        // Aqui você pode lidar com o erro de acordo com sua lógica específica
    }
}

const taskList = document.getElementById('taskList');

function updateTaskList(name, description, responsible, concluida) {
    const taskItem = document.createElement('li');
    const taskName = document.createElement('h3');
    const taskDescription = document.createElement('p');
    const taskResponsible = document.createElement('p');
    const taskStatus = document.createElement('p');

    taskName.textContent = name;
    taskDescription.textContent = description;
    taskResponsible.textContent = `Responsável: ${responsible}`;
    taskStatus.textContent = concluida === 1 ? 'Concluída' : 'Pendente';

    taskItem.appendChild(taskName);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskResponsible);
    taskItem.appendChild(taskStatus);

    taskList.appendChild(taskItem);
}