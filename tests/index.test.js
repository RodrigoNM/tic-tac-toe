/**
 * @jest-environment jsdom
 */

const {
  validateClick,
  tileIsEmpty,
  changeDisplayPlayer,
  changeCurrentPlayer,
  draw,
  clearBoard,
  checkWinner,
  checkHorizontally,
  checkVertically,
  checkDiagonallyAsc,
  checkDiagonallyDesc,
  announceWinner,
  checktie,
  announcetie
} = require('../public/javascripts/index');

describe('tileIsEmpty', () => {
  document.body.innerHTML = `
  <section class="display">Player <span id="display-player">X</span>'s turn </section>
  <section class="container">
    <div class="tile" id="0"></div>
    <div class="tile" id="1"></div>
    <div class="tile" id="2"></div>
    <div class="tile" id="3"></div>
    <div class="tile" id="4"></div>
    <div class="tile" id="5"></div>
    <div class="tile" id="6"></div>
    <div class="tile" id="7"></div>
    <div class="tile" id="8"></div>
  </section>
  <section class="display announcer hide"></section>
  <section class="controls">
    <button id="reset">Reset</button>
  </section>
`;
  var tile = document.getElementById('0');
  test('resturns true if tile is empty', () => {
    console.log(tile.value);
    expect(tileIsEmpty(tile)).toBeTruthy();
    
  });
  
  test('resturns false if tile is not empty', () => {
    console.log(tile.value);
    tile.value = 'X';
    console.log(tile.value);
    expect(tileIsEmpty(tile)).toBeFalsy();
  });
});
