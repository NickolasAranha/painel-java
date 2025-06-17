const botao = document.getElementById('pega-tema');
const temaSalvo = localStorage.getItem('tema');

if (botao) {
if (temaSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
    botao.textContent = '☀️';
} else {
    botao.textContent = '🌙';
}

botao.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        botao.textContent = '☀️';
        localStorage.setItem('tema', 'escuro');
    } else {
        botao.textContent = '🌙';
        localStorage.setItem('tema', 'claro');
    }
})
};