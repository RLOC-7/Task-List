// Função para alternar entre os modos noturno e claro
function toggleModoNoturno() {
    const body = document.body;

    // Verifique se o modo noturno já está ativado
    const modoNoturnoAtivado = body.classList.contains('modo-noturno');

    // Se estiver ativado, desative; se não, ative
    body.classList.toggle('modo-noturno', !modoNoturnoAtivado);
}
