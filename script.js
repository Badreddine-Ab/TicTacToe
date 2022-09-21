const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

const form = document.getElementById('form')
let name1 = document.getElementById('name1') 
let name2 = document.getElementById('name2') 
let error1 = document.getElementById('error1')
let error2 = document.getElementById('error2')
const section1 = document.querySelector('.form')
const section2 = document.querySelector('.game')
const player1 = document.querySelector('.player1')
const player2 = document.querySelector('.player2')
const point1 = document.querySelector('.player1Points')
const point2 = document.querySelector('.player2Points')
const square = document.querySelector('.grid-item')
let points1 = 0
let points2 = 0
let error = false

let scores = {
  score1 : 0,
  score2 : 0
}

let Players = {
    player1 : '',
    player2 : ''
}

form.addEventListener('submit', (e) => {    
    if(!name1.value ){
        error1.innerText = 'Please enter The first name'
        error = true
    }else{
        error1.innerText = ''
        error = false
    }
    if(!name2.value){
        error2.innerText = 'Please enter The second name'
        error = true
    }else{
        error2.innerText = ''
        error = false
    }
   
    if(name1.value || name2.value){
        Players.player1 = name1.value
        Players.player2 = name2.value
        let names = JSON.stringify(Players)
        localStorage.setItem('Players',names)
        
        let namesLoacl = JSON.parse(localStorage.getItem('Players'))
        console.log(namesLoacl)

        section1.style.display = 'none'
        section2.style.display = 'block'
       
    }
    
        e.preventDefault();
    
})


startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)

  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

// function CalculateWinner(){
//   if( winningMessageTextElement.innerText == 'O's Winns! ')
// }