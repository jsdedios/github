(function () {
    'use strict';

    const actionBtn = document.querySelector('#action-btn');
    const playerPill = document.querySelector('#player-pill');
    const statusMessage = document.querySelector('#status-message');
    const winnerOverlay = document.querySelector('#winner-overlay');
    const winnerMessage = document.querySelector('#winner-message');
    const resetBtn = document.querySelector('#reset-btn');
    const dice = document.querySelectorAll('.dice');
    const helpBtn = document.querySelector('#help-btn');
    const helpOverlay = document.querySelector('#help-overlay');
    const closeHelpBtn = document.querySelector('#close-help-btn');
    const goalValue = document.querySelector('#goal-value');

    const gameData = {
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 1,
        roll2: 2,
        roll3: 3,
        roll4: 4,
        roll5: 5,
        roll6: 6,
        rollSum: 0,
        index: 0,
        gameEnd: 100,
        gameStarted: false,
        isRolling: false
    };

    actionBtn.addEventListener('click', handleActionButton);
    resetBtn.addEventListener('click', resetGame);
    helpBtn.addEventListener('click', openHelpModal);
    closeHelpBtn.addEventListener('click', closeHelpModal);

    updatePlayerDisplay();
    updateGoalDisplay();

    function handleActionButton() {
        if (!gameData.gameStarted) {
            startGame();
            return;
        }

        if (!gameData.isRolling) {
            throwDice();
        }
    }

    function startGame() {
        gameData.gameStarted = true;
        gameData.index = 0;
        gameData.score = [0, 0];
        gameData.rollSum = 0;

        actionBtn.className = 'btn btn-primary roll-state';
        actionBtn.textContent = 'Roll Dice';

        winnerOverlay.className = 'overlay hidden';
        statusMessage.textContent = `${gameData.players[gameData.index]}'s turn. Roll the dice.`;
        updatePlayerDisplay();
        updateGoalDisplay();
    }

    function throwDice() {
        gameData.isRolling = true;
        actionBtn.disabled = true;

        gameData.roll1 = rollDie();
        gameData.roll2 = rollDie();
        gameData.roll3 = rollDie();
        gameData.roll4 = rollDie();
        gameData.roll5 = rollDie();
        gameData.roll6 = rollDie();

        const rolls = [
            gameData.roll1,
            gameData.roll2,
            gameData.roll3,
            gameData.roll4,
            gameData.roll5,
            gameData.roll6
        ];

        gameData.rollSum = 0;

        rolls.forEach(function (value, index) {
            gameData.rollSum += value;
            dice[index].className = `dice show-${value}`;
        });

        playRollSound();

        window.setTimeout(function () {
            resolveTurn();
            gameData.isRolling = false;
            actionBtn.disabled = false;
        }, 1000);
    }

    function resolveTurn() {
        const currentPlayer = gameData.players[gameData.index];

        if (gameData.rollSum % 2 === 0) {
            gameData.score[gameData.index] += gameData.rollSum;
            statusMessage.textContent = `${currentPlayer} rolled ${gameData.rollSum}. That's even, so ${gameData.rollSum} points were added.`;
            updateGoalDisplay();

            if (gameData.score[gameData.index] >= gameData.gameEnd) {
                endGame();
                return;
            }
        } else {
            statusMessage.textContent = `${currentPlayer} rolled ${gameData.rollSum}. That's odd, so the turn moves to the next player.`;
            switchPlayer();
        }

        updatePlayerDisplay();
    }

    function switchPlayer() {
        if (gameData.index === 0) {
            gameData.index = 1;
        } else {
            gameData.index = 0;
        }
    }

    function endGame() {
        const winner = gameData.players[gameData.index];
        winnerMessage.textContent = `${winner} wins with ${gameData.score[gameData.index]} points!`;
        winnerOverlay.className = 'overlay visible';
        actionBtn.disabled = true;
        updateGoalDisplay();
    }

    function resetGame() {
        gameData.score = [0, 0];
        gameData.roll1 = 1;
        gameData.roll2 = 2;
        gameData.roll3 = 3;
        gameData.roll4 = 4;
        gameData.roll5 = 5;
        gameData.roll6 = 6;
        gameData.rollSum = 0;
        gameData.index = 0;
        gameData.gameEnd = 100;
        gameData.gameStarted = false;
        gameData.isRolling = false;

        dice.forEach(function (die, index) {
            die.className = `dice show-${index + 1}`;
        });

        actionBtn.className = 'btn btn-primary start-state';
        actionBtn.textContent = 'Start Game';
        actionBtn.disabled = false;

        winnerOverlay.className = 'overlay hidden';
        statusMessage.textContent = 'Press start to begin.';
        updatePlayerDisplay();
        updateGoalDisplay();
    }

    function updatePlayerDisplay() {
        playerPill.textContent = gameData.index === 0 ? 'P1' : 'P2';
    }

    function updateGoalDisplay() {
        const highestScore = Math.max(gameData.score[0], gameData.score[1]);
        goalValue.textContent = gameData.gameEnd - highestScore;
    }

    function openHelpModal() {
        helpOverlay.className = 'overlay visible';
        helpOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeHelpModal() {
        helpOverlay.className = 'overlay hidden';
        helpOverlay.setAttribute('aria-hidden', 'true');
    }

    function rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function playRollSound() {
        const sfx = new Audio('sounds/roll.mp3');
        sfx.volume = 0.5;
        sfx.play().catch(function () {
            console.log('Roll sound could not play.');
        });
    }
})();
