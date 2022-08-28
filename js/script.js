/* ///////////////////////////////// */
// GAME ELEMENTS
// Accesses and provides access to elements from the DOM
// 1. Get the play-squares from the DOM
// 2. Get play-squares by the "id" defined in HTML
/* ///////////////////////////////// */

const gameElements = (function () {
  const _playSquares = document.querySelectorAll(".play-square");

  const getPlaySquare = (squareID) => {
    let _playSquare = document.getElementById(squareID);
    return _playSquare;
  };

  const getPlaySquares = () => {
    return _playSquares;
  };

  return {
    getPlaySquare,
    getPlaySquares,
  };
})();

/* ///////////////////////////////// */
// GAMEBOARD
// Manages data of play squares and checks wins
// 1. Set values of play squares
// 2. Get values of play squares
// 3. Clear values of play squares
// 4. Get number of play squares filled
// 5. Check if a win occurs
/* ///////////////////////////////// */

const gameBoard = (function () {
  let _contents = {};

  const getContents = () => {
    return _contents;
  };

  const setContents = (key, value) => {
    _contents[key] = value;
  };

  const clearContents = () => {
    _contents = {};
  };

  const getContentsLength = () => {
    return Object.keys(_contents).length;
  };

  const isTriplet = () => {
    if (
      _contents[0] !== undefined &&
      _contents[0] === _contents[1] &&
      _contents[1] === _contents[2]
    ) {
      // horizontals
      return [0, 1, 2];
    }
    if (
      _contents[3] !== undefined &&
      _contents[3] === _contents[4] &&
      _contents[4] === _contents[5]
    ) {
      return [3, 4, 5];
    }
    if (
      _contents[6] !== undefined &&
      _contents[6] === _contents[7] &&
      _contents[7] === _contents[8]
    ) {
      return [6, 7, 8];
    }

    // verticals
    if (
      _contents[0] !== undefined &&
      _contents[0] === _contents[3] &&
      _contents[3] === _contents[6]
    ) {
      return [0, 3, 6];
    }
    if (
      _contents[1] !== undefined &&
      _contents[1] === _contents[4] &&
      _contents[4] === _contents[7]
    ) {
      return [1, 4, 7];
    }
    if (
      _contents[2] !== undefined &&
      _contents[2] === _contents[5] &&
      _contents[5] === _contents[8]
    ) {
      return [2, 5, 8];
    }

    // diagonals
    if (
      _contents[0] !== undefined &&
      _contents[0] === _contents[4] &&
      _contents[4] === _contents[8]
    ) {
      return [0, 4, 8];
    }
    if (
      _contents[2] !== undefined &&
      _contents[2] === _contents[4] &&
      _contents[4] === _contents[6]
    ) {
      return [2, 4, 6];
    }

    return false;
  };

  return {
    getContents,
    setContents,
    clearContents,
    getContentsLength,
    isTriplet,
  };
})();

/* ///////////////////////////////// */
// PLAYER
// Player factory function
// 1. Create a player with a number and a unique mark
// 2. Make the player's mark in a play square
/* ///////////////////////////////// */

const Player = (number, mark) => {
  const markSquare = (player, playSquare) => {
    playSquare.textContent = player.mark;
  };

  return {
    number,
    mark,
    markSquare,
  };
};

/* ///////////////////////////////// */
// DISPLAY
// Helps with general display of the game
// 1. Clears gameboard after win
// 2. Displays win / tie
/* ///////////////////////////////// */

const displayController = (function () {
  const clearGameBoard = (contents) => {
    const playSquares = gameElements.getPlaySquares();

    playSquares.forEach((playSquare) => {
      playSquare.textContent = "";
    });
  };

  const displayWinner = (result) => {
    if (result === null) {
      console.log("It's a tie!");
    } else {
      console.log(`Player ${result} wins!`);
    }
  };

  return {
    clearGameBoard,
    displayWinner,
  };
})();

/* ///////////////////////////////// */
// GAME
// Controls overall game flow
// 1. Creates player objects
// 2. Manipulates play squares with player marks
// while keeping track of (alternate) clicks
// 3. Checks if a win happens and handles it by calling
// for an endGame
// 4. Adds and removes event listeners on startGame
// and endGame
/* ///////////////////////////////// */

const game = (function () {
  const _player1 = Player(1, "x");
  const _player2 = Player(2, "o");

  const _playSquares = gameElements.getPlaySquares();

  let _clickCounter = 0;
  const _playerClick = (e) => {
    let _playSquareID = e.target.id; // this is a string
    let _playSquare = gameElements.getPlaySquare(_playSquareID);
    let _playSquareContent = _playSquare.textContent;

    // prevent click count increase if already marked
    if (_playSquareContent === "") {
      _clickCounter++;
    }

    if (_clickCounter % 2 === 1 && _playSquareContent != _player2.mark) {
      _player1.markSquare(_player1, _playSquare);
      gameBoard.setContents(Number(_playSquareID), _playSquare.textContent);
    } else if (_playSquareContent != _player1.mark) {
      _player2.markSquare(_player2, _playSquare);
      gameBoard.setContents(Number(_playSquareID), _playSquare.textContent);
    }

    let triplet = gameBoard.isTriplet();
    if (triplet) {
      console.log("Triplet: ", triplet);
      let mark = gameElements.getPlaySquare(triplet[0]).textContent;
      game.endGame(mark);
    } else if (!triplet && gameBoard.getContentsLength() === 9) {
      console.log("NULL Triplet: ", triplet);
      game.endGame(null);
    }
  };

  const startGame = () => {
    gameBoard.clearContents();
    displayController.clearGameBoard();
    // displayController.clearWinner();

    _clickCounter = 0;

    // Add event listeners
    _playSquares.forEach((_playSquare) =>
      _playSquare.addEventListener("click", _playerClick)
    );
  };

  const endGame = (mark) => {
    let _winningPlayer;

    if (mark === null) {
      _winningPlayer = null;
    } else if (mark === _player1.mark) {
      _winningPlayer = _player1.number;
    } else {
      _winningPlayer = _player2.number;
    }

    displayController.displayWinner(_winningPlayer);

    // Remove event listeners
    _playSquares.forEach((_playSquare) =>
      _playSquare.removeEventListener("click", _playerClick)
    );
  };

  return {
    startGame,
    endGame,
  };
})();

game.startGame();
