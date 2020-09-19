import Lee from "./Lee.module.js"

function getModule() {
    return document.getElementById("module")
}

function loadImages(color, resolve, reject) {
    let imageCounter = 0
    let left = new Image()
    let right = new Image()
    let errorLoading = e => {
        reject(e)
    }
    let setCounter = e => {
        ++imageCounter
        if (imageCounter == 2) {
            // all images have been loaded
            resolve({
                "ghost_left" : left,
                "ghost_right" : right
            })
        }
    }
    left.addEventListener( "load", setCounter )
    left.addEventListener( "error", errorLoading ) 
    left.src = "../assets/images/ghost_" + color + "_1.png"
    right.addEventListener( "load", setCounter )
    right.addEventListener( "error", errorLoading )
    right.src = "../assets/images/ghost_" + color + "_2.png"
}

function randomDestination(posx, posy, grid, xsize, ysize, range) {
    let destx, desty
    do {
        let ang = Math.floor(Math.random() * 360)
        let dx = Math.floor(range * Math.cos(ang * Math.PI / 180)) + 1
        let dy = Math.floor(range * Math.sin(ang * Math.PI / 180)) + 1
        destx = posx + dx
        desty = posy + dy
        if (destx < 0)
            destx = 0
        else if (destx >= xsize)
            destx = xsize - 1
        if (desty < 0)
            desty = 0
        else if (desty >= ysize)
            desty = ysize - 1
    } while(grid[destx][desty] == "WALL")
    return {
        "destx" : destx,
        "desty" : desty
    }
}

function PacManDestination(posx, posy, xlength, ylength, grid, xsize, ysize, range) {
    let destx, desty
    let gotoPacMan = false
    if (getModule().pacman) {
        let diffx = Math.abs(posx * xlength - getModule().pacman.getPosition().x) / xlength
        let diffy = Math.abs(posy * ylength - getModule().pacman.getPosition().y) / ylength
        if (diffx < range && diffy < range && (diffx > 0 || diffy > 0)) {
            let px = getModule().pacman.getPosition().x
            let py = getModule().pacman.getPosition().y
            destx = (px - px % xlength) / xlength
            desty = (py - py % ylength) / ylength
            if (grid[destx][desty] != "WALL") {
                gotoPacMan = true
            }
        }
    }
    return {
        "gotoPacMan" : gotoPacMan,
        "destx" : destx,
        "desty" : desty
    }
}


export default class Ghost {

    constructor(id, color, xsize, ysize, xlength, ylength, margin, grid, step, range) {
        this.id = id
        this.color = color
        this.xsize = xsize
        this.ysize = ysize
        this.xlength = xlength
        this.ylength = ylength
        this.grid = grid
        this.margin = margin
        this.step = step
        this.range = range
        this.ia = new Lee()
        let u = randomDestination(
            this.xsize >> 1,
            this.ysize >> 1,
            this.grid,
            this.xsize,
            this.ysize,
            this.range)
        // a ghost starts its turn at the middle of the board
        // objectivex and objectivey are destination based on the lee algorithm
        let r = PacManDestination(
            u.destx,
            u.desty,
            this.xlength,
            this.ylength,
            this.grid,
            this.xsize,
            this.ysize,
            this.range)
        if (!r.gotoPacMan) {
            r = randomDestination(
                u.destx,
                u.desty,
                this.grid,
                this.xsize,
                this.ysize,
                this.range)
        }
        this.objectivex = r.destx
        this.objectivey = r.desty
        this.mesh = this.ia.makeMesh(this.grid, this.xsize, this.ysize, this.objectivex, this.objectivey)
    // currentx and currenty are the pixel's position of the ghost
        this.currentx = u.destx * this.xlength
        this.currenty = u.desty * this.ylength
        // destinationx and destinationy are the pixel's position of the smallest move
        this.destinationx = this.currentx
        this.destinationy = this.currenty
        this.thrill = false
    }

    init(acknowledge) {
        const promise = new Promise( (resolve, reject) => {
            loadImages(this.color, resolve, reject )
        } ).then( images => {
            this.images = images
            this.currentImage = this.images.ghost_left
            acknowledge()
        } ).catch( error => console.log(error) )
    }

    searchNextDestination() {
        let nextArea
        let areax = (this.currentx - this.currentx % this.xlength) / this.xlength
        let areay = (this.currenty - this.currenty % this.ylength) / this.ylength

        let dir = this.ia.test(this.mesh, areax, areay, this.xsize, this.ysize)
        // special case with none when it not exists a path
        if (dir == 'end' || dir == 'none') {

            let r = PacManDestination(
                areax,
                areay,
                this.xlength,
                this.ylength,
                this.grid,
                this.xsize,
                this.ysize,
                this.range)
            if (!r.gotoPacMan) {
                r = randomDestination(
                    areax,
                    areay,
                    this.grid,
                    this.xsize,
                    this.ysize,
                    this.range)
            }
            this.objectivex = r.destx
            this.objectivey = r.desty
            this.mesh = this.ia.makeMesh(this.grid, this.xsize, this.ysize, this.objectivex, this.objectivey)
            dir = this.searchNextDestination()
    
        } else if (dir == 'top')
            this.destinationy = this.currenty - this.ylength
        else if (dir == 'bottom')
            this.destinationy = this.currenty + this.ylength
        else if (dir == 'left')
            this.destinationx = this.currentx - this.xlength
        else if (dir == 'right')
            this.destinationx = this.currentx + this.xlength

        return dir
    }

    goToDestination() {
        this.previousx = this.currentx
        this.previousy = this.currenty

        switch(this.currentOrientation) {
            case 'end':
                // ghost is at destination
                break
            case 'left':
                if (Math.abs(this.currentx - this.destinationx) <= this.step) {
                    this.currentx = this.destinationx
                    this.currentOrientation = this.searchNextDestination()
                }
                else
                    this.currentx -= this.step
               break
            case 'right':
                if (Math.abs(this.currentx - this.destinationx) <= this.step) {
                    this.currentx = this.destinationx
                    this.currentOrientation = this.searchNextDestination()
                }
                else
                    this.currentx += this.step
                break
            case 'top':
                if (Math.abs(this.currenty - this.destinationy) <= this.step) {
                    this.currenty = this.destinationy
                    this.currentOrientation = this.searchNextDestination()
                }
                else
                    this.currenty -= this.step
                break
            case 'bottom':
                if (Math.abs(this.currenty - this.destinationy) <= this.step) {
                    this.currenty = this.destinationy
                    this.currentOrientation = this.searchNextDestination()
                }
                else
                    this.currenty += this.step
                break
            default:
                this.currentOrientation = this.searchNextDestination()
                break
        }
    }

    draw(context) {

        context.clearRect(this.previousx + this.xlength / 8 - this.step + this.margin.left,
                          this.previousy + this.xlength / 8 - this.step + this.margin.top,
                          this.xlength / 1.3 + this.step * 2,
                          this.ylength / 1.3 + this.step * 2)

        context.drawImage(this.currentImage,
                          this.currentx + this.xlength / 8 + this.margin.left,
                          this.currenty + this.ylength / 8 + this.margin.top,
                          this.xlength / 1.3,
                          this.ylength / 1.3)


    }

    thriller() {
        
        if (this.thrill)
            this.currentImage = this.images.ghost_left
        else
            this.currentImage = this.images.ghost_right
        this.thrill = !this.thrill
    }

    fear() {

        let pacman = getModule().pacman
        let pacmanx = (pacman.currentx - pacman.currentx % pacman.xlength) / pacman.xlength
        let pacmany = (pacman.currenty - pacman.currenty % pacman.ylength) / pacman.ylength

        let ghostx = (this.currentx - this.currentx % this.xlength) / this.xlength
        let ghosty = (this.currenty - this.currenty % this.ylength) / this.ylength

        if (pacmanx == ghostx && pacmany == ghosty)
            getModule().loop.setStatus("startblink")
    }

}