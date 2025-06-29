// Clima
const apiKey = "a28750fda7633465724fc35b33fd7bfa";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#pesquisa");

const LOCAL_STORAGE_CITY_KEY = 'userCityPreference';
const DEFAULT_CITY = 'Carapicuíba';

const tempElement = document.querySelector("#temperatura span");

const getWeatherData = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherUrl);
    const data = await res.json();
    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (tempElement) {
        if (data.main && data.main.temp) {
            tempElement.innerHTML = parseInt(data.main.temp);
        } else {
            tempElement.innerHTML = "--";
        }
    }

    if (descElement) {
        if (data.weather && data.weather[0] && data.weather[0].description) {
            descElement.innerHTML = data.weather[0].description;
        } else {
            descElement.innerHTML = "Não disponível";
        }
    }

    if (cityInput) {
        cityInput.value = city;
    }
};

const saveCityToLocalStorage = (city) => {
    localStorage.setItem(LOCAL_STORAGE_CITY_KEY, city);
};

const getCityFromLocalStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE_CITY_KEY);
};

document.addEventListener("DOMContentLoaded", () => {
    let savedCity = getCityFromLocalStorage();
    if (savedCity) {
        showWeatherData(savedCity);
    } else {
        showWeatherData(DEFAULT_CITY);
        saveCityToLocalStorage(DEFAULT_CITY);
    }
});

if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const city = cityInput.value;
        if (city) {
            showWeatherData(city);
            saveCityToLocalStorage(city);
        }
    });
}

window.addEventListener('storage', (event) => {
    if (event.key === LOCAL_STORAGE_CITY_KEY) {
        const novaCidade = event.newValue;
        if (novaCidade) {
            showWeatherData(novaCidade);
        }
    }
});

//Script
let numeroSenha = parseInt(localStorage.getItem('senhaAtual')) || 0;

function chamarSenha(guiche) {
    numeroSenha++;
    const senhaFormatada = numeroSenha.toString().padStart(3, '0');
    const senhaComGuiche = `${senhaFormatada} - Guichê ${guiche}`;
    document.getElementById('senhaTerminal').textContent = senhaComGuiche;
    localStorage.setItem('senhaAtual', senhaComGuiche);

    let ultimas = JSON.parse(localStorage.getItem('ultimasSenhas')) || [];
    ultimas.unshift(senhaComGuiche);
    ultimas = ultimas.slice(0, 3);
    localStorage.setItem('ultimasSenhas', JSON.stringify(ultimas));

    document.getElementById('senhaTerminal').textContent = localStorage.getItem('senhaAtual') || '000';
}

const dataHoraElement = document.getElementById('data-hora');
if (dataHoraElement) {
    function atualizarDataHora() {
        const agora = new Date();
        const hora = agora.toLocaleTimeString('pt-BR');
        document.getElementById('data-hora').textContent = `${hora}`;
    }

    setInterval(atualizarDataHora, 1000);
    atualizarDataHora();
}

const senhaAtualElement = document.getElementById('senhaAtual');

if (senhaAtualElement) {
    const audioBeep = new Audio("https://www.orangefreesounds.com/wp-content/uploads/2017/09/Heart-monitor-sound.mp3");
    document.addEventListener('click', function () {
        audioBeep.play().catch(() => {});
    }, { once: true });

    let ultimaSenhaTocada = localStorage.getItem('senhaAtual') || '000';

    document.addEventListener('DOMContentLoaded', function() {
        function atualizarPainel() {
            const senha = localStorage.getItem('senhaAtual') || '000';
            senhaAtualElement.textContent = senha;
            const ultimas = JSON.parse(localStorage.getItem('ultimasSenhas')) || [];
            const lista = document.getElementById('ultimasSenhas');

            if (lista) {
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
        }
        atualizarPainel();
        setInterval(atualizarPainel, 500);
    });
}

function resetarSenhas() {
    numeroSenha = 0;
    localStorage.setItem('senhaAtual', '000');
    localStorage.setItem('ultimasSenhas', JSON.stringify([]));

    const senhaTerminal = document.getElementById('senhaTerminal');
    if (senhaTerminal) {
        senhaTerminal.textContent = '000';
    }

    const senhaAtual = document.getElementById('senhaAtual');
    if (senhaAtual) {
        senhaAtual.textContent = '000';
    }

    const lista = document.getElementById('ultimasSenhas');
    if (lista) {
        lista.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const li = document.createElement('li');
            li.textContent = '---';
            lista.appendChild(li);
        }
    }
}

// Temas
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
    });
}

// Troca QRCODE:
document.addEventListener('DOMContentLoaded', function() {
  const elementoTexto = document.getElementById('titulo-info');
  const elementoQrCode = document.getElementById('qrcode-dinamico');

  if (elementoTexto && elementoQrCode) {
    const conteudos = [
      {
        texto: "O que achou do atendimento? Nos avalie!",
        imagemQrCode: "qr_code_forms.png"
      },
      {
        texto: "Acesse dicas importantes para cuidar de quem você ama!",
        imagemQrCode: "qr_code_site.png"
      }
    ];

    let indiceAtual = 0;

    function alterarConteudo() {
      indiceAtual = (indiceAtual + 1) % conteudos.length;
      const novoConteudo = conteudos[indiceAtual];
      elementoTexto.textContent = novoConteudo.texto;
      elementoQrCode.alt = `QR Code para: ${novoConteudo.texto}`;
      elementoQrCode.src = novoConteudo.imagemQrCode; // <== ESSA LINHA ESTAVA FALTANDO
    }

    const intervaloDeTempo = 20000;
    setInterval(alterarConteudo, intervaloDeTempo);
  }
});

