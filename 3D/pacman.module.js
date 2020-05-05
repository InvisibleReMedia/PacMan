
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


function test(me, select) {
    if (me.previousOrientation != me.currentOrientation) {
        if (select.position_i % select.limit_i <= select.limit_i / 2) {
            select.position_i -= select.position_i % select.limit_i
        } else {
            select.position_i += select.position_i - select.position_i % select.limit_i
        }
        select.area_i = (select.position_i - select.position_i % select.limit_i) / select.limit_i
        me.previousOrientation = me.currentOrientation
    }
    if (select.position % select.limit < select.limit / 2) {
        select.area = (select.position - select.position % select.limit) / select.limit
    }
    let nextArea
    if (select.isReachBorder(select, me))
        nextArea = select.opposite
    else
        nextArea = select.area + select.move
    if (me.grid[select.compute(nextArea, select.area_i, me)] == "WALL") {
        select.position = select.position - select.position % select.limit
        return false
    } else
        return true
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
    constructor(xsize, ysize, xlength, ylength, margin, grid, startx, starty, step, drawCallback) {
        this.xsize = xsize
        this.ysize = ysize
        this.xlength = xlength
        this.ylength = ylength
        this.margin = margin
        this.grid = grid
        this.startx = startx * xlength + this.margin.left
        this.starty = starty * ylength + this.margin.top
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
        } ).catch( error => console.log(error) );
    }

    test() {
        let select = {}
        let result
        switch(this.currentOrientation) {
            case 'left':
                select.position_i = this.currenty
                select.limit_i = this.ylength
                select.position = this.currentx
                select.limit = this.xlength
                select.isReachBorder = (select, me) => 
                    select.position == 0
                select.opposite = this.xsize - 1
                select.move = -1
                select.compute = (x,y,me) => x + y * me.xsize
                result = test(this, select)
                this.currentx = select.position
                this.currenty = select.position_i
                this.xcell = select.area
                this.ycell = select.area_i
                break
            case 'right':
                select.position_i = this.currenty
                select.limit_i = this.ylength
                select.position = this.currentx
                select.limit = this.xlength
                select.isReachBorder = (select, me) => 
                    select.position == me.xsize - 1
                select.opposite = 0
                select.move = 1
                select.compute = (x,y,me) => x + y * me.xsize
                result = test(this, select)
                this.currentx = select.position
                this.currenty = select.position_i
                this.xcell = select.area
                this.ycell = select.area_i
                break
            case 'top':
                select.position_i = this.currentx
                select.limit_i = this.xlength
                select.position = this.currenty
                select.limit = this.ylength
                select.isReachBorder = (select, me) => 
                    select.position == 0
                select.opposite = me.ysize - 1
                select.move = -1
                select.compute = (x,y,me) => y + x * me.xsize
                result = test(this, select)
                this.currenty = select.position
                this.currentx = select.position_i
                this.ycell = select.area
                this.xcell = select.area_i
                break
            case 'bottom':
                select.position_i = this.currentx
                select.limit_i = this.xlength
                select.position = this.currenty
                select.limit = this.ylength
                select.isReachBorder = (select, me) => 
                    select.position == me.ysize - 1
                select.opposite = 0
                select.move = 1
                select.compute = (x,y,me) => y + x * me.xsize
                result = test(this, select)
                this.currenty = select.position
                this.currentx = select.position_i
                this.ycell = select.area
                this.xcell = select.area_i
                break
        }
        return result;
    }
    
    move() {
        if (this.test()) {
        }
    }

    draw(context) {
        context.clearRect(this.previousx + this.xlength / 8 - this.step + this.margin.left,
                          this.previousy + this.ylength / 8 - this.step + this.margin.top,
                          this.xlength / 1.3 + this.step * 2,
                          this.ylength / 1.3 + this.step * 2)
        context.drawImage(selectCurrentImage(this.eating, this.currentOrientation, this.images),
                          this.currentx + this.xsize / 8 + this.margin.left,
                          this.currenty + this.ysize / 8 + this.margin.top, this.xsize / 1.3, this.ysize / 1.3)
        if (this.grid[ this.xcell + this.ycell * this.xsize] == "CAKE") {
            let p = new Audio("PacMan.wav")
            p.load()
            var playPromise = p.play()
            if (playPromise !== undefined) {
                playPromise.then(_ => {}).catch(error => {})
            }
            this.grid[this.xcell + this.ycell * this.xsize] = "EMPTY"
            window.redrawBoard()
        }
    }

    eat() {
        this.eating = !this.eating
    }

}