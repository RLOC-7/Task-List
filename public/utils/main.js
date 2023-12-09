document
.getElementById("taskForm")
.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tarefa = document.getElementById("tarefa").value;
  const descricao = document.getElementById("descricao").value;
  const responsavel = document.getElementById("responsavel").value;

  try {
    const response = await fetch("/taskAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tarefa, descricao, responsavel }),
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});