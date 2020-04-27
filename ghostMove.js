/* @copyright 2020 */

function max(a) {
	m = a[0];
	index = 0;
	for(x = 1; x < a.length; ++x) {
		if (m < a[x]) {
			m = a[x];
			index = x;
		}
	}
	return index;
}

function min(a) {
	m = a[0];
	index = 0;
	for(x = 1; x < a.length; ++x) {
		if (m > a[x]) {
			m = a[x];
			index = x;
		}
	}
	return index;
}

algoLee = {
	"stack" : [],
	"stack_length" : 0,
	"stack_position" : 0,
};

gameplay = {
	"xsize" : 40,
	"ysize" : 20,
	"x_length" : 30,
	"y_length" : 30
};
ghost = {
	"state" : 0,
	"timer" : 50,
	"ghost_x" : 0,
	"ghost_y" : 0,
	"ghost_destination_x" : Math.floor(Math.random() * gameplay.xsize),
	"ghost_destination_y" : Math.floor(Math.random() * gameplay.ysize),
	"ghost_not_move_count" : 0,
	"ghost_img" : new Image(),
	"move" : function() {

		x.ghost_last_x = x.ghost_x;
		x.ghost_last_y = x.ghost_y;
		d = gameplay.mesh[x.ghost_x][x.ghost_y];
		dir = "none";
		// SUD
		if (x.ghost_y + 1 < gameplay.ysize && gameplay.board[x.ghost_x][x.ghost_y+1] == "ROAD") {
			s = gameplay.mesh[x.ghost_x][x.ghost_y+1];
			if (d > s) { d = s; dir = "sud"; }
		}
		// NORD
		if (x.ghost_y - 1 >= 0 && gameplay.board[x.ghost_x][x.ghost_y-1] == "ROAD") {
			s = gameplay.mesh[x.ghost_x][x.ghost_y-1];
			if (d > s) { d = s; dir = "nord"; }
		}
		// EST
		if (x.ghost_x + 1 < gameplay.xsize && gameplay.board[x.ghost_x+1][x.ghost_y] == "ROAD") {
			s = gameplay.mesh[x.ghost_x+1][x.ghost_y];
			if (d > s) { d = s; dir = "est"; }
		}
		// OUEST
		if (x.ghost_x - 1 >= 0 && gameplay.board[x.ghost_x-1][x.ghost_y] == "ROAD") {
			s = gameplay.mesh[x.ghost_x-1][x.ghost_y];
			if (d > s) { d = s; dir = "ouest"; }
		}

		if (dir == "sud") ++x.ghost_y;
		if (dir == "nord") --x.ghost_y;
		if (dir == "est") ++x.ghost_x;
		if (dir == "ouest") --x.ghost_x;

		gameplay.board[x.ghost_x][x.ghost_y] = "WHEELED";

		if (x.ghost_x == x.ghost_destination_x && x.ghost_y == x.ghost_destination_y) {
			// delete weeled
			for(y = 0; y < x.ysize; ++y) {
				for(u = 0; u < x.xsize; ++u) {
					c = gameplay.board[u][y];
					if (c == "WHEELED") gameplay.board[u][y] = "ROAD";
				}
			}
			x.ghost_destination_x = Math.floor(Math.random() * x.xsize);
			x.ghost_destination_y = Math.floor(Math.random() * x.ysize);
			while(gameplay.board[x.ghost_destination_x][x.ghost_destination_y] == "WALL") {
				x.ghost_destination_x = Math.floor(Math.random() * x.xsize);
				x.ghost_destination_y = Math.floor(Math.random() * x.ysize);
			}
			Lee();
		}
	},
	"display" : function() {
		ctx.clearRect(0, 0, x.xsize * x.xl, x.ysize * x.yl);
		for(y = 0; y < x.ysize; ++y) {
			for(u = 0; u < x.xsize; ++u) {
				g = gameplay.mesh[u][y];
				if (g > 0) {
					ctx.fillStyle = "#BBBBFFFF";
					ctx.fillRect(u * xl + 2, y * yl + 2, xl - 5, yl - 5);
				}
				c = gameplay.board[u][y];
				if (c == "WALL") {
					ctx.fillStyle = "#222222FF";
					ctx.fillRect(u*xl + 2, y*yl + 2, xl - 5, yl - 5);
				} else if (c == "ROAD" && g == 0) {
					ctx.fillStyle = "#FFFFFFFF";
					ctx.fillRect(u*xl + 2, y*yl + 2, xl - 5, yl - 5);
				} else if (c == "WHEELED") {
					ctx.fillStyle = "#00EE00FF";
					ctx.fillRect(u*xl + 2, y*yl + 2, xl - 5, yl - 5);
				}
			}
		}
		ctx.fillStyle = "red";
		ctx.fillRect(x.ghost_destination_x * x.xl + 2, x.ghost_destination_y * x.yl + 2, x.xl - 5, x.yl - 5);
//		ctx.fillStyle = "#222222FF";
//		for(y = 0; y < ysize; ++y) {
//			for(u = 0; u < xsize; ++u) {
//				n = gameplay.mesh[u][y];
//				ctx.fillText(n, u*xl + 2, y*yl + 2 + yl/2);
//			}
//		}
		ctx.drawImage(x.ghost_img, x.ghost_x * x.xl + 2, x.ghost_y * x.yl + 2, x.xl - 5, x.yl - 5);
	},
	"loop" : function() {
		x = ghost;
		switch(x.state) {
			case 0:
				x.display();
				break;
			case 49:
				x.move();
				break;
			case 50:
				if (x.ghost_last_x == x.ghost_x && x.ghost_last_y == x.ghost_y) {
					++x.ghost_not_move_count;
					if (x.ghost_not_move_count >= 10) {
						x.ghost_not_move_count = 0;
						x.ghost_x = Math.floor(Math.random() * x.xsize);
						x.ghost_y = Math.floor(Math.random() * x.ysize);
						while(gameplay.board[x.ghost_x][x.ghost_y] == "WALL") {
							x.ghost_x = Math.floor(Math.random() * x.xsize);
							x.ghost_y = Math.floor(Math.random() * x.ysize);
						}
					}
				}
				break;
		}
		if (x.state < x.timer) {
			++x.state;
		} else {
			x.state = 0;
		}
	},
	"play" : function(canvas) {
		this.timeout = setInterval(this.loop, 0.001);
		this.ctx = canvas.getContext("2d");
	}
};

