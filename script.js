class Ship {
    constructor(){
        this.location
        this.sunk = false
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

let fleetSize = 5
let playerBoard = []
let playerShips = []
let computerBoard = []
let playArea = document.querySelector('.play-area')

createGrid = () => {
    let playArea = document.querySelector(`.play-area`)
    let grid = 5

    playArea.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    playArea.style.gridTemplateColumns = `repeat(${grid}, 1fr)`

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `${i}`)
        playArea.appendChild(sqr)
    }     
}

startGame = () => {
    createGrid()

    //Player sets his ships on the board
    placeShips()
}

placeShips = () => {
    let counter = 0
    let ship1 = new Ship()
    let ship2 = new Ship()
    let ship3 = new Ship()
    let ship4 = new Ship()
    let ship5 = new Ship()
    playerShips = [ship1, ship2, ship3, ship4, ship5]
    console.log(playerShips)
}

startGame()

playArea.addEventListener('click', (zone) => {
    playerShips[counter].setLocation(zone.target.getAttribute('id'))
    counter++
})