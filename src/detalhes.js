const jogadorJson = localStorage.getItem('jogador')
const jogador = JSON.parse(jogadorJson)

const elementoJogador = document.querySelector('#jogador')

elementoJogador.querySelector('#img').setAttribute('src', jogador.imagem)
elementoJogador.querySelector('#nome').textContent = jogador.nome
elementoJogador.querySelector('#posicao').textContent = jogador.posicao
elementoJogador.querySelector('#descricao').textContent = jogador.descricao
elementoJogador.querySelector('#nome_completo').textContent = jogador.nome
elementoJogador.querySelector('#nascimento').textContent = jogador.nascimento
elementoJogador.querySelector('#altura').textContent = jogador.altura
elementoJogador.querySelector('#naturalidade').textContent = jogador.naturalidade
elementoJogador.querySelector('#n_jogos').textContent = jogador.n_jogos
