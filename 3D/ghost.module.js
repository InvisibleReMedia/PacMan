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
    left.src = "ghost_" + color + "_1.png"
    right.addEventListener( "load", setCounter )
    right.addEventListener( "error", errorLoading )
    right.src = "ghost_" + color + "_2.png"
}


export default class Ghost {

    constructor(color) {
        this.color = color
    }

    init(acknowledge) {
        const promise = new Promise( (resolve, reject) => {
            loadImages(this.color, resolve, reject )
        } ).then( images => {
            this.images = images
            acknowledge()
        } ).catch( error => console.log(error) );
    }

    move() {


    }

    draw() {


    }

    thriller() {
        
    }

}