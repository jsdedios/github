(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#btn btn-primary');

    const gameControl = document.querySelector('#gamecontrol');

    const game = document.querySelector('#game');

    const score = document.querySelector('#score');

    const actionArea = document.querySelector('#btn-primary');

    const gameData = {
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        roll3: 0,
        roll4: 0,
        roll5: 0,
        roll6: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 36
    };

  function playRollSound() {
        const sfx = new Audio('sounds/roll.mp3');
        sfx.volume = 0.5;
        sfx.play()
    }

    startGame.addEventListener('click', function () {
        //randomly set the game data, which will chose the player
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        console.log('set up the turn');
        setUpTurn();
    });

    function setUpTurn() {
        game.innerHTML = `<p> Roll the dice for the ${gameData.players}</p>`;

        actionArea.innerHTML = '<button id = "roll"> Rol the Dice</button>';

        document.querySelector('#roll').addEventListener('click', function () {
            console.log('Roll the Dice!');
            throwDice();
        });

    }
    function throwDice() {
        console.log('throwing')
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src = "images/${gameData.dice[gameData.roll1 - 1]}"> <img src="images/${gameData.dice[gameData.roll2 - 1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        playRollSound();

        //if what's rolled equates to a 36 (max roll)
        if( gameData.rollSum === 2){
           game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
        //    Setting the current score
        gameData.score[gameData.index] = 0
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        showCurrentScore();
        // Wait two seconds
        setTimeout(setUpTurn, 2000);
        }
        //if what's rolled equates to an even number
        else if (gameData.roll1 === 1 || gameData.roll2 ===1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `Sorry, one of your rolls was a one, switching it to ${gameData.players[gameData.index]}</p>`
            console.log('one of the two dice rolled a 1');
            setTimeout(setUpTurn, 2000);
        }
        //otherwise
        else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;

            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id = "pass"> Pass</button>';

            document.querySelector('#rollagain').addEventListener('click', function(){
                throwDice();
            });
            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            console.log('neither die was a 1, game continues...');
        }
        checkWinningCondition();
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.score[gameData.index]} wins with ${gameData.players[gameData.index]} points! </h2>`;

            actionArea.innerHTML = '';
            document.querySelector(`#quit`).innerHTML = 'Start a New Game?';
        } else{
            showCurrentScore()
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong> ${gameData.players[0]} : ${gameData.score[0]} </strong> and <strong>${gameData.players[1]} : ${gameData.score[1]}</strong></p>`;
    }

})();