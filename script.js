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
let playerBoard = []
let computerBoard = []
let playerShips = []
let computerShips = []
let playerArea = document.querySelector('.play-area')
let computerArea = document.querySelector(`.computer-area`)

const startGame = () => {
    createGrid()
    createShips()
}

const createGrid = () => {
    let playArea = document.querySelector(`.play-area`)

    playArea.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    playArea.style.gridTemplateColumns = `repeat(${grid}, 1fr)`

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `${i}`)
        playArea.appendChild(sqr)

        playerBoard.push(i)
    }     
}

const player2Grid = () => {
    let sideBar = document.querySelector(`.computer-area`)

    sideBar.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    sideBar.style.gridTemplateColumns = `repeat(${grid}, 1fr)`

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `${i}`)
        sideBar.appendChild(sqr)
        computerBoard.push(i)
    }
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
                if(counter >= 5){
                    winner()
                }
            }else if(!hit){
                document.getElementById(`${position}`).style.background = `#b9b9b9`
            }
        })
        player1Turn = true
    }
}

const winner = () => {
    if(playerShips[0].getSunkValue() && playerShips[1].getSunkValue() && playerShips[2].getSunkValue() && playerShips[3].getSunkValue() && playerShips[4].getSunkValue()){
        winnerFound = true
        console.log(`Computer Wins!`)
    }else if(computerShips[0].getSunkValue() && computerShips[1].getSunkValue() && computerShips[2].getSunkValue() && computerShips[3].getSunkValue() && computerShips[4].getSunkValue()){
        winnerFound = true
        console.log(`Player Wins!`)
    }
}

startGame()

playerArea.addEventListener('click', (zone) => {
    if(!shipsPlaced){
        playerShips[counter].setLocation(parseInt(zone.target.getAttribute('id')))
        zone.target.style.background = '#385170'
        counter++
        if(counter >= 5){
            console.log(playerShips)
            player2Grid()
            randomClick()
            shipsPlaced = true
        }
    }
})

computerArea.addEventListener(`click`, (zone) => {
    if(shipsPlaced && player1Turn && !winnerFound){
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
            setTimeout(computerHit, 500)
        }
        counter++
    }
})