const maximumState = 10

function loadImages(resolve, reject) {
    let imageCounter = 0
    let pacmanImages = []
    let pacmanSources = [
        "pacman1_bottom.png",
        "pacman1_left.png",
        "pacman1_right.png",
        "pacman1_top.png",
        "pacman2_bottom.png",
        "pacman2_left.png",
        "pacman2_right.png",
        "pacman2_top.png"
    ]
    let errorLoading = e => {
        reject(e)
    }
    let setCounter = e => {
        ++imageCounter
        if (imageCounter == pacmanImages.length) {
            // all images have been loaded
            resolve({
                "pacmanCloser" : pacmanCloser,
                "pacmanOpener" : pacmanOpener
            })
        }
    }
    for(let x = 0; x < 8; ++x) {
        pacmanImages[x] = new Image()
        pacmanImages[x].addEventListener( "load", setCounter )
        pacmanImages[x].addEventListener( "error", errorLoading ) 
        pacmanImages[x].src = pacmanSources[x]
    }
}

export default class Loop {

    constructor(pacman, ghosts, xsize, ysize, xlength, ylength, margin, banner) {
        this.xsize = xsize
        this.ysize = ysize
        this.xlength = xlength
        this.ylength = ylength
        this.margin = margin
        this.banner = banner
        this.state = 0
        this.pacman = pacman
        this.ghosts = ghosts
    }

    start(canvas, interval = 0.000001) {
        this.canvas = canvas
        canvas.width = this.xsize * this.xlength + this.margin.left + this.margin.right
        canvas.height = this.ysize * this.ylength + this.margin.top + this.margin.bottom
        this.banner.style.width = canvas.width + "px"
        this.drawingContext = canvas.getContext("2d")
        let countReady = 0
        let setCountReady = () => {
            ++countReady
            if (countReady == 1 + this.ghosts.length)
                window.setInterval(this.play, interval, this)
        }
        this.pacman.init(setCountReady)
        this.ghosts.forEach( element => 
            element.init(setCountReady) )
        window.addEventListener('scroll', e => {
            if (this.banner) {
                if (window.scrollX < this.canvas.width - this.banner.offsetWidth) {
                    this.banner.style.left = window.scrollX + "px";
                }
                else {
                    this.banner.style.left = (this.canvas.width - this.banner.offsetWidth) + "px";
                }
                this.banner.style.top = window.scrollY + "px";
            }
        })
        window.addEventListener('keydown', e => {
            if (e.keyCode == 37) {
                this.pacman.setOrientation("left")
            }
            else if (e.keyCode == 39) {
                this.pacman.setOrientation("right")
            }
            else if (e.keyCode == 38) {
                this.pacman.setOrientation("top")
            }
            else if (e.keyCode == 40) {
                this.pacman.setOrientation("bottom")
            }
            e.preventDefault();
        })
    }

    play(me) {
        let { pacman, ghosts } = me
        switch(me.state) {

            case 0:
                pacman.move()
                break
            case 1:
                pacman.draw(me.drawingContext)
                break
            case 2:
                ghosts.forEach(element => {
                    element.move()
                })
                break
            case 3:
                ghosts.forEach(element => {
                    element.draw(me.drawingContext)
                })
                break
            case 4:
                pacman.eat()
                break
            case 5:
                ghosts.forEach(element => {
                    element.thriller()
                })
                break

        }
        if (me.state < maximumState)
            ++me.state
        else
            me.state = 0
        console.log(me.state)
    }
} 