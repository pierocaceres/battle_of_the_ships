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
    seeLocation(){
        return this.location
    }
    setSunk(){
        this.sunk = true
    }
}

let counter = 0
let fleetSize = 5
let grid = 5
let shipsPlaced = false
let playerBoard = []
let playerShips = []
let computerBoard = []
let playArea = document.querySelector('.play-area')

createGrid = () => {
    let playArea = document.querySelector(`.play-area`)

    playArea.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    playArea.style.gridTemplateColumns = `repeat(${grid}, 1fr)`

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `${i}`)
        playArea.appendChild(sqr)
    }     
}

player2Grid = () => {
    let sideBar = document.querySelector(`.computer-area`)

    sideBar.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    sideBar.style.gridTemplateColumns = `repeat(${grid}, 1fr)`
    console.log(document.querySelectorAll(`.square`))

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `c${i}`)
        sideBar.appendChild(sqr)
    }
    // for(let i = 0; i < grid*grid; i++){
    //     sideBar.append(document.querySelectorAll(`.square`)[i])
    // }
}

startGame = () => {
    createGrid()
    placeShips()
}

placeShips = () => {
    let ship1 = new Ship()
    let ship2 = new Ship()
    let ship3 = new Ship()
    let ship4 = new Ship()
    let ship5 = new Ship()
    playerShips = [ship1, ship2, ship3, ship4, ship5]
}

startGame()

playArea.addEventListener('click', (zone) => {
    if(!shipsPlaced){
        console.log(playerShips[counter])
        playerShips[counter].setLocation(zone.target.getAttribute('id'))
        zone.target.style.background = '#385170'
        counter++
        if(counter >= 5){
            shipsPlaced = true
            console.log(playerShips)
            player2Grid()
        }
    }
})