const html = document.querySelector('html');
//botoes
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

//fundo
const banner = document.querySelector('.app__image');

//botoes
const botoes = document.querySelectorAll('.app__card-button');

//foco ativo
let abaAtiva = 'foco';

//titulo principal
const titulo = document.querySelector('.app__title');

//carrega musica de fundo
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

// tempo decorrido inicial e botao do temporizador
let tempoDecorridoEmSegundos = 1500;
const startPauseBt = document.querySelector('#start-pause');
let intervaloId;

//carrega toque de play, pause e tempo finalizado
const botaoSpan = document.querySelector('#start-pause span');
const botaoImg = document.querySelector('#start-pause img');
const toquePlay = new Audio('./sons/play.wav');
const toquePause = new Audio('./sons/pause.mp3');
const toqueTempoFinalizado = new Audio('./sons/beep.mp3');

//temporizador
const tempoNaTela = document.getElementById('timer');

//executa toque de play e pause
startPauseBt.addEventListener('click', () => {
    if(botaoSpan.textContent == 'Começar' || botaoSpan.textContent == 'Continuar'){
        toqueTempoFinalizado.pause();
        toquePlay.play()
        botaoImg.setAttribute('src', './imagens/pause.png');
        document.querySelector('#start-pause span').textContent = 'Pausar';
    } else {
        toquePause.play();
        botaoImg.setAttribute('src', './imagens/play_arrow.png');
        document.querySelector('#start-pause span').textContent = 'Continuar';
    }
})

//inicia a musica conforme chave de ativacao
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

//aguarda clique no foco para alterar estilo, fundo, titulo
focoBt.addEventListener('click', () => {
    abaAtiva = 'foco';
    tempoDecorridoEmSegundos = 1500;
    alterarContexto ('foco');
    focoBt.classList.add('active');
});

//aguarda clique no descanso curto para alterar estilo, fundo, titulo
curtoBt.addEventListener('click', () => {
    abaAtiva = 'descanso-curto';
    tempoDecorridoEmSegundos = 300;
    alterarContexto ('descanso-curto');
    curtoBt.classList.add('active');
});

//aguarda clique no descanso longo para alterar estilo, fundo, titulo
longoBt.addEventListener('click', () => {
    abaAtiva = 'descanso-longo';
    tempoDecorridoEmSegundos = 900;
    alterarContexto ('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto (contexto){
    //atualiza temporizador por contexto
    mostrartempo();
    
    //para cada botao, remove a classe active
    botoes.forEach( function (contexto){
        contexto.classList.remove('active');
    } );


    //muda cor de fundo e imagem principal
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`./imagens/${contexto}.png`);

    //muda titulo principal de acordo com contexto
    switch(contexto){
        case "foco":
        titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;

        case "descanso-curto":
            titulo.innerHTML = `Quer dar uma respirada?<br>
            <strong class="app__title-strong"> Faça uma pausa curta.</strong>`;
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}
//efetua o decrescimento de 1 a cada 1 segundo
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        toqueTempoFinalizado.play();
        alert('Tempo finalizado!')
        zerar();
        botaoImg.setAttribute('src', './imagens/play_arrow.png');
        document.querySelector('#start-pause span').textContent = 'Começar';
        if(abaAtiva == 'foco'){
            tempoDecorridoEmSegundos = 1500;
        } else if(abaAtiva == 'descanso-curto'){
            tempoDecorridoEmSegundos = 300;
        } else if (abaAtiva == 'descanso-longo'){
            tempoDecorridoEmSegundos = 900;
        }
        mostrartempo();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrartempo();
}
//inicia a contagem regrassiva ao clicar no botao
startPauseBt.addEventListener('click', iniciarOuPausar);

//executa a contagem regrassiva a cada segundo
function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null;
}

function mostrartempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrartempo();
