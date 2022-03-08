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
let playerBoard = []
let computerBoard = []
let playerShips = []
let computerShips = []
let playerArea = document.querySelector('.play-area')
let computerArea = document.querySelector(`.computer-area`)

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

const startGame = () => {
    createGrid()
    createShips()
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
        console.log(computerShips)
    }
}

// Return true if hit | Return false if miss
const hit = (computerSquare) => {
    if(player1Turn){
        let hit = false
        computerShips.forEach(ship => {
            console.log(`${computerSquare} | ${ship.location}`)
            if(computerSquare == ship.location){
                hit = true
            }
        })

        player1Turn = false
        return hit
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
    if(shipsPlaced){
        let square = parseInt(zone.target.getAttribute(`id`))
        if(hit(square)){
            zone.target.style.background = `#a8e6cf`
        }
    }
})