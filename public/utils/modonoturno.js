// Função para alternar entre os modos noturno e claro
function toggleModoNoturno() {
    const body = document.body;

    // Verifique se o modo noturno já está ativado
    const modoNoturnoAtivado = body.classList.contains('modo-noturno');

    // Se estiver ativado, desative; se não, ative
    body.classList.toggle('modo-noturno', !modoNoturnoAtivado);

    // Salve a preferência no localStorage
    salvarPreferencia('modoNoturno', !modoNoturnoAtivado);

}
// Função para salvar preferência no LocalStorage
function salvarPreferencia(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

// Função para obter preferência do LocalStorage
function obterPreferencia(chave) {
    const valor = localStorage.getItem(chave);
    return valor === null ? null : JSON.parse(valor);
}

// Carregar configurações salvas ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    const modoNoturnoSalvo = obterPreferencia('modoNoturno');
    if (modoNoturnoSalvo !== null) {
        document.body.classList.toggle('modo-noturno', modoNoturnoSalvo);
    }
});
