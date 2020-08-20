/* copyright @2020 */

function getModule() {
    return document.getElementById("module")
}

function loadImages(resolve, reject) {
    let imageCounter = 0
    let wall = new Image()
    let cake = new Image()
    let errorLoading = e => {
        reject(e)
    }
    let setCounter = e => {
        ++imageCounter
        if (imageCounter == 2) {
            // all images have been loaded
            resolve({
                "wall" : wall,
                "cake" : cake
            })
        }
    }
    wall.addEventListener( "load", setCounter )
    wall.addEventListener( "error", errorLoading ) 
    wall.src = "wall.png"
    cake.addEventListener( "load", setCounter )
    cake.addEventListener( "error", errorLoading )
    cake.src = "cake.png"
}


export default class Board {

    constructor( level ) {
        getModule().board = this
        this.cakeCounter = 0
        this.level = level
        this.imageLoaded = false
    }

    async start() {
        return fetch(`./board.${this.level}.json`)
                .then(response => response.json())
                .then(json => this.internalData = json)
                .catch(error => console.log(error))
    }

    getCakeCounter() {
        return this.cakeCounter
    }

    decreaseCakeCounter() {
        --this.cakeCounter
    }

    getXSize() {
        return this.internalData.x_size
    }

    getYSize() {
        return this.internalData.y_size
    }

    getXLength() {
        return this.internalData.x_length
    }

    getYLength() {
        return this.internalData.y_length
    }

    getMargin() {
        return {
            "left" : 0,
            "right" : 0,
            "top" : 0,
            "bottom" : 0
        }
    }

    getGrid() {
        return this.internalData.cells
    }

    OnDraw() {
        let xsize = this.internalData.x_size
        let ysize = this.internalData.y_size
        let xl = this.internalData.x_length
        let yl = this.internalData.y_length
        let { cake, wall } = this.images
        let cells = this.internalData.cells
        this.cakeCounter = 0
        let ctx = this.canvas.getContext("2d")
        let margin = this.getMargin()
        for(let y = 0; y < ysize; ++y) {
            for(let x = 0; x < xsize; ++x) {
                let c = cells[x + y * xsize]
                if (c == "WALL") {
                    ctx.drawImage(wall, x*xl + 2 + margin.left, y*yl + 2 + margin.top, xl - 5, yl - 5)
                } else if (c == "CAKE") {
                    ++this.cakeCounter
                    ctx.drawImage(cake, x*xl + 2 + xl / (4*1.4) + margin.left, y*yl + 2 + yl / (4*1.4) + margin.top, xl / 1.4 - 5, yl / 1.4 - 5)
                } else if (c == "EMPTY") {
                    ctx.beginPath()
                    ctx.fillStyle = "#F1F1F1FF"
                    ctx.fillRect(x*xl + 2 + margin.left, y*yl + 2 + margin.top, xl - 5, yl - 5)
                    ctx.arc(x*xl + xl/2 + margin.left, y*yl + yl/2 + margin.top, xl/4, 0, Math.PI*2)
                    ctx.fillStyle = "#F1F1F1FF"
                    ctx.fill()
                    ctx.closePath()
                }
            }
        }
    }

    Draw(canvas,
         width = this.internalData.x_size * this.internalData.x_length,
         height = this.internalData.y_size * this.internalData.y_length) {

        let xsize = this.internalData.x_size
        let ysize = this.internalData.y_size
        let xl = width / xsize
        let yl = height / ysize
        this.internalData.x_length = xl
        this.internalData.y_length = yl
    
        canvas.width = xsize * xl
        canvas.height = ysize * yl

        // copy data
        this.canvas = canvas
        
        if (!this.imageLoaded) {
            const promise = new Promise( (resolve, reject) => {
                loadImages( resolve, reject )
            } ).then( images => {
                this.images = images
                this.imageLoaded = true
                this.OnDraw()
            } ).catch( error => console.log(error) );
            getModule().board.redrawBoard = _ => {
                this.clearDraw()
                this.OnDraw()
            }
        } else {
            getModule().board.redrawBoard()
        }

    }

    clearDraw() {
        let ctx = this.canvas.getContext("2d")
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

}

