  const pagina = window.location.pathname.split("/").pop().replace('.html', '') || 'index';

  
  const textos = {
    admin: {
        pt: {
            senhatexto: "Terminal de Senhas",
            guiche1: "Guichê 1",
            guiche2: "Guichê 2",
            guiche3: "Guichê 3",
            idiomatexto: "Escolha o Idioma:",
             return: "Voltar"           
        },
        en: {
            senhatexto: "Ticket Station",
            guiche1: "Box 1",
            guiche2: "Box 2",
            guiche3: "Box 3",
            idiomatexto: "Choose language:",
            return: "Back"
        }
    },
    index: {
        pt: {
            painel: "Painel",
            carrossel: "Carrossel",
            idiomatexto: "Escolha o Idioma:"

        },
        en: {
            painel: "Panel",
            carrossel: "Carousel",
            idiomatexto: "Choose language:"

        }
    },
    painel: {
        pt: {
            senhastexto: "Últimas Senhas",
            idiomatexto: "Escolha o Idioma:"

        },
        en: {
            senhastexto: "Last Tickets",
            idiomatexto: "Choose language:"
        }
    },

    carrossel: {
        pt: {
            return: "Voltar"           
        },
        en: {
            return: "Back"
        }
    }

  } 

function trocarIdioma(idioma) {
  localStorage.setItem('idiomaSelecionado', idioma);
  const conteudo = textos[pagina][idioma];

  for (const id in conteudo) {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.innerText = conteudo[id];
    }
  }
}

const idiomaSalvo = localStorage.getItem('idiomaSelecionado') || 'pt';
trocarIdioma(idiomaSalvo);

const selectIdioma = document.getElementById('idioma');
if (selectIdioma) {
  selectIdioma.value = idiomaSalvo;
}