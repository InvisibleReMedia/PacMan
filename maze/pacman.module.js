
function getModule() {
    return document.getElementById("module")
}


function loadImages(resolve, reject) {
    let imageCounter = 0
    let pacmanImages = []
    let pacmanSources = [
        "pacman1_bottom.png",
        "pacman2_bottom.png",
        "pacman1_left.png",
        "pacman2_left.png",
        "pacman1_right.png",
        "pacman2_right.png",
        "pacman1_top.png",
        "pacman2_top.png"
    ]
    let errorLoading = e => {
        reject(e)
    }
    let setCounter = e => {
        ++imageCounter
        if (imageCounter == pacmanImages.length) {
            // all images have been loaded
            // formatting
            let images = {}
            let names = [ "bottom", "left", "right", "top" ]
            let opt = [ "true", "false" ]
            for(let [i,x] of pacmanImages.entries()) {
                if (typeof images[names[(i - i%2) / 2]] == "undefined")
                    images[names[(i - i%2) / 2]] = {}
                images[names[(i - i%2)/2]][opt[i%2]] = x
            }
            resolve(images)
        }
    }
    for(let x = 0; x < 8; ++x) {
        pacmanImages[x] = new Image()
        pacmanImages[x].addEventListener( "load", setCounter )
        pacmanImages[x].addEventListener( "error", errorLoading ) 
        pacmanImages[x].src = pacmanSources[x]
    }
}

function selectCurrentImage(eating, orientation, images) {
    return images[orientation][eating.toString()]
}

export default class PacMan {


    // xsize : # cases en x
    // ysize : # cases en y
    // xlength : longueur d'une case en px
    // ylength : hauteur d'une case en px
    // margin : left, right, top, bottom
    // grid : board data
    // startx : case x départ
    // starty : case y départ
    // step : pas en px
    constructor(xsize, ysize, xlength, ylength, margin, grid, startx, starty, step) {
        getModule().pacman = this
        this.xsize = xsize
        this.ysize = ysize
        this.xlength = xlength
        this.ylength = ylength
        this.margin = margin
        this.grid = grid
        this.startx = startx * xlength
        this.starty = starty * ylength
        this.destinationx = (startx + 1) * xlength
        this.destinationy = starty * ylength
        this.currentx = this.startx
        this.currenty = this.starty
        this.step = step
        this.currentOrientation = "right"
        this.previousOrientation = "none"
        this.eating = false
    }

    init(acknowledge) {
        const promise = new Promise( (resolve, reject) => {
            loadImages( resolve, reject )
        } ).then( images => {
            this.images = images
            acknowledge()
        } ).catch( error => console.log(error) )
    }

    setOrientation(orientation) {
        this.previousOrientation = this.currentOrientation
        this.currentOrientation = orientation
    }
    
    searchNextDestination() {
        let nextArea
        let areax = (this.currentx - this.currentx % this.xlength) / this.xlength
        let areay = (this.currenty - this.currenty % this.ylength) / this.ylength
        switch(this.currentOrientation) {
            case 'left':
                if (areax == 0)
                    nextArea = this.xsize - 1
                else
                    nextArea = areax - 1
                if (this.grid[ nextArea ][areay] != 'WALL') {
                    this.destinationx = nextArea * this.xlength
                    this.canMove = true
                } else
                    this.canMove = false
                break
            case 'right':
                if (areax == this.xsize - 1)
                    nextArea = 0
                else
                    nextArea = areax + 1
                if (this.grid[ nextArea  ][areay] != 'WALL') {
                    this.destinationx = nextArea * this.xlength
                    this.canMove = true
                } else
                    this.canMove = false
                break
            case 'top':
                if (areay == 0)
                    nextArea = this.ysize - 1
                else
                    nextArea = areay - 1
                if (this.grid[ areax ][nextArea] != 'WALL') {
                    this.destinationy = nextArea * this.ylength
                    this.canMove = true
                } else
                    this.canMove = false
                break
            case 'bottom':
                if (areay == this.ysize - 1)
                    nextArea = 0
                else
                    nextArea = areay + 1
                if (this.grid[ areax ][nextArea] != 'WALL') {
                    this.destinationy = nextArea * this.ylength
                    this.canMove = true
                } else
                    this.canMove = false
                break
        }
    }

