/* copyright @2020 */

function getModule() {
    return document.getElementById("module")
}

function isUniquePosition(x, y, p) {
    for(const [i, u] of p.entries()) {
        if (u.x == x && u.y == y)
            return false
    }
    return true
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
    wall.src = "../assets/images/wall.png"
    cake.addEventListener( "load", setCounter )
    cake.addEventListener( "error", errorLoading )
    cake.src = "../assets/images/cake.png"
}

function selectCharacter(current, direction) {

    let except = current.except
    let value

    do {

        value = Math.floor(Math.random() * 13) + 1

    } while(except[direction].indexOf(value) != -1)

    return value

}


export default class Maze {

    constructor() {

        getModule().board = this
        this.characters()

    }

    characters() {

        this.characters = [
            {
                "id" : 1,
                "cells" : [
                    "WALL", "WALL", "WALL",
                    "ROAD", "ROAD", "ROAD",
                    "WALL", "WALL", "WALL"
                ],
                "except" : {
                    "left" : [ 2, 4, 6, 11, 13 ],
                    "right" : [ 2, 3, 5, 12],
                }
            },
            {
                "id" : 2,
                "cells" : [
                    "WALL", "ROAD", "WALL",
                    "WALL", "ROAD", "WALL",
                    "WALL", "ROAD", "WALL"
                ],
                "except" : {
                    "top" : [ 1, 5, 9, 10 ],
                    "bottom" : [ 1, 3, 4, 8, 10 ]
                }
            },
            {
                "id" : 3,
                "cells" : [
                    "WALL", "WALL", "WALL",
                    "WALL", "ROAD", "ROAD",
                    "WALL", "ROAD", "WALL"
                ],
                "except" : {
                    "right" : [ 2, 3, 5, 12, 13 ],
                    "bottom" : [ 1, 3, 4, 8, 10 ]
                }
            },
            {
                "id" : 4,
                "cells" : [
                    "WALL", "WALL", "WALL",
                    "ROAD", "ROAD", "WALL",
                    "WALL", "ROAD", "WALL"
                ],
                "except" : {
                    "left" : [ 2, 4, 6, 11, 13 ],
                    "bottom" : [ 1, 3, 4, 8, 10 ]
                }
            },
            {
                "id" : 5,
                "cells" : [
                    "WALL", "ROAD", "WALL",
                    "WALL", "ROAD", "ROAD",
                    "WALL", "WALL", "WALL"
                ],
                "except" : {
                    "top" : [ 1, 5, 6, 9, 10 ],
                    "right" : [ 2, 3, 5, 12, 13 ]
                }
            },
            {
                "id" : 6,
                "cells" : [
                    "WALL", "ROAD", "WALL",
                    "ROAD", "ROAD", "WALL",
                    "WALL", "WALL", "WALL"
                ],
                "except" : {
                    "top" : [ 1, 5, 6, 9, 10 ],
                    "left" : [ 2, 4, 6, 11, 13 ]
                }
            },
            {
                "id" : 7,
                "cells" : [
                    "WALL", "ROAD", "WALL",
                    "ROAD", "ROAD", "ROAD",
                    "WALL", "ROAD", "WALL"
                ],
                except : {
                    "left" : [ 2, 4, 6, 11, 13 ],
                    "right" : [ 2, 3, 5, 12, 13 ],
                    "top" : [ 1, 5, 6, 9, 10 ],
                    "bottom" : [ 1, 3, 4, 8, 10 ]
                }
            },
            {
                "id" : 8,
                "cells" : [
                    "WALL", "WALL", "WALL",
                    "ROAD", "ROAD", "ROAD",
                    "WALL", "ROAD", "WALL"
                ],
                "except" : {
                    "left" : [ 2, 4, 6, 11, 13 ],
                    "right" : [ 2, 3, 5, 12, 13 ],
                    "bottom" : [ 1, 3, 4, 8, 10 ]
                }
            },
            {
                "id" : 9,
                "cells" : [
                    "WALL", "ROAD", "WALL",
                    "ROAD", "ROAD", "ROAD",
                    "WALL", "WALL", "WALL"
                ],
                "except" : {
                    "left" : [ 2, 4, 6, 11, 13 ],
                    "right" : [ 2, 3, 5, 12, 13 ],
                    "top" : [ 1, 5, 6, 9, 10 ]
                }
            },
            {
                "id" : 10,
                "cells" : [
                    "ROAD", "WALL", "ROAD",
                    "ROAD", "ROAD", "ROAD",
                    "ROAD", "WALL", "ROAD"
                ],
                "except" : {
                    "left" : [ 2, 4, 6, 11 ],
                    "right" : [ 2, 3, 5, 12 ],
                    "top" : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 ],
                    "bottom" : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 ]
                }
            },
            {
                "id" : 11,
                "cells" : [
                    "WALL", "ROAD", "WALL",
                    "ROAD", "ROAD", "WALL",
                    "WALL", "ROAD", "WALL"
                ],
                "except" : {
                    "left" : [ 2, 4, 6, 11, 13 ],
                    "top" : [ 1, 5, 6, 9, 10 ],
                    "bottom" : [ 1, 3, 4, 8, 10 ]
                }
            },
            {
                "id" : 12,
                "cells" : [
                    "WALL", "ROAD", "WALL",
                    "WALL", "ROAD", "ROAD",
                    "WALL", "ROAD", "WALL"
                ],
                "except" : {
                    "top" : [ 1, 5, 6, 9, 10 ],
                    "bottom" : [ 1, 3, 4, 8, 10 ],
                    "right" : [ 2, 3, 5, 12, 13 ]
                }
            },
            {
                "id" : 13,
                "cells" : [
                    "ROAD", "ROAD", "ROAD",
                    "WALL", "ROAD", "WALL",
                    "ROAD", "ROAD", "ROAD"
                ],
                "except" : {
                    "left" : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 ],
                    "right" : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 ],
                    "top" : [ 1, 5, 6, 9 ],
                    "bottom" : [ 1, 3, 4, 8 ]
                }
            },
            {
                "id" : 14,
                "cells" : [
                    "ROAD", "ROAD", "ROAD",
                    "ROAD", "ROAD", "ROAD",
                    "ROAD", "ROAD", "ROAD"
                ],
                "except" : {
                    "left" : [ 2, 4, 6, 11 ],
                    "right" : [ 2, 3, 5, 12 ],
                    "top" : [ 1, 5, 6, 9 ],
                    "bottom" : [ 1, 3, 4, 8 ]
                }
            }
        ]
    }

    makeMesh(options) {

        let mesh = {
            "value" : 14,
            "x" : 0,
            "y" : 0
        }
        let withConstraints
        if (typeof options !== "undefined" && typeof options.withConstraints !== "undefined")
            withConstraints = options.withConstraints
        else
            withConstraints = false
        let positions = [ mesh ]
        let stack = []
        let stack_length = 0
        stack[stack_length] = mesh
        ++stack_length
        let stack_position = 0
        let counter = 0
        let size_top = 0
        let size_bottom = 0
        let size_left = 0
        let size_right = 0
        let current_left = 0
        let current_right = 0
        let current_top = 0
        let current_bottom = 0
        while(stack_position < stack_length && counter < 100) {
            ++counter
            let c = stack[stack_position]
            ++stack_position
            if (typeof c.left === "undefined") {
                let k = this.characters[c.value - 1]
                if (isUniquePosition(c.x - 1, c.y, positions) && (!withConstraints || typeof k.except["left"] !== "undefined")) {
                    let v
                    if (withConstraints)
                        v = selectCharacter(k, "left")
                    else
                        v = Math.floor(Math.random() * 14) + 1
                    c.left = {
                        "value" : v,
                        "x" : c.x - 1,
                        "y" : c.y
                    }
                    positions[positions.length] = c.left
                    if (c.left.x < size_left) size_left = c.left.x
                    stack[stack_length] = c.left
                    ++stack_length
                }
            }
            if (typeof c.right === "undefined") {
                let k = this.characters[c.value - 1]
                if (isUniquePosition(c.x + 1, c.y, positions) && (!withConstraints || typeof k.except["right"] !== "undefined")) {
                    let v
                    if (withConstraints)
                        v = selectCharacter(k, "right")
                    else
                        v = Math.floor(Math.random() * 14) + 1
                    c.right = {
                        "value" : v,
                        "x" : c.x + 1,
                        "y" : c.y
                    }
                    positions[positions.length] = c.right
                    if (c.right.x > size_right) size_right = c.right.x
                    stack[stack_length] = c.right
                    ++stack_length
                }
            }
            if (typeof c.top === "undefined") {
                let k = this.characters[c.value - 1]
                if (isUniquePosition(c.x, c.y - 1, positions) && (!withConstraints || typeof k.except["top"] !== "undefined")) {
                    let v
                    if (withConstraints)
                        v = selectCharacter(k, "top")
                    else
                        v = Math.floor(Math.random() * 14) + 1
                    c.top = {
                        "value" : v,
                        "x" : c.x,
                        "y" : c.y - 1
                    }
                    positions[positions.length] = c.top
                    if (c.top.y < size_top) size_top = c.top.y
                    stack[stack_length] = c.top
                    ++stack_length
                }
            }
            if (typeof c.bottom === "undefined") {
                let k = this.characters[c.value - 1]
                if (isUniquePosition(c.x, c.y + 1, positions) && (!withConstraints || typeof k.except["bottom"] !== "undefined")) {
                    let v
                    if (withConstraints)
                        v = selectCharacter(k, "bottom")
                    else
                        v = Math.floor(Math.random() * 14) + 1
                    c.bottom = {
                        "value" : v,
                        "x" : c.x,
                        "y" : c.y + 1
                    }
                    positions[positions.length] = c.bottom
                    if (c.bottom.y > size_bottom) size_bottom = c.bottom.y
                    stack[stack_length] = c.bottom
                    ++stack_length
                }
            }
        }

        this.size_left = size_left
        this.size_right = size_right
        this.size_top = size_top
        this.size_bottom = size_bottom

        return {
            "mesh" : mesh,
            "positions" : positions,
            "xsize" : size_right - size_left + 1,
            "ysize" : size_bottom - size_top + 1,
            "size_left" : size_left,
            "size_top" : size_top,
        }

    }

    makeGrid(data) {

        let a = new Array(data.xsize * 3).fill("EMPTY").map(x => new Array(data.ysize * 3).fill("EMPTY"))

        for(const [i, u] of data.positions.entries()) {
            if (u.x < 0)
                u.x -= data.size_left
            else
                u.x -= data.size_left
            if (u.y < 0)
                u.y -= data.size_top
            else
                u.y -= data.size_top
            let v = this.characters[u.value - 1]

            for(let m = 0; m < 3; ++m) {
                for(let n = 0; n < 3; ++n) {
                    a[u.x * 3 + m][u.y * 3 + n] = v.cells[m + n * 3]
                }
            }

        }

        return {
            "grid" : a,
            "xsize" : data.xsize * 3,
            "ysize" : data.ysize * 3
        }
    }

    OnDraw(canvas, data) {

        let xl = 10
        let yl = 10
        let margin = {
            "left" : 10,
            "top" : 10
        }
        canvas.width = (data.xsize + 2) * xl
        canvas.height = (data.ysize + 2) * yl
        let ctx = canvas.getContext("2d")

        this.cakeCounter = 0
        let { cake, wall } = this.images
        for(let y = 0; y < data.ysize; ++y) {
            for(let x = 0; x < data.xsize; ++x) {
                let c = data.grid[x][y]
                if (c == "WALL") {
                    ctx.drawImage(wall, x*xl + 2 + margin.left, y*yl + 2 + margin.top, xl - 5, yl - 5)
                } else if (c == "ROAD") {
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

    draw(canvas, data) {

        if (!this.imageLoaded) {
            const promise = new Promise( (resolve, reject) => {
                loadImages( resolve, reject )
            } ).then( images => {
                this.images = images
                this.imageLoaded = true
                this.canvas = canvas
                this.data = data
                this.OnDraw(canvas, data)
            } ).catch( error => console.log(error) );
        } else {
            this.OnDraw(canvas, data)
        }


    }

    redrawBoard() {
        this.OnDraw(this.canvas, this.data)
    }
}