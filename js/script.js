const gameElements = (function () {
  const _playSpaces = document.querySelectorAll(".play-space");

  const getPlaySpaces = () => {
    return _playSpaces;
  };

  return {
    getPlaySpaces,
  };
})();

const gameBoard = (function () {
  // make private later (add underscore)
  let _contents = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];

  const getContents = () => {
    return _contents;
  };

  return {
    getContents,
  };
})();

const displayController = (function () {
  const renderContents = (contents) => {
    const playSpaces = gameElements.getPlaySpaces();

    let i = 0;
    playSpaces.forEach((playSpace) => {
      if (contents[i] === "x" || contents[i] === "o") {
        playSpace.textContent = contents[i];
      }
      i++;
    });
  };

  return {
    renderContents,
  };
})();

console.log(gameBoard, gameBoard.getContents());
displayController.renderContents(gameBoard.getContents());