    goToDestination() {
        this.previousx = this.currentx
        this.previousy = this.currenty
        // changement d'orientation
        if (this.previousOrientation != this.currentOrientation) {
            // repositionnement
            if (this.currentx % this.xlength <= this.xlength / 2)
                this.currentx -= this.currentx % this.xlength
            else
                this.currentx += this.xlength - this.currentx % this.xlength
            if (this.currenty % this.ylength <= this.ylength / 2)
                this.currenty -= this.currenty % this.ylength
            else
                this.currenty += this.ylength - this.currenty % this.ylength
            this.destinationx = this.currentx
            this.destinationy = this.currenty
            this.searchNextDestination()
            this.previousOrientation = this.currentOrientation
        }
        switch(this.currentOrientation) {
            case 'left':
                if (Math.abs(this.currentx - this.destinationx) <= this.step) {
                    this.currentx = this.destinationx
                    this.searchNextDestination()
                }
                else
                    if (this.currentx <= 0)
                        this.currentx = this.xsize * this.xlength - this.xlength
                    else
                        this.currentx -= this.step
               break
            case 'right':
                if (Math.abs(this.currentx - this.destinationx) <= this.step) {
                    this.currentx = this.destinationx
                    this.searchNextDestination()
                }
                else
                    if (this.currentx >= this.xsize * this.xlength - this.xlength)
                        this.currentx = 0
                    else
                        this.currentx += this.step
                break
            case 'top':
                if (Math.abs(this.currenty - this.destinationy) <= this.step) {
                    this.currenty = this.destinationy
                    this.searchNextDestination()
                }
                else
                    if (this.currenty <= 0)
                        this.currenty = this.ysize * this.ylength - this.ylength
                    else
                        this.currenty -= this.step
                break
            case 'bottom':
                if (Math.abs(this.currenty - this.destinationy) <= this.step) {
                    this.currenty = this.destinationy
                    this.searchNextDestination()
                }
                else
                    if (this.currenty >= this.ysize * this.ylength - this.ylength)
                        this.currenty = 0
                    else
                        this.currenty += this.step
                    
                break
        }
/*      viewport is no more supported
        let viewport = {
            "left" : window.scrollX,
            "right" : (window.scrollX + screen.availWidth) * 3/4,
            "top" : window.scrollY,
            "bottom" : (window.scrollY + screen.availHeight) * 3/4
        }
        if (viewport.left < this.currentx || viewport.right > this.currentx) {
            window.scroll(this.currentx - 2 * this.xlength, window.scrollY)
        }
        if (viewport.top < this.currenty || viewport.bottom > this.currenty) {
            let banner = document.getElementById("banner")
            window.scroll(window.scrollX, this.currenty - 4 * this.ylength)
            banner.style.top = `${window.scrollY}px`
        }*/
    }

    draw(context) {
        context.clearRect(this.previousx + this.xlength / 8 - this.step + this.margin.left,
            this.previousy + this.ylength / 8 - this.step + this.margin.top,
            this.xlength / 1.1 + this.step * 2,
            this.ylength / 1.1 + this.step * 2)
        context.drawImage(selectCurrentImage(this.eating, this.currentOrientation, this.images),
            this.currentx + this.xlength / 8 + this.margin.left,
            this.currenty + this.ylength / 8 + this.margin.top, this.xlength / 1.1, this.ylength / 1.1)
        this.previousx = this.currentx
        this.previousy = this.currenty

        let areax, areay
        if (this.currentx % this.xlength <= this.xlength / 2)
            areax = (this.currentx - this.currentx % this.xlength) / this.xlength
        else
            areax = (this.currentx + this.xlength - this.currentx % this.xlength) / this.xlength
        if (this.currenty % this.ylength <= this.ylength / 2)
            areay = (this.currenty - this.currenty % this.ylength) / this.ylength
        else
            areay = (this.currenty + this.ylength - this.currenty % this.ylength) / this.ylength
        if (this.grid[ areax ][areay] == "ROAD") {
            let p = new Audio("PacMan.wav")
            p.load()
            var playPromise = p.play()
            if (playPromise !== undefined) {
                playPromise.then(_ => {}).catch(error => {})
            }
            this.grid[ areax  ][areay] = "EMPTY"
            getModule().board.redrawBoard()
            let banner = document.getElementById("banner")
            banner.childNodes[2].innerText = getModule().board.cakeCounter;
            getModule().loop.increaseScore()
            if (getModule().board.cakeCounter == 0) {
                getModule().loop.setStatus("win")
            }
        }
    }

    eat() {
        this.eating = !this.eating
    }

    startblink() {
        this.blinkCount = 0
        this.blinkState = false
        getModule().loop.setStatus("blink")
    }

    blink(context) {
		if (!this.blinkState) {
            context.clearRect(this.currentx + this.xlength / 8 - this.step + this.margin.left,
                this.currenty + this.ylength / 8 - this.step + this.margin.top,
                this.xlength / 1.1 + this.step * 2,
                this.ylength / 1.1 + this.step * 2)
		} else {
            context.drawImage(selectCurrentImage(this.eating, this.currentOrientation, this.images),
                this.currentx + this.xlength / 8 + this.margin.left,
                this.currenty + this.ylength / 8 + this.margin.top, this.xlength / 1.1, this.ylength / 1.1)
		}
		this.blinkState = !this.blinkState;
		++this.blinkCount;
		if (this.blinkCount > 50) {
            getModule().loop.setStatus("reBirth")
		}
    }

    reBirth(context) {
        let is_wall, near_ghost, px, py
		do {
			near_ghost = false
			px = Math.floor(Math.random() * this.xsize)
            py = Math.floor(Math.random() * this.ysize)
            let ghosts = getModule().loop.ghosts
			for(let u = 0; u < ghosts.length; ++u) {
                let ghost = ghosts[u]
				let ghost_x = (ghost.currentx - ghost.currentx % ghost.xlength) / ghost.xlength
				let ghost_y = (ghost.currenty - ghost.currenty % ghost.ylength) / ghost.ylength
				if (Math.abs(ghost_x - px) <= 5 && Math.abs(ghost_y - py) <= 5)
					near_ghost = true
			}
			is_wall = this.grid[px][py] == "WALL"
        } while(near_ghost || is_wall)
        
        context.clearRect(this.currentx + this.xlength / 8 - this.step + this.margin.left,
            this.currenty + this.ylength / 8 - this.step + this.margin.top,
            this.xlength / 1.1 + this.step * 2,
            this.ylength / 1.1 + this.step * 2)
        this.currentx = this.destinationx = px * this.xlength;
        this.currenty = this.destinationy = py * this.ylength;
        context.drawImage(selectCurrentImage(this.eating, this.currentOrientation, this.images),
            this.currentx + this.xlength / 8 + this.margin.left,
            this.currenty + this.ylength / 8 + this.margin.top, this.xlength / 1.1, this.ylength / 1.1)
        getModule().loop.setStatus("running")
    }

    win() {
        let bravo = document.getElementById("bravo")
        bravo.style.left = window.scrollX + "px";
        bravo.style.width = screen.availWidth + "px";
        bravo.style.height = screen.availHeight + "px";
        bravo.style.top = window.scrollY + "px";
        bravo.style.display = "inline";
    }

}