const maximumState = 10

function getModule() {
    return document.getElementById("module")
}

function numbers(n) {
	let z = document.getElementById("score");
	let h = "";
	let k = n;
	let t = Math.log10(n) + 1;
	while(t > 0) {
		let m = k % 10;
		if (t == 1 && m > 0 || t > 1)
			h = "<img style='width:15px;height:15px' src='../assets/images/n_" + m + ".png'/>" + h;
		k = (k - k % 10) / 10;
		--t;
	}
	z.innerHTML = h;
}

export default class Loop {

    constructor(pacman, ghosts, xsize, ysize, xlength, ylength, margin, banner) {
        getModule().loop = this
        this.xsize = xsize
        this.ysize = ysize
        this.xlength = xlength
        this.ylength = ylength
        this.margin = margin
        this.banner = banner
        this.state = 0
        this.pacman = pacman
        this.ghosts = ghosts
        this.score = 0
        this.status = "start"
    }

    start(canvas, interval = 0.001) {
        this.canvas = canvas
        canvas.width = this.xsize * this.xlength + this.margin.left + this.margin.right
        canvas.height = this.ysize * this.ylength + this.margin.top + this.margin.bottom
        this.banner.style.width = canvas.width + "px"
        this.drawingContext = canvas.getContext("2d")
        let countReady = 0
        let setCountReady = () => {
            ++countReady
            if (countReady == 1 + this.ghosts.length) {
                getModule().ready = true
                getModule().view.animate()
                window.setInterval(this.play, interval, this)
            }
        }
        this.pacman.init(setCountReady)
        this.ghosts.forEach( element => 
            element.init(setCountReady) )
        window.addEventListener('keydown', e => {
            let view = getModule().view
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
            else if (e.key == 'q') {
                view.camera.position.y--;
            } else if (e.key == 'a') {
                view.camera.position.y++;
            } else if (e.key == 'b') {
                view.camera.rotation.z-=0.1;
            } else if (e.key === 'n') {
                view.camera.rotation.z+=0.1;
            } else if (e.key == 'c')
                view.camera.rotation.x-=0.1;
            else if (e.key == 'v')
                view.camera.rotation.x+=0.1;
            console.log(`y=${view.camera.position.y};rz=${view.camera.rotation.z};rx=${view.camera.rotation.x}`)
            e.preventDefault();
        })
        this.status = "running"
    }

    getStatus() {
        return this.status
    }

    setStatus(status) {
        this.status = status
    }

    play(me) {
        let { pacman, ghosts, status, drawingContext } = me
        switch(me.state) {

            case 0:
                if (status == "running")
                    pacman.draw(drawingContext)
                else if (status == "win")
                    pacman.win()
                else if (status == "startblink")
                    pacman.startblink()
                else if (status == "blink")
                    pacman.blink(drawingContext)
                else if (status == "reBirth")
                    pacman.reBirth(drawingContext)
                break
            case 1:
                if (status == "running")
                    pacman.goToDestination()
                break
            case 2:
                if (status == "running")
                    ghosts.forEach(element => {
                        element.goToDestination()
                    })
                break
            case 3:
                if (status == "running")
                    ghosts.forEach(element => {
                        element.draw(drawingContext)
                    })
                break
            case 4:
                if (status == "running")
                    pacman.eat()
                break
            case 5:
                if (status == "running")
                    ghosts.forEach(element => {
                        element.thriller()
                    })
                break
            case 6:
                if (status == "running")
                    ghosts.forEach(element => {
                        element.fear()
                    })
                break
        }
        if (me.state < maximumState)
            ++me.state
        else
            me.state = 0
    }

    increaseScore() {
        ++this.score
        numbers(this.score * 100)
    }
} 