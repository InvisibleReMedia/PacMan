/* copyright @2020 */

export default class Lee {

    makeMesh(grid, xsize, ysize, destx, desty) {

        // 0 : SUD, 1 : NORD, 2 : OUEST, 3 : EST
        let mesh = new Array(xsize).fill(0).map(x => new Array(ysize).fill(0))

        for(let y = 0; y < ysize; ++y) {
            for(let x = 0; x < xsize; ++x) {
                if (grid[x + y * xsize] != "WALL") {
                    mesh[x][y] = 0
                }
            }
        }

        mesh[destx][desty] = 1
        let stack = []
        let stack_length = 0
        stack[stack_length] = destx + desty * ysize * xsize
        ++stack_length
        let stack_position = 0
        while(stack_position < stack_length) {
            let c = stack[stack_position]
            ++stack_position
            let x = c % (ysize * xsize)
            let y = (c - x) / (ysize * xsize)

            let k = mesh[x][y]
            // SUD
            let t = y + 1
            if (t < ysize && grid[x + t * xsize] != "WALL") {
                let s = mesh[x][t]
                if (s == 0) {
                    mesh[x][t] = k + 1
                    stack[stack_length] = x + t * ysize * xsize
                    ++stack_length
                }
            }
            t = y - 1
            // NORD
            if (t >= 0 && grid[x + t * xsize] != "WALL") {
                let s = mesh[x][t]
                if (s == 0) {
                    mesh[x][t] = k + 1
                    stack[stack_length] = x + t * ysize * xsize
                    ++stack_length
                }
            }
            // EST
            t = x + 1
            if (t < xsize && grid[t + y * xsize] != "WALL") {
                let s = mesh[t][y]
                if (s == 0) {
                    mesh[t][y] = k + 1
                    stack[stack_length] = t + y * ysize * xsize
                    ++stack_length
                }
            }
            // OUEST
            t = x - 1
            if (t >= 0 && grid[t + y * xsize] != "WALL") {
                let s = mesh[t][y]
                if (s == 0) {
                    mesh[t][y] = k + 1
                    stack[stack_length] = t + y * ysize * xsize
                    ++stack_length
                }
            }
        }

        return mesh

    }

    test(mesh, posx, posy, xsize, ysize) {

        if (mesh[posx][posy] == 1) {
            return "end"
        } else {
            let d = mesh[posx][posy]

            let dir = "none"
            // SUD
			let t = posy + 1
			if (t < ysize && mesh[posx][t] > 0) {
				let s = mesh[posx][t]
				if (d > s) {
                    d = s
                    dir = "bottom"
                }
			}
			// NORD
			t = posy - 1
			if (t >= 0 && mesh[posx][t] > 0) {
				let s = mesh[posx][t]
				if (d > s) {
                    d = s
                    dir = "top"
                }
			}
			// EST
			t = posx + 1
			if (t < xsize && mesh[t][posy] > 0) {
				let s = mesh[t][posy]
				if (d > s) {
                    d = s
                    dir = "right"
                }
			}
			// OUEST
			t = posx - 1
			if (t >= 0 && mesh[t][posy] > 0) {
				let s = mesh[t][posy]
				if (d > s) {
                    d = s
                    dir = "left"
                }
            }
            
            return dir
        }

    }

}