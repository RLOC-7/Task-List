document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    try {
        const response = await fetch('/taskAdd', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        // Exibir a lista de tarefas ou realizar outras ações necessárias
        console.log(data);

    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
    }
});