function Lee() {
	// 0 : SUD, 1 : NORD, 2 : OUEST, 3 : EST
	gameplay.mesh = new Array(xsize).fill(0).map(x => new Array(ysize).fill(0).map(x => new Array(4)));

	for(y = 0; y < ysize; ++y) {
		for(x = 0; x < xsize; ++x) {
			if (gameplay.board[x][y] == "ROAD") {
				gameplay.mesh[x][y] = 0;
			}
		}
	}
	gameplay.mesh[ghost.ghost_destination_x][ghost.ghost_destination_y] = 1;
	algoLee.stack = [];
	algoLee.stack_length = 0;
	algoLee.stack[algoLee.stack_length] = ghost.ghost_destination_x + ghost.ghost_destination_y * ysize * xsize;
	++algoLee.stack_length;
	algoLee.stack_position = 0;
	while(algoLee.stack_position < algoLee.stack_length) {
		c = algoLee.stack[algoLee.stack_position];
		++algoLee.stack_position;
		x = c % (ysize * xsize);
		y = (c - x) / (ysize * xsize);

		u = gameplay.mesh[x][y];
		// SUD
		if (y + 1 < ysize && gameplay.board[x][y+1] == "ROAD") {
			s = gameplay.mesh[x][y+1];
			if (s == 0) {
				gameplay.mesh[x][y+1] = u + 1;
				algoLee.stack[algoLee.stack_length] = x + (y+1) * ysize * xsize;
				++algoLee.stack_length;
			}
		}
		// NORD
		if (y - 1 >= 0 && gameplay.board[x][y-1] == "ROAD") {
			s = gameplay.mesh[x][y-1];
			if (s == 0) {
				gameplay.mesh[x][y-1] = u + 1;
				algoLee.stack[algoLee.stack_length] = x + (y-1) * ysize * xsize;
				++algoLee.stack_length;
			}
		}
		// EST
		if (x + 1 < xsize && gameplay.board[x+1][y] == "ROAD") {
			s = gameplay.mesh[x+1][y];
			if (s == 0) {
				gameplay.mesh[x+1][y] = u + 1;
				algoLee.stack[algoLee.stack_length] = x+1 + y * ysize * xsize;
				++algoLee.stack_length;
			}
		}
		// OUEST
		if (x - 1 >= 0 && gameplay.board[x-1][y] == "ROAD") {
			s = gameplay.mesh[x-1][y];
			if (s == 0) {
				gameplay.mesh[x-1][y] = u + 1;
				algoLee.stack[algoLee.stack_length] = x-1 + y * ysize * xsize;
				++algoLee.stack_length;
			}
		}
	}
}

function play(canvas) {

	xsize = gameplay.xsize;
	ysize = gameplay.ysize;


	xl = gameplay.x_length;
	yl = gameplay.y_length;

	canvas.width = xsize *xl;
	canvas.height = ysize * yl;

	ctx = canvas.getContext("2d");

	gameplay.board = new Array(xsize).fill(0).map(x => new Array(ysize).fill(0));
	for(y = 0; y < ysize; ++y) {
		for(x = 0; x < xsize; ++x) {
			r = Math.random();
			if (r <= 0.7)
				gameplay.board[x][y] = "ROAD";
			else
				gameplay.board[x][y] = "WALL";
		}
	}

	for(y = 0; y < ysize; ++y) {
		for(x = 0; x < xsize; ++x) {
			c = gameplay.board[x][y];
			if (c == "WALL") {
				ctx.fillStyle = "#808080FF";
				ctx.fillRect(x*xl + 2, y*yl + 2, xl - 5, yl- 5);
			} else {
				ctx.fillStyle = "#BBBBBBFF";
				ctx.fillRect(x*xl + 2, y*yl + 2, xl- 5, yl- 5);
			}
		}
	}

	Lee();

	ctx.fillStyle = "red";
	ctx.fillRect(ghost.ghost_destination_x * xl + 2, ghost.ghost_destination_y * yl + 2, xl - 5, yl - 5);
	ctx.fillStyle = "#222222FF";
	for(y = 0; y < ysize; ++y) {
		for(u = 0; u < xsize; ++u) {
			n = gameplay.mesh[u][y];
			ctx.fillText(n, u*xl + 2, y*yl + 2 + yl/2);
		}
	}

	ghost.xsize = xsize;
	ghost.ysize = ysize;
	ghost.xl = xl;
	ghost.yl = yl;
	ghost.play(canvas);


}

function init() {
	ghost.ghost_img.src = "ghost_purple_1.png";
}