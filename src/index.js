
let feminino = []
let masculino = []

let femininoConteudo = document.querySelector('#feminino .conteudo')
let masculinoConteudo = document.querySelector('#masculino .conteudo')


function aoClicarNoJogador (jogador) {
    localStorage.setItem('jogador', JSON.stringify(jogador))

    window.location.href = 'detalhes.html'
}

function elementoJogador (jogador) {
    const elemento = document.createElement('article')
    const img = document.createElement('img')
    const nome = document.createElement('h5')

    elemento.setAttribute('class', 'jogador')
    img.setAttribute('src', jogador.imagem)
    nome.setAttribute('class', 'nome')

    nome.textContent = jogador.nome

    elemento.appendChild(img)
    elemento.appendChild(nome)

    elemento.addEventListener('click', function () {
        aoClicarNoJogador(jogador)
    })
    
    return elemento
}


function inserirEmConteudo (conteudo, jogadores) {
    conteudo.innerHTML = '';   
    jogadores.forEach(function (jogador) {
        const elemento = elementoJogador(jogador)

        conteudo.appendChild(elemento)
    })
}

function inserirConteudos () {
    inserirEmConteudo(femininoConteudo, feminino)
    inserirEmConteudo(masculinoConteudo, masculino)
}
function iniciar() {
    if (sessionStorage.getItem('logged') === 'true') {
        authUser()
        
        return
    }
}

function authUser() {
    const login = document.querySelector('#login')
    const app = document.querySelector('#app')

    login.classList.add('esconder')
    app.classList.remove('esconder')
    sessionStorage.setItem('logged', 'true')
        
    const inputPesquisa = document.querySelector('#pesquisa')
    buscarJogadores('all')
    inputPesquisa.addEventListener('keyup', function(e){
        pesquisar(e.target.value?.toLowerCase());
    })
}

function login () {
    const input = document.querySelector('#login input')
    let criptografado = hex_sha256(input.value);
    if (criptografado === 'ad820de7200cf1c42d0d28465b4df85b287363e8b48c5241845eb74b5a93632f') {
        authUser()
        inserirConteudos()
    } else {
        alert('Senha incorreta!')
    }
}

function pesquisar(nome) {

    let pesquisafeminino = feminino.filter((jogador) => {
        return jogador.nome.toLowerCase().indexOf(nome) > -1;
    })

    let pesquisaMasculino = masculino.filter((jogador) => {
        return jogador.nome.toLowerCase().indexOf(nome) > -1;
    })

    inserirEmConteudo(femininoConteudo, pesquisafeminino)
    inserirEmConteudo(masculinoConteudo, pesquisaMasculino)
}

function sair() {
    window.sessionStorage.removeItem("logged");
    window.location.reload();
  }

function buscarJogadores(modalidade) {
    fetch("https://botafogo-atletas.mange.li/2024-1/" + modalidade)
    .then(function (resposta) {
        return resposta.json();
        })
    .then(function (lista) {
        jogadores = lista;
        feminino = jogadores.filter((jogador) => jogador.elenco === 'feminino')
        masculino = jogadores.filter((jogador) => jogador.elenco === 'masculino')
        
        
        femininoConteudo.closest('#feminino').classList.remove('esconder')
        masculinoConteudo.closest('#masculino').classList.remove('esconder')

        if(modalidade === 'masculino') {
            femininoConteudo.closest('#feminino').classList.add('esconder')
            masculinoConteudo.closest('#masculino').classList.remove('esconder')
        } else if(modalidade === 'feminino') {
            femininoConteudo.closest('#feminino').classList.remove('esconder')
            masculinoConteudo.closest('#masculino').classList.add('esconder')
        }

        inserirConteudos()
    })
    .catch(function (erro) {
        alert("Erro ao obter os dados.");
    });
} 

iniciar()