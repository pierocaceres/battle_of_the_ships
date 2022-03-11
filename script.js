class Ship {
    constructor(){
        this.location
        this.sunk = false
    }
    getLocation(){
        return this.location
    }
    getSunkValue(){
        return this.sunk
    }
    setLocation(value){
        this.location = value
    }
    setSunk(){
        this.sunk = true
    }
}

let counter = 0
let fleetSize = 5
let grid = 5
let player1Turn = true
let shipsPlaced = false
let winnerFound = false
let playerBoard = [] // Used for the computer to click a square and attack opponents ship.
let computerBoard = [] // Used to see where the computer plced his ships
let playerShips = []
let computerShips = []
let scoreBoard =[0,0]
const hitSound = new Audio()
hitSound.src = `Media/Explosion.m4a`
const playerArea = document.querySelector('.play-area')
const computerArea = document.querySelector(`.computer-area`)
const modalButton = document.getElementById(`openModal`)
const closeButton = document.getElementById(`closeModal`)

const openModal = () => {
    document.getElementById(`modal`).style.display = `block`
}

const closeModal = () => {
    document.getElementById(`modal`).style.display = `none`
}

const startGame = () => {
    if(scoreBoard[0] == 0 && scoreBoard[1] == 0){
        setTimeout(openModal, 500)
        createGrid()
        createShips()
    }else{
        createGrid()
        createShips()
    }
}

const createGrid = () => {
    playerArea.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    playerArea.style.gridTemplateColumns = `repeat(${grid}, 1fr)`

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `${i}`)
        sqr.setAttribute(`click`, `false`)
        playerArea.appendChild(sqr)

        playerBoard.push(i)
    }     
}

const player2Grid = () => {   
    computerArea.style.borderBottom = `1px solid black`
    computerArea.style.borderLeft =  `1px solid black`

    computerArea.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    computerArea.style.gridTemplateColumns = `repeat(${grid}, 1fr)`

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `${i}`)
        sqr.setAttribute(`click`, `false`)
        computerArea.appendChild(sqr)
        computerBoard.push(i)
    }

    document.getElementById(`p2Info`).style.opacity = `1`
}

const createShips = () => {
    let p1Ship1 = new Ship()
    let p1Ship2 = new Ship()
    let p1Ship3 = new Ship()
    let p1Ship4 = new Ship()
    let p1Ship5 = new Ship()
    let p2Ship1 = new Ship()
    let p2Ship2 = new Ship()
    let p2Ship3 = new Ship()
    let p2Ship4 = new Ship()
    let p2Ship5 = new Ship()
    
    playerShips = [p1Ship1, p1Ship2, p1Ship3, p1Ship4, p1Ship5]

    computerShips = [p2Ship1, p2Ship2, p2Ship3, p2Ship4, p2Ship5]
}

const randomClick = () => {
    if(!shipsPlaced){
        computerShips.forEach((ship) => {
            let randomIndex = Math.floor(Math.random()*computerBoard.length)
            let position = computerBoard[randomIndex]
            computerBoard.splice(randomIndex, 1)
            ship.setLocation(position)
        })
        // See where the computer placed ships
        console.log(`Computer's ships:`)
        console.log(computerShips)
    }
}

// Return true if hit | Return false if miss
const hit = (computerSquare) => {
    let hit = false

    computerShips.forEach(ship => {
        if(computerSquare == ship.getLocation()){
            hit = true
            ship.setSunk()
            hitSound.play()
        }
    })

    player1Turn = false
    return hit
}

const computerHit = () => {
    if(!player1Turn){
        let randomIndex = Math.floor(Math.random()*playerBoard.length)
        let position = playerBoard[randomIndex]
        playerBoard.splice(randomIndex, 1)
        let hit = false

        playerShips.forEach(ship => {
            if(position == ship.getLocation()){
                document.getElementById(`${position}`).style.background = `#e46161`
                hit = true
                ship.setSunk()
                hitSound.play()
                if(counter >= 5){
                    winner()
                }
            }else if(!hit){
                document.getElementById(`${position}`).style.background = `#b9b9b9`
            }
        })
        counter++
        player1Turn = true
    }
}

const winner = () => {
    if(playerShips[0].getSunkValue() && playerShips[1].getSunkValue() && playerShips[2].getSunkValue() && playerShips[3].getSunkValue() && playerShips[4].getSunkValue()){
        winnerFound = true
        scoreBoard[1]++
        document.getElementById(`computer-score`).innerText = scoreBoard[1]
        console.log(`Computer Wins!`)
    }else if(computerShips[0].getSunkValue() && computerShips[1].getSunkValue() && computerShips[2].getSunkValue() && computerShips[3].getSunkValue() && computerShips[4].getSunkValue()){
        winnerFound = true
        scoreBoard[0]++
        document.getElementById(`player-score`).innerText = scoreBoard[0]
        console.log(`Player Wins!`)
    }
    if(winnerFound){
        const playAgainButton = document.createElement(`button`)
        playAgainButton.setAttribute(`id`, `play-again`)
        playAgainButton.innerText = `Play Again`
        document.querySelector(`footer`).append(playAgainButton)

        playAgainButton.addEventListener(`click`, playAgain)
    }
}

const playAgain = () => {
    counter = 0
    player1Turn = true
    shipsPlaced = false
    winnerFound = false
    playerBoard.splice(0, playerBoard.length)
    computerBoard.splice(0, computerBoard.length)
    playerShips.splice(0, playerShips.length)
    computerShips.splice(0, computerShips.length)

    for(let i = 0; i < grid*grid; i++){
        playerArea.children[0].remove()
        computerArea.children[0].remove()
    }
    computerArea.style.border = `none`
    document.getElementById(`p2Info`).style.opacity = `0`
    startGame()
    document.getElementById(`play-again`).remove()
}

startGame()

playerArea.addEventListener('click', (zone) => {
    if(!shipsPlaced && zone.target.getAttribute(`click`) == `false`){
        playerShips[counter].setLocation(parseInt(zone.target.getAttribute('id')))
        zone.target.style.background = '#385170'
        zone.target.setAttribute(`click`, `true`)
        counter++
        if(counter >= 5){
            console.log(`Player's Ships:`)
            console.log(playerShips)
            player2Grid()
            randomClick()
            shipsPlaced = true
            //Reset counter to counting the rounds of the game
            counter = 0
        }
    }
})

computerArea.addEventListener(`click`, (zone) => {
    if(shipsPlaced && player1Turn && !winnerFound && zone.target.getAttribute(`click`) == `false`){
        zone.target.setAttribute(`click`, `true`)
        let square = parseInt(zone.target.getAttribute(`id`))
        if(hit(square)){
            zone.target.style.background = `#a8e6cf`
            if(counter >= 5){
                winner()
            }
        }else{
            zone.target.style.background = `#b9b9b9`
        }
        if(!winnerFound){
            setTimeout(computerHit, 1700)
        }
        counter++
    }
})

modalButton.addEventListener(`click`, openModal)
closeButton.addEventListener(`click`, closeModal)