
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

function move(me, select) {
    let center = select.position + select.limit / 8 + select.limit / 1.1 / 2;
    if (select.isReachBorder(me, center)) {
        select.position = select.oppositePosition
        select.oppositeScrolling(select.position, me)
    } else
        select.position += select.move
    select.updateScrolling(me)
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
        } ).catch( error => console.log(error) )
    }

    setOrientation(orientation) {
        this.previousOrientation = this.currentOrientation
        this.currentOrientation = orientation
    }

    test() {
        let select
        let result
        this.previousx = this.currentx
        this.previousy = this.currenty
        switch(this.currentOrientation) {
            case 'left':
                select = {
                    "position_i" : this.currenty,
                    "area_i" : this.ycell,
                    "limit_i" : this.ylength,
                    "position" : this.currentx,
                    "area" : this.xcell,
                    "limit" : this.xlength,
                    "isReachBorder" : (select, me) =>
                        select.position == 0,
                    "opposite" : this.xsize - 1,
                    "move" : -1,
                    "compute" : (x, y, me) => x + y * me.xsize
                }
                result = test(this, select)
                this.currentx = select.position
                this.currenty = select.position_i
                this.xcell = select.area
                this.ycell = select.area_i
                break
            case 'right':
                select = {
                    "position_i" : this.currenty,
                    "area_i" : this.ycell,
                    "limit_i" : this.ylength,
                    "position" : this.currentx,
                    "area" : this.xcell,
                    "limit" : this.xlength,
                    "isReachBorder" : (select, me) =>
                        select.position == me.xsize - 1,
                    "opposite" : 0,
                    "move" : 1,
                    "compute" : (x, y, me) => x + y * me.xsize
                }
                select.compute = (x,y,me) => x + y * me.xsize
                result = test(this, select)
                this.currentx = select.position
                this.currenty = select.position_i
                this.xcell = select.area
                this.ycell = select.area_i
                break
            case 'top':
                select = {
                    "position_i" : this.currentx,
                    "area_i" : this.xcell,
                    "limit_i" : this.xlength,
                    "position" : this.currenty,
                    "area" : this.ycell,
                    "limit" : this.ylength,
                    "isReachBorder" : (select, me) => 
                        select.position == 0,
                    "opposite" : this.ysize - 1,
                    "move" : -1,
                    "compute" : (x, y, me) => y + x * me.xsize
                }
                result = test(this, select)
                this.currenty = select.position
                this.currentx = select.position_i
                this.ycell = select.area
                this.xcell = select.area_i
                break
            case 'bottom':
                select = {
                    "position_i" : this.currentx,
                    "area_i" : this.xcell,
                    "limit_i" : this.xlength,
                    "position" : this.currenty,
                    "area" : this.ycell,
                    "limit" : this.ylength,
                    "isReachBorder" : (select, me) => 
                        select.position == me.ysize - 1,
                    "opposite" : 0,
                    "move" : 1,
                    "compute" : (x, y, me) => y + x * me.xsize
                }
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
        this.canMove = this.test()
        let select
        if (this.canMove) {
            switch(this.currentOrientation) {
                case "left":
                    select = {
                        "position" : this.currentx,
                        "limit" : this.xlength,
                        "isReachBorder" : (me, center) =>
                            center <= me.xlength / 2,
                        "oppositePosition" : this.xsize * this.xlength - this.xlength / 2,
                        "oppositeScrolling" : (position, me) => {
                            me.xscroll = position
                            window.scroll(me.xscroll, me.yscroll)
                        },
                        "move" : -this.step,
                        "updateScrolling" : me => {
                            let viewport_inf = me.xscroll + screen.availWidth / 3
                            let viewport_sup = (me.xscroll + screen.availWidth) * 3 / 4
                            if (viewport_inf > me.currentx || viewport_sup <= me.currentx) {
                                me.xscroll = me.currentx - 2 * me.xlength
                                window.scroll(me.xscroll, me.yscroll)
                            }
                        }
                    }
                    move(this, select)
                    this.currentx = select.position
                    break
                case "right":
                    select = {
                        "position" : this.currentx,
                        "limit" : this.xlength,
                        "isReachBorder" : (me, center) =>
                            center >= me.xsize * me.xlength - me.xlength / 2,
                        "oppositePosition" : 0,
                        "oppositeScrolling" : (position, me) => {
                            me.xscroll = 0
                            window.scroll(me.xscroll, me.yscroll)
                        },
                        "move" : this.step,
                        "updateScrolling" : me => {
                            let viewport_inf = me.xscroll + screen.availWidth / 3
                            let viewport_sup = (me.xscroll + screen.availWidth) * 3 / 4
                            if (viewport_inf > me.currentx || viewport_sup <= me.currentx) {
                                me.xscroll = me.currentx - 2 * me.xlength
                                window.scroll(me.xscroll, me.yscroll)
                            }
                        }
                    }
                    move(this, select)
                    this.currentx = select.position
                    break
                case "top":
                    select = {
                        "position" : this.currenty,
                        "limit" : this.ylength,
                        "isReachBorder" : (me, center) =>
                            center <= me.ylength / 2,
                        "oppositePosition" : this.ysize * this.ylength - this.ylength / 2,
                        "oppositeScrolling" : (position, me) => {
                            me.yscroll = position
                            window.scroll(me.xscroll, me.yscroll)
                        },
                        "move" : -this.step,
                        "updateScrolling" : me => {
                            let viewport_inf = me.yscroll + screen.availHeight / 3
                            let viewport_sup = (me.yscroll + screen.availHeight) * 3 / 4
                            if (viewport_inf > me.currenty || viewport_sup <= me.currenty) {
                                me.yscroll = me.currenty - 2 * me.ylength
                                window.scroll(me.xscroll, me.yscroll)
                            }
                        }
                    }
                    move(this, select)
                    this.currenty = select.position
                    break
                case "bottom":
                    select = {
                        "position" : this.currenty,
                        "limit" : this.ylength,
                        "isReachBorder" : (me, center) =>
                            center >= this.ysize * this.ylength - this.ylength / 2,
                        "oppositePosition" : 0,
                        "oppositeScrolling" : (position, me) => {
                            me.yscroll = position
                            window.scroll(me.xscroll, me.yscroll)
                        },
                        "move" : this.step,
                        "updateScrolling" : me => {
                            let viewport_inf = me.yscroll + screen.availHeight / 3
                            let viewport_sup = (me.yscroll + screen.availHeight) * 3 / 4
                            if (viewport_inf > me.currenty || viewport_sup <= me.currenty) {
                                me.yscroll = me.currenty - 2 * me.ylength
                                window.scroll(me.xscroll, me.yscroll)
                            }
                        }
                    }
                    move(this, select)
                    this.currenty = select.position
                    break
            }
        }
    }

    draw(context) {
        if (this.canMove) {
            context.clearRect(this.previousx + this.xlength / 8 - this.step + this.margin.left,
                this.previousy + this.ylength / 8 - this.step + this.margin.top,
                this.xlength / 1.1 + this.step * 2,
                this.ylength / 1.1 + this.step * 2)
context.drawImage(selectCurrentImage(this.eating, this.currentOrientation, this.images),
                this.currentx + this.xlength / 8 + this.margin.left,
                this.currenty + this.ylength / 8 + this.margin.top, this.xlength / 1.1, this.ylength / 1.1)
        }
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