class Ship {
    constructor(){
        this.location
        this.sunk = false
    }
    sunkValue(){
        return this.sunk
    }
    sunk(){
        this.sunk = true
    }
}

createGrid = () => {
    let playArea = document.querySelector(`.play-area`)
    let grid = 5

    playArea.style.gridTemplateRows = `repeat(${grid}, 1fr)`
    playArea.style.gridTemplateColumns = `repeat(${grid}, 1fr)`

    for(let i = 0; i < grid*grid; i++){
        let sqr = document.createElement('div')
        sqr.setAttribute(`class`, `square`)
        sqr.setAttribute(`id`, `${i}`)
        //sqr.style.borderWidth = `1px thin black`
        sqr.innerText = i
        playArea.appendChild(sqr)
    }     
}

createGrid()