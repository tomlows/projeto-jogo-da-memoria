const cardEasy = ['fa-ambulance', 'fa-bicycle', 'fa-bus', 'fa-car', 'fa-fighter-jet', 'fa-motorcycle'], 
    cardNormal = ['fa-anchor', 'fa-bomb', 'fa-camera', 'fa-cut', 'fa-gamepad', 'fa-gem', 'fa-headphones', 'fa-lightbulb'],
    cardHard = ['fa-baseball-ball', 'fa-basketball-ball', 'fa-bowling-ball', 'fa-football-ball', 'fa-futbol', 'fa-golf-ball', 'fa-table-tennis', 'fa-volleyball-ball', 'fa-quidditch', 'fa-hockey-puck'];

let upsetCards = [],
    match = 0,
    move = 0,
    star = 0,
    difficulty = '',
    initTimer = false,
    seconds = 0,
    minutes = 0,
    sec = 0;

// ADICIONANDO O CARD PELO JS NA PAGINA
function addCard(card) {
    $('.deck').append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
}

// USANDO A CLASSE SHUFFLE PARA EMBARALHAR AS CARTAS E ADICIONAR NA PAGINA
function randomCard(option) {
    for (let i = 0; i < 2; i++) {
        option = shuffle(option);
        option.forEach(addCard);
    }
}

// CLASSE PARA RANDOMIZAR AS CARTAS
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// FUNCAO DO TIMER COM MINUTOS E SEGUNDOS
function startTimer() {
    if(!initTimer){
        initTimer = true;
        function timer(val) { return val > 9 ? val : "0" + val; }
        this.interval = setInterval(function () {
            seconds = timer(++sec % 60);
            minutes = timer(parseInt(sec / 60, 10) % 60);
            $("#seconds").html(seconds);
            $("#minutes").html(minutes);
        }, 1000);
    }
}

// FUNCAO DOS MOVIMENTOS E DAS ESTRELAS
function actionMove(){
    move++;
    $(".move").html(move);

    if(move <= 12) {
        star = 3;
    } else if(move > 12 && move <= 20) {
        $("#third-star").removeClass("fa-star").addClass("fa-star-o");
        star = 2;
    } else if (move > 20 && move <= 28) {
        $("#second-star").removeClass("fa-star").addClass("fa-star-o");
        star = 1;
    }
}

// FUNÇÃO DE COMBINAÇÃO
function actionMatch(){
    match++;
    $("#match").html(match);
}

// MODAL DE VENCEDOR
function modalWinner() {
    setTimeout(() => {
        $('#modalWinner').css("display", "block").addClass('zoomIn');
        $('.score').append(`<p>Dificuldade: ${difficulty}</p><p>Com ${move} movimentos e ${star} estrela(s)</p><p>Tempo: ${minutes} minutos e ${seconds} segundos</p><br>`);
    }, 1000);
}

// FUNÇÃO DE DIFICULDADE
function modalOptions() {
    $('#modalWinner').css("display", "none");
    $('#modalOptions').css("display", "block");

    $("#easy").on("click", function() {
        $('#modalOptions').css("display", "none");
        difficulty = 'Facil';
        randomCard(cardEasy);
        cardAction();
    });

    $("#normal").on("click", function() {
        $('#modalOptions').css("display", "none");
        difficulty = 'Normal';
        randomCard(cardNormal);
        cardAction();
    });

    $("#hard").on("click", function() {
        $('#modalOptions').css("display", "none");
        difficulty = 'Dificil';
        randomCard(cardHard);
        cardAction();
    });
}

// VENCENDO A PARTIDA
function winnerAction(){
    if(difficulty === 'Facil' && match === 6) {
        modalWinner();
    } else if (difficulty === 'Normal' && match === 8) {
        modalWinner();
    } else if(difficulty === 'Dificil' && match === 10) {
        modalWinner();
    }    
}

// AÇÕES PARA ADICIONAR AS CLASSES (OPEN, SHOW, ERROR, MATCH) QUANDO TIVER CLIQUE NA CLASSE CARD
selected = false;
function cardAction() {
	$('.deck').on('click','.card:not(".match, .open")', function() {

        startTimer();
        $(this).toggleClass('open show');
        upsetCards.push($(this));
        
        if (upsetCards.length == 2) {
            actionMove();
            if (upsetCards[0].children().attr("class") === upsetCards[1].children().attr("class")) {
                actionMatch();
                $('.open').addClass('match flash');
                setTimeout(() => { $('.match').removeClass('open show error'); }, 600);
                winnerAction();
            } else {
                $('.open').addClass('error shake');
                setTimeout(() => { $('.card').removeClass('open show error shake'); }, 600);
            }
            upsetCards = [];
        }
        
    });
}

// FUNCAO DE RESTART
function restartGame () {
    $(".restart").on ("click", function() {
        location.reload();
    });
}
restartGame();

// FUNÇÃO PARA INICIAR O GAME
function initGame() {
    modalOptions();
};

initGame();