
window.onload = function() {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const announcer = document.querySelector('.annoruncer');
  var display = document.getElementById('displayMessage');
  const playerX = 'X';
  const playerO = 'O';
  const players = [playerX, playerO];
  var currentPlayer = randomElement(players);
  var symbol;

  tiles.forEach(tile => {
    tile.addEventListener('click', function() {
      if (validTile(tile)) {
        draw(tile);

        socket.emit('makeMove', { // Valid move(on client side) -> emit to server
          symbol: symbol,
          tileId: tile.id
        });

        changeDisplayPlayer();
        changeCurrentPlayer();
      }
    });
  });

  socket.on('moveMade', (data) => {
    var tile = tiles[data.tileId];
    tile.innerText = data.symbol;
    addClass(tile, data.symbol);
    checkWinner(tile);
  });

  socket.on('gameBegin', function(data) {
    symbol = data.symbol; // The server is assigning the symbol
    display.innerText = currentPlayer;
  })

  socket.on('boardCleared', function() {
    clearBoard();
  });

  document.getElementById('newGame').addEventListener('click', function() {
    socket.emit('clearBoard');
  });

  function validTile(tile) {
    // if (tileIsEmpty(tile) && announcer.className.includes('hide')) {
    if (tileIsEmpty(tile)) {
      return true;
    } else {
      return false;
    }
  }

  function tileIsEmpty(tile) {
    return tile.innerText == '' ? true : false;
  }

  function changeDisplayPlayer() {
    var oldPlayer = currentPlayer;
    
    var newPlayer = currentPlayer == 'X' ? 'O' : 'X';

    display.innerText = newPlayer;
    removeClass(display, oldPlayer);
    addClass(display, newPlayer);
  }

  function changeCurrentPlayer() {
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  }

  function removeClass(element, text) {
    element.classList.remove(`player${text}`);
  }

  function addClass(element, text) {
    element.classList.add(`player${text}`);
  }

  function draw(tile) {
    tile.innerText = currentPlayer;
    addClass(tile, currentPlayer);
    checkWinner(tile);
  }

  function randomElement(array) {
    return array[Math.floor(Math.random()*array.length)];
  }

  function clearBoard() {
    currentPlayer = 'X';
    removeClass(display, display.innerText);
    addClass(display, currentPlayer);
    // addClass(announcer, 'hide');

    display.innerText = currentPlayer;
      tiles.forEach(tile => {
        removeClass(tile, tile.innerText);
        tile.innerText = '';
      });
  }

  function checkWinner(tile) {
    var tileIndex = parseInt(tile.id);

    switch (tileIndex) {
      case 0:
        if (
          checkHorizontally(tileIndex) ||
          checkVertically(tileIndex) ||
          checkDiagonallyDesc()
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 1:
        if (
          checkHorizontally(0) ||
          checkVertically(tileIndex)
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 2:
        if (
          checkHorizontally(0) ||
          checkVertically(tileIndex) ||
          checkDiagonallyAsc()
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 3:
        if (
          checkHorizontally(tileIndex) ||
          checkVertically(0)
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 4:
        if (
          checkHorizontally(3) ||
          checkVertically(1) ||
          checkDiagonallyAsc() ||
          checkDiagonallyDesc()
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 5:
        if (
          checkHorizontally(3) ||
          checkVertically(2)
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 6:
        if (
          checkHorizontally(tileIndex) ||
          checkVertically(0) ||
          checkDiagonallyAsc()
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 7:
        if (
          checkHorizontally(6) ||
          checkVertically(1)
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
      case 8:
        if (
          checkHorizontally(6) ||
          checkVertically(2) ||
          checkDiagonallyDesc()
          ) {
            announceWinner();
          } else if(checktie() == true) {
            announcetie();
          }
        break;
    }
  }

  function checkHorizontally(tileIndex) {
    if (
      tiles[tileIndex].innerText == currentPlayer &&
      tiles[tileIndex + 1].innerText == currentPlayer &&
      tiles[tileIndex + 2].innerText == currentPlayer
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkVertically(tileIndex) {
    if (
      tiles[tileIndex].innerText == currentPlayer &&
      tiles[tileIndex + 3].innerText == currentPlayer &&
      tiles[tileIndex + 6].innerText == currentPlayer
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkDiagonallyAsc() {
    if (
      tiles[6].innerText == currentPlayer &&
      tiles[4].innerText == currentPlayer &&
      tiles[2].innerText == currentPlayer
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkDiagonallyDesc() {
    if (
      tiles[0].innerText == currentPlayer &&
      tiles[4].innerText == currentPlayer &&
      tiles[8].innerText == currentPlayer
    ) {
      return true;
    } else {
      return false;
    }
  }

  function announceWinner() {
    // removeClass(announcer, 'hide');
    display.innerHTML = `Player <span class=player${currentPlayer}>${currentPlayer}</span> Won`;
  }

  function checktie() {
    var allTiles = Array.from(document.querySelectorAll('.tile'));
    for (let i = 0; i < allTiles.length; i++) {
      if (allTiles[i].innerText == '') {
        return false;
      }
    }
    return true;
  }

  function announcetie() {
    // removeClass(announcer, 'hide');
    // announcer.innerText = 'Tie';
  }
}
