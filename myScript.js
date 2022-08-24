const mainBox = document.querySelector(".main-box");
const box = document.getElementsByClassName("box");
const N = 9;
const EMPTY = 0;
let board = [];

function createCells() {
  let allCell = "";
  EmptyBoard();
  createBoard(0, 0);
  console.log(board);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      allCell += `<div class="box">${board[i][j]}</div>`;
    }
  }

  mainBox.innerHTML = allCell;
}
window.addEventListener("load", createCells);

function EmptyBoard() {
  for (let i = 0; i < N; i++) {
    let temp = [];
    for (let j = 0; j < N; j++) {
      temp.push(0);
    }
    board.push(temp);
  }
}

function createBoard(row, col) {
  if (col == N) {
    row++;
    col = 0;
  }
  if (row == N) return isLegal(board);

  let numbers = [];
  for (let i = 1; i <= N; i++) numbers.push(i);
  shuffle(numbers);
  for (let i = 0; i < numbers.length; i++) {
    board[row][col] = numbers[i];
    if (isLegal(board)) if (createBoard(row, col + 1)) return true;
  }
  board[row][col] = EMPTY;
  return false;
}
function shuffle(arr) {
  arr.forEach((element, i) => {
    let ind = Math.floor(Math.random() * N);
    let temp = arr[i];
    arr[i] = arr[ind];
    arr[ind] = temp;
  });
}

function isLegal(boardArr) {
  return checkRows(boardArr) && checkCols(boardArr) && checkSquares(boardArr);
}

function checkRows(boardArr) {
  return boardArr.every((row) => isValidArr(row));
}

function checkCols(boardArr) {
  for (let i = 0; i < N; i++) {
    let col = boardArr.map((row) => row[i]);
    if (!isValidArr(col)) return false;
  }
  return true;
}

function checkSquares(boardArr) {
  for (let i = 0; i < N; i += 3) {
    for (let j = 0; j < N; j += 3) {
      let arr = [];
      for (let k = i; k < i + 3; k++)
        for (let w = j; w < j + 3; w++) arr.push(boardArr[k][w]);
      if (!isValidArr(arr)) return false;
    }
  }
  return true;
}

function isValidArr(arr) {
  // console.log(arr);
  // let a = {};
  // arr.forEach((item) => {
  //   a[item] = item;
  // });

  // let b = Object.values(a);
  // console.log(a);

  // return false;

  let a = [];
  for (let i = 0; i <= N; i++) a.push(0);
  // if(a.every((element) => element == 1 || element == EMPTY)){
  //   console.log(a.every((element) => element == 1 || element == EMPTY),arr)
  // }
  arr.forEach((element) => a[element]++);
  a[0] = 0;

  return a.every((element) => element == 1 || element == EMPTY);
}
