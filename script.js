    let numeroSenha = parseInt(localStorage.getItem('senhaAtual')) || 0;

    function chamarSenha(guiche) {
      numeroSenha++;
      const senhaFormatada = numeroSenha.toString().padStart(3, '0');
      const senhaComGuiche = `${senhaFormatada} - Guichê ${guiche}`;
      document.getElementById('senhaTerminal').textContent = senhaComGuiche;
      localStorage.setItem('senhaAtual', senhaComGuiche);

      // Atualizar as últimas 3 senhas
      let ultimas = JSON.parse(localStorage.getItem('ultimasSenhas')) || [];
      ultimas.unshift(senhaComGuiche);
      ultimas = ultimas.slice(0, 3);
      localStorage.setItem('ultimasSenhas', JSON.stringify(ultimas));
    
      document.getElementById('senhaTerminal').textContent = localStorage.getItem('senhaAtual') || '000';
    }


    function atualizarDataHora() {
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR');
  document.getElementById('dataHora').textContent = `${data} ${hora}`;
    }

setInterval(atualizarDataHora, 1000);
atualizarDataHora();

const audioBeep = new Audio("https://www.orangefreesounds.com/wp-content/uploads/2017/09/Heart-monitor-sound.mp3");
document.addEventListener('click', function () {
  audioBeep.play().catch(() => {});
}, { once: true });

let ultimaSenhaTocada = localStorage.getItem('senhaAtual') || '000';

document.addEventListener('DOMContentLoaded', function() {
  function atualizarPainel() {
    const senha = localStorage.getItem('senhaAtual') || '000';
    document.getElementById('senhaAtual').textContent = senha;

    const ultimas = JSON.parse(localStorage.getItem('ultimasSenhas')) || [];
    const lista = document.getElementById('ultimasSenhas');
    lista.innerHTML = '';

    if (senha !== ultimaSenhaTocada) {
      audioBeep.currentTime = 0;
      audioBeep.play();
      ultimaSenhaTocada = senha;
     }
      
    ultimas.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      lista.appendChild(li);
    });

    for (let i = ultimas.length; i < 3; i++) {
      const li = document.createElement('li');
      li.textContent = '---';
      lista.appendChild(li);
    }
  }

  atualizarPainel();
  setInterval(atualizarPainel, 500);
})

function resetarSenhas() {
    numeroSenha = 0;
    localStorage.setItem('senhaAtual', '000');
    localStorage.setItem('ultimasSenhas', JSON.stringify([]));

    document.getElementById('senhaTerminal').textContent = '000';
    document.getElementById('senhaAtual').textContent = '000';

    const lista = document.getElementById('ultimasSenhas');
    lista.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        li.textContent = '---';
        lista.appendChild(li);
    }
}
