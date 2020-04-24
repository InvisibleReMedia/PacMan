/* @copyright 2020 */

pacManGame = {
	"state" : 0,
	"score" : 0,
	"interval" : 0.000001,
	"timer" : 100,
	"pacman_pos_x" : 0,
	"pacman_pos_y" : 0,
	"pacman_lastPos_x" : 0,
	"pacman_lastPos_y" : 0,
	"pacman_move" : 5,
	"pacman_eating" : false,
	"pacman1_left" : new Image(),
	"pacman1_right" : new Image(),
	"pacman1_top" : new Image(),
	"pacman1_bottom" : new Image(),
	"pacman2_left" : new Image(),
	"pacman2_right" : new Image(),
	"pacman2_top" : new Image(),
	"pacman2_bottom" : new Image(),
	"ghosts" : [
		{
			"ghost_1" : new Image(),
			"ghost_2" : new Image(),
			"color" : "purple",
			"ghost_eye" : false,
			"ghost_lastPos_x" : 0,
			"ghost_lastPos_y" : 0,
			"ghost_pos_x" : 3,
			"ghost_pos_y" : 3,
			"ghost_move" : 7,
			"ghost_destination_x" : 10,
			"ghost_destination_y" : 10,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right"
		},
		{
			"ghost_1" : new Image(),
			"ghost_2" : new Image(),
			"color" : "red",
			"ghost_eye" : false,
			"ghost_lastPos_x" : 0,
			"ghost_lastPos_y" : 0,
			"ghost_pos_x" : 7,
			"ghost_pos_y" : 0,
			"ghost_move" : 7,
			"ghost_destination_x" : 10,
			"ghost_destination_y" : 10,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right"
		},
		{
			"ghost_1" : new Image(),
			"ghost_2" : new Image(),
			"color" : "green",
			"ghost_eye" : false,
			"ghost_lastPos_x" : 0,
			"ghost_lastPos_y" : 0,
			"ghost_pos_x" : 7,
			"ghost_pos_y" : 20,
			"ghost_move" : 3,
			"ghost_destination_x" : 10,
			"ghost_destination_y" : 10,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right"
		},
		{
			"ghost_1" : new Image(),
			"ghost_2" : new Image(),
			"color" : "blue",
			"ghost_eye" : false,
			"ghost_lastPos_x" : 0,
			"ghost_lastPos_y" : 0,
			"ghost_pos_x" : 5,
			"ghost_pos_y" : 9,
			"ghost_move" : 3,
			"ghost_destination_x" : 0,
			"ghost_destination_y" : 0,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right"
		}
	],
	"horizontal_scroll" : 0,
	"vertical_scroll" : 0,
	"banner_h_scroll" : 0,
	"banner_v_scroll" : 0,
	"pacman_orientation" : "right",
	"pacman_rotate" : 0,
	"pacmanCanMove" : true,
	"firstPass" : function(canvas, level) {
		canvas.width = this.xsize * this.xl;
		canvas.height = this.ysize * this.yl;
		this.canvas = canvas;
		this.level = level;
		this.banner = document.getElementById("banner");
		this.banner.style.width = (this.canvas.width + 30) + "px";
		this.bravo = document.getElementById("bravo");
		this.pacmanCurrentImage = this.pacman1_right;
		for(u = 0; u < this.ghosts.length; ++u) {
			this.ghosts[u].ghostCurrentImage = this.ghosts[u].ghost_1;
		}
		this.timeout = setInterval(this.play, this.interval);
		window.addEventListener('keydown', function(e) {
			if (e.keyCode == 37) {
				pacManGame.pacman_old_orientation = pacManGame.pacman_orientation;
				pacManGame.pacman_orientation = "left";
			}
			else if (e.keyCode == 39) {
				pacManGame.pacman_old_orientation = pacManGame.pacman_orientation;
				pacManGame.pacman_orientation = "right";
			}
			else if (e.keyCode == 38) {
				pacManGame.pacman_old_orientation = pacManGame.pacman_orientation;
				pacManGame.pacman_orientation = "top";
			}
			else if (e.keyCode == 40) {
				pacManGame.pacman_old_orientation = pacManGame.pacman_orientation;
				pacManGame.pacman_orientation = "bottom";
			}
			e.preventDefault();
		});
		window.addEventListener('scroll', function(e) {
			if (pacManGame.banner) {
				if (window.scrollX < pacManGame.canvas.width - pacManGame.banner.offsetWidth + 34)
					pacManGame.banner.style.left = window.scrollX + "px";
				else
					pacManGame.banner.style.left = (pacManGame.canvas.width - pacManGame.banner.offsetWidth + 34) + "px";
				pacManGame.banner.style.top = window.scrollY + "px";
			}
		});
		x = this;
		x.horizontal_scroll = x.pacman_pos_x - 2 * x.xl;
		x.vertical_scroll = x.pacman_pos_y - 2 * x.yl;
		window.scroll(x.horizontal_scroll, x.vertical_scroll);
	},
	"pacmanTestMove" : function() {
		if (x.pacman_orientation == "left") {
			x.pacman_lastPos_x = x.pacman_pos_x;
			x.pacman_lastPos_y = x.pacman_pos_y;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_y % x.yl <= x.yl / 2) {
					x.pacman_pos_y -= x.pacman_pos_y % x.yl;
				} else {
					x.pacman_pos_y += x.yl - x.pacman_pos_y % x.yl;
				}
				x.ycell = (x.pacman_pos_y - x.pacman_pos_y % x.yl) / x.yl;
				x.pacman_old_orientation = x.pacman_orientation;
			}
			if (x.pacman_pos_x % x.xl < x.xl / 2) {
				x.xcell = (x.pacman_pos_x - x.pacman_pos_x % x.xl) / x.xl;
			}
			if (x.xcell == 0)
				nextXCell = x.xsize - 1;
			else
				nextXCell = x.xcell - 1;
			if (x.cells[nextXCell + x.ycell * x.xsize] == "WALL") {
				x.pacman_pos_x = x.pacman_pos_x - x.pacman_pos_x % x.xl;
				x.pacmanCanMove = false;
			} else {
				x.pacmanCanMove = true;
			}
		} else if (x.pacman_orientation == "right") {
			x.pacman_lastPos_x = x.pacman_pos_x;
			x.pacman_lastPos_y = x.pacman_pos_y;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_y % x.yl <= x.yl / 2) {
					x.pacman_pos_y -= x.pacman_pos_y % x.yl;
				} else {
					x.pacman_pos_y += x.yl - x.pacman_pos_y % x.yl;
				}
				x.ycell = (x.pacman_pos_y - x.pacman_pos_y % x.yl) / x.yl;
				x.pacman_old_orientation = x.pacman_orientation;
			}
			if (x.pacman_pos_x % x.xl < x.xl / 2) {
				x.xcell = (x.pacman_pos_x - x.pacman_pos_x % x.xl) / x.xl;
			}
			if (x.xcell == x.xsize - 1)
				nextXCell = 0;
			else
				nextXCell = x.xcell + 1;
			if (x.cells[nextXCell + x.ycell * x.xsize] == "WALL") {
				x.pacman_pos_x = x.pacman_pos_x - x.pacman_pos_x % x.xl;
				x.pacmanCanMove = false;
			} else {
				x.pacmanCanMove = true;
			}
		} else if (x.pacman_orientation == "top") {
			x.pacman_lastPos_y = x.pacman_pos_y;
			x.pacman_lastPos_x = x.pacman_pos_x;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_x % x.xl <= x.xl / 2) {
					x.pacman_pos_x -= x.pacman_pos_x % x.xl;
				} else {
					x.pacman_pos_x += x.xl - x.pacman_pos_x % x.xl;
				}
				x.xcell = (x.pacman_pos_x - x.pacman_pos_x % x.xl) / x.xl;
				x.pacman_old_orientation = x.pacman_orientation;
			}
			if (x.pacman_pos_y % x.yl < x.yl / 2) {
				x.ycell = (x.pacman_pos_y - x.pacman_pos_y % x.yl) / x.yl;
			}
			if (x.ycell == 0)
				nextYCell = x.ysize - 1;
			else
				nextYCell = x.ycell - 1;
			if (x.cells[x.xcell + nextYCell * x.xsize] == "WALL") {
				x.pacman_pos_y = x.pacman_pos_y - x.pacman_pos_y % x.yl;
				x.pacmanCanMove = false;
			} else {
				x.pacmanCanMove = true;
			}
		} else if (x.pacman_orientation == "bottom") {
			x.pacman_lastPos_y = x.pacman_pos_y;
			x.pacman_lastPos_x = x.pacman_pos_x;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_x % x.xl <= x.xl / 2) {
					x.pacman_pos_x -= x.pacman_pos_x % x.xl;
				} else {
					x.pacman_pos_x += x.xl - x.pacman_pos_x % x.xl;
				}
				x.xcell = (x.pacman_pos_x - x.pacman_pos_x % x.xl) / x.xl;
				x.pacman_old_orientation = x.pacman_orientation;
			}
			if (x.pacman_pos_y % x.yl < x.yl / 2) {
				x.ycell = (x.pacman_pos_y - x.pacman_pos_y % x.yl) / x.yl;
			}
			if (x.ycell == x.ysize - 1)
				nextYCell = 0;
			else
				nextYCell = x.ycell + 1;
			if (x.cells[x.xcell + nextYCell * x.xsize] == "WALL") {
				x.pacman_pos_y = x.pacman_pos_y - x.pacman_pos_y % x.yl;
				x.pacmanCanMove = false;
			} else {
				x.pacmanCanMove = true;
			}
		}
	},
	"ghostTestMove" : function() {
		for(u = 0; u < x.ghosts.length; ++u) {
			++x.ghosts[u].ghost_move_count;
			if (x.ghosts[u].ghost_move_count >= 5) {
				x.ghosts[u].ghost_move_count = 0;
				dest_x = x.ghosts[u].ghost_destination_x - x.ghosts[u].ghost_pos_x;
				dest_y = x.ghosts[u].ghost_destination_y - x.ghosts[u].ghost_pos_y;
				if (Math.abs(dest_x) <= 1 && Math.abs(dest_y) <= 1) {
					ghostCanMove = false;
					x.ghosts[u].ghost_destination_x = Math.random() * x.xsize;
					x.ghosts[u].ghost_destination_y = Math.random() * x.ysize;
					dest_x = x.ghosts[u].ghost_destination_x - x.ghosts[u].ghost_pos_x;
					dest_y = x.ghosts[u].ghost_destination_y - x.ghosts[u].ghost_pos_y;
				}
				canMove = [];
				canMoveCount = 0;
				if (x.ghosts[u].xcell == 0)
					nextXCell = x.xsize - 1;
				else
					nextXCell = x.ghosts[u].xcell - 1;
				if (x.cells[nextXCell + x.ghosts[u].ycell * x.xsize] != "WALL") {
					canMove[canMoveCount] = "left";
					++canMoveCount;
				}
				if (x.ghosts[u].xcell == x.xsize - 1)
					nextXCell = 0;
				else
					nextXCell = x.ghosts[u].xcell + 1;
				if (x.cells[nextXCell + x.ghosts[u].ycell * x.xsize] != "WALL") {
					canMove[canMoveCount] = "right";
					++canMoveCount;
				}
				if (x.ghosts[u].ycell == 0)
					nextYCell = x.ysize - 1;
				else
					nextYCell = x.ghosts[u].ycell - 1;
				if (x.cells[x.ghosts[u].xcell + nextYCell * x.xsize] != "WALL") {
					canMove[canMoveCount] = "top";
					++canMoveCount;
				}
				if (x.ghosts[u].ycell == x.ysize - 1)
					nextYCell = 0;
				else
					nextYCell = x.ghosts[u].ycell + 1;
				if (x.cells[x.ghosts[u].xcell + nextYCell * x.xsize] != "WALL") {
					canMove[canMoveCount] = "bottom";
					++canMoveCount;
				}
				ang = (Math.atan(dest_y / dest_x) * 180) / Math.PI;
				if (ang >= 0 && ang < 90) {
					dirx = "right";
					diry = "top";
				} else if (ang <= 0 && ang > -90) {
					dirx = "left";
					diry = "top";
				} else if (ang >= 90) {
					dirx = "right";
					diry = "bottom";
				} else if (ang <= -90) {
					dirx = "left";
					diry = "bottom";
				}
				seldir = "none";
				if (x.ghosts[u].ghost_direction_change == "vertical" || x.ghosts[u].ghost_direction_change == "none") {
					x.ghosts[u].ghost_direction_change = "horizontal";
					for(g = 0; g < canMoveCount; ++g) {
						if (canMove[g] == dirx) {
							seldir = dirx;
						}
					}
				}
				if (seldir == "none") {
					x.ghosts[u].ghost_direction_change = "vertical";
					for(g = 0; g < canMoveCount; ++g) {
						if (canMove[g] == diry) {
							seldir = diry;
						}
					}
				}
				if (seldir == "none") {
					k = Math.floor(Math.random() * 20) + 10;
					for(;k >= 0; --k) {
						m = Math.floor(Math.random() * canMoveCount);
						n = Math.floor(Math.random() * canMoveCount);
						temp = canMove[n];
						canMove[n] = canMove[m];
						canMove[m] = temp;
					}
					r = Math.floor(Math.random() * canMoveCount);
					x.ghosts[u].ghost_orientation = canMove[r];
				} else {
					x.ghosts[u].ghost_orientation = seldir;
				}
			}

			x.ghosts[u].ghost_lastPos_x = x.ghosts[u].ghost_pos_x;
			x.ghosts[u].ghost_lastPos_y = x.ghosts[u].ghost_pos_y;
			if (x.ghosts[u].ghost_orientation == "left") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_move_count = 0;
					if (x.ghosts[u].ghost_pos_y % x.yl <= x.yl / 2) {
						x.ghosts[u].ghost_pos_y -= x.ghosts[u].ghost_pos_y % x.yl;
					} else {
						x.ghosts[u].ghost_pos_y += x.yl - x.ghosts[u].ghost_pos_y % x.yl;
					}
					x.ghosts[u].ycell = (x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl) / x.yl;
					x.ghosts[u].ghost_old_orientation = x.ghosts[u].ghost_orientation;
				}
				if (x.ghosts[u].ghost_pos_x % x.xl < x.xl / 2) {
					x.ghosts[u].xcell = (x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl) / x.xl;
				}
				if (x.ghosts[u].xcell == 0)
					nextXCell = x.xsize - 1;
				else
					nextXCell = x.ghosts[u].xcell - 1;
				if (x.cells[nextXCell + x.ghosts[u].ycell * x.xsize] == "WALL") {
					x.ghosts[u].ghost_pos_x = x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl;
					ghostCanMove = false;
				}
			} else if (x.ghosts[u].ghost_orientation == "right") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_move_count = 0;
					if (x.ghosts[u].ghost_pos_y % x.yl <= x.yl / 2) {
						x.ghosts[u].ghost_pos_y -= x.ghosts[u].ghost_pos_y % x.yl;
					} else {
						x.ghosts[u].ghost_pos_y += x.yl - x.ghosts[u].ghost_pos_y % x.yl;
					}
					x.ghosts[u].ycell = (x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl) / x.yl;
					x.ghosts[u].ghost_old_orientation = x.ghosts[u].ghost_orientation;
				}
				if (x.ghosts[u].ghost_pos_x % x.xl < x.xl / 2) {
					x.ghosts[u].xcell = (x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl) / x.xl;
				}
				if (x.ghosts[u].xcell == x.xsize - 1)
					nextXCell = 0;
				else
					nextXCell = x.ghosts[u].xcell + 1;
				if (x.cells[nextXCell + x.ghosts[u].ycell * x.xsize] == "WALL") {
					x.ghosts[u].ghost_pos_x = x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl;
					ghostCanMove = false;
				}
			} else if (x.ghosts[u].ghost_orientation == "top") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_move_count = 0;
					if (x.ghosts[u].ghost_pos_x % x.xl <= x.xl / 2) {
						x.ghosts[u].ghost_pos_x -= x.ghosts[u].ghost_pos_x % x.xl;
					} else {
						x.ghosts[u].ghost_pos_x += x.xl - x.ghosts[u].ghost_pos_x % x.xl;
					}
					x.ghosts[u].xcell = (x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl) / x.xl;
					x.ghosts[u].ghost_old_orientation = x.ghosts[u].ghost_orientation;
				}
				if (x.ghosts[u].ghost_pos_y % x.yl < x.yl / 2) {
					x.ghosts[u].ycell = (x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl) / x.yl;
				}
				if (x.ghosts[u].ycell == 0)
					nextYCell = x.ysize - 1;
				else
					nextYCell = x.ghosts[u].ycell - 1;
				if (x.cells[x.ghosts[u].xcell + nextYCell * x.xsize] == "WALL") {
					x.ghosts[u].ghost_pos_y = x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl;
					ghostCanMove = false;
				}
			} else if (x.ghosts[u].ghost_orientation == "bottom") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_move_count = 0;
					if (x.ghosts[u].ghost_pos_x % x.xl <= x.xl / 2) {
						x.ghosts[u].ghost_pos_x -= x.ghosts[u].ghost_pos_x % x.xl;
					} else {
						x.ghosts[u].ghost_pos_x += x.xl - x.ghosts[u].ghost_pos_x % x.xl;
					}
					x.ghosts[u].xcell = (x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl) / x.xl;
					x.ghosts[u].ghost_old_orientation = x.ghosts[u].ghost_orientation;
				}
				if (x.ghosts[u].ghost_pos_y % x.yl < x.yl / 2) {
					x.ghosts[u].ycell = (x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl) / x.yl;
				}
				if (x.ghosts[u].ycell == x.ysize - 1)
					nextYCell = 0;
				else
					nextYCell = x.ghosts[u].ycell + 1;
				if (x.cells[x.ghosts[u].xcell + nextYCell * x.xsize] == "WALL") {
					x.ghosts[u].ghost_pos_y = x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl;
					ghostCanMove = false;
				}
			}
		}
	},
	"pacmanMove" : function() {
		x.pacmanTestMove();
		if (x.pacmanCanMove) {
			if (x.pacman_orientation == "left") {
				pacman_center_x = x.pacman_pos_x + x.xl / 8 + x.xl / 1.3 / 2;
				if (pacman_center_x <= x.xl / 2) {
					x.pacman_pos_x = x.canvas.width - x.xl / 2;
					x.horizontal_scroll = x.pacman_pos_x - screen.availWidth + 2 * x.xl;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				} else {
					x.pacman_pos_x -= x.pacman_move;
				}
				viewport_x_left = x.horizontal_scroll + screen.availWidth / 3;
				viewport_x_right = (x.horizontal_scroll + screen.availWidth) * 3/4;
				if (viewport_x_left > x.pacman_pos_x || viewport_x_right <= x.pacman_pos_x) {
					x.horizontal_scroll = x.pacman_pos_x - 2 * x.xl;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				}
				if (x.pacman_eating)
					x.pacmanCurrentImage = x.pacman2_left;
				else
					x.pacmanCurrentImage = x.pacman1_left;
			}
			else if (x.pacman_orientation == "right") {
				pacman_center_x = x.pacman_pos_x + x.xl / 8 + x.xl / 1.3 / 2;
				if (pacman_center_x >= x.canvas.width - x.xl / 2) {
					x.pacman_pos_x = 0;
					x.horizontal_scroll = -34;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				} else {
					x.pacman_pos_x += x.pacman_move;
				}
				viewport_x_left = x.horizontal_scroll + screen.availWidth / 3;
				viewport_x_right = (x.horizontal_scroll + screen.availWidth) * 3/4;
				if (viewport_x_left > x.pacman_pos_x || viewport_x_right <= x.pacman_pos_x) {
					x.horizontal_scroll = x.pacman_pos_x - 2 * x.xl;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				}
				if (x.pacman_eating)
					x.pacmanCurrentImage = x.pacman2_right;
				else
					x.pacmanCurrentImage = x.pacman1_right;
			}
			else if (x.pacman_orientation == "top") {
				pacman_center_y = x.pacman_pos_y + x.yl / 8 + x.yl / 1.4 / 2;
				if (pacman_center_y <= x.yl / 2) {
					x.pacman_pos_y = x.canvas.height - x.yl / 2;
					x.vertical_scroll = x.pacman_pos_y;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				} else {
					x.pacman_pos_y -= x.pacman_move;
				}
				viewport_y_top = x.vertical_scroll + screen.availHeight / 3;
				viewport_y_bottom = (x.vertical_scroll + screen.availHeight) * 3/4;
				if (viewport_y_top > x.pacman_pos_y || viewport_y_bottom <= x.pacman_pos_y) {
					x.vertical_scroll = x.pacman_pos_y - 2 * x.yl;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				}
				if (x.pacman_eating)
					x.pacmanCurrentImage = x.pacman2_top;
				else
					x.pacmanCurrentImage = x.pacman1_top;
			}
			else if (x.pacman_orientation == "bottom") {
				pacman_center_y = x.pacman_pos_y + x.yl / 8 + x.yl / 1.4 / 2;
				if (pacman_center_y >= x.canvas.height - x.yl / 2) {
					x.pacman_pos_y = 0;
					x.vertical_scroll = 0;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				} else {
					x.pacman_pos_y += x.pacman_move;
				}
				viewport_y_top = x.vertical_scroll + screen.availHeight / 3;
				viewport_y_bottom = (x.vertical_scroll + screen.availHeight) * 3/4;
				if (viewport_y_top > x.pacman_pos_y || viewport_y_bottom <= x.pacman_pos_y) {
					x.vertical_scroll = x.pacman_pos_y - 2 * x.yl;
					window.scroll(x.horizontal_scroll, x.vertical_scroll);
				}
				if (x.pacman_eating)
					x.pacmanCurrentImage = x.pacman2_bottom;
				else
					x.pacmanCurrentImage = x.pacman1_bottom;
			}
		}
		if (x.ghost_pink_eye)
			x.ghostPinkCurrentImage = x.ghost_pink_2;
		else
			x.ghostPinkCurrentImage = x.ghost_pink_1;
	},
	"ghostMove" : function() {
		x.ghostTestMove();
		for(u = 0; u < x.ghosts.length; ++u) {
			if (x.ghosts[u].ghost_orientation == "left") {
				ghost_center_x = x.ghosts[u].ghost_pos_x + x.xl / 8 + x.xl / 1.3 / 2;
				if (ghost_center_x <= x.xl / 2) {
					x.ghosts[u].ghost_pos_x = x.canvas.width - x.xl / 2;
				} else {
					x.ghosts[u].ghost_pos_x -= x.ghosts[u].ghost_move;
				}
				if (x.ghosts[u].ghost_eye)
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_1;
				else
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_2;
			}
			else if (x.ghosts[u].ghost_orientation == "right") {
				ghost_center_x = x.ghosts[u].ghost_pos_x + x.xl / 8 + x.xl / 1.3 / 2;
				if (ghost_center_x >= x.canvas.width - x.xl / 2) {
					x.ghosts[u].ghost_pos_x = 0;
				} else {
					x.ghosts[u].ghost_pos_x += x.ghosts[u].ghost_move;
				}
				if (x.ghosts[u].ghost_eye)
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_1;
				else
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_2;
			}
			else if (x.ghosts[u].ghost_orientation == "top") {
				ghost_center_y = x.ghosts[u].ghost_pos_y + x.yl / 8 + x.yl / 1.4 / 2;
				if (ghost_center_y <= x.yl / 2) {
					x.ghosts[u].ghost_pos_y = x.canvas.height - x.yl / 2;
				} else {
					x.ghosts[u].ghost_pos_y -= x.ghosts[u].ghost_move;
				}
				if (x.ghosts[u].ghost_eye)
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_1;
				else
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_2;
			}
			else if (x.ghosts[u].ghost_orientation == "bottom") {
				ghost_center_y = x.ghosts[u].ghost_pos_y + x.yl / 8 + x.yl / 1.4 / 2;
				if (ghost_center_y >= x.canvas.height - x.yl / 2) {
					x.ghosts[u].ghost_pos_y = 0;
				} else {
					x.ghosts[u].ghost_pos_y += x.ghosts[u].ghost_move;
				}
				if (x.ghosts[u].ghost_eye)
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_1;
				else
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_2;
			}
		}
	},
	"pacmanDraw" : function() {
		ctx.clearRect(x.pacman_lastPos_x + x.xl / 8 - x.pacman_move, x.pacman_lastPos_y + x.yl / 8 - x.pacman_move, x.xl / 1.3 + x.pacman_move * 2, x.yl / 1.3 + x.pacman_move * 2);
		ctx.drawImage(x.pacmanCurrentImage, x.pacman_pos_x + x.xl / 8, x.pacman_pos_y + x.yl / 8, x.xl / 1.3, x.yl / 1.3);
		if (x.cells[x.xcell + x.ycell * x.xsize] == "CAKE") {
			x.cells[x.xcell + x.ycell * x.xsize] = "EMPTY";
			drawGameplay(board, x.level);
			pacManGame.banner.childNodes[1].innerText = gameplay[pacManGame.level].cakeCounter;
			++pacManGame.score;
			numbers(pacManGame.score * 100);
			if (gameplay[pacManGame.level].cakeCounter == 0) {
				clearInterval(pacManGame.timeout);
				pacManGame.bravo.style.left = window.scrollX + "px";
				pacManGame.bravo.style.width = screen.availWidth + "px";
				pacManGame.bravo.style.height = screen.availHeight + "px";
				pacManGame.bravo.style.top = window.scrollY + "px";
				pacManGame.bravo.style.display = "inline";
			}
		}
	},
	"ghostDraw" : function() {
		for(u = 0; u < x.ghosts.length; ++u) {
			ctx.clearRect(x.ghosts[u].ghost_lastPos_x + x.xl / 8 - x.ghosts[u].ghost_move, x.ghosts[u].ghost_lastPos_y + x.yl / 8 - x.ghosts[u].ghost_move, x.xl / 1.3 + x.ghosts[u].ghost_move * 2, x.yl / 1.3 + x.ghosts[u].ghost_move * 2);
		}
		for(u = 0; u < x.ghosts.length; ++u) {
			ctx.drawImage(x.ghosts[u].ghostCurrentImage, x.ghosts[u].ghost_pos_x + x.xl / 8, x.ghosts[u].ghost_pos_y + x.yl / 8, x.xl / 1.3, x.yl / 1.3);
		}
	},
	"play" : function() {
		x = pacManGame;
		ctx = x.canvas.getContext("2d");
		switch(x.state) {
			case 0:
				x.pacmanDraw();
				break;
			case 1:
				x.pacmanMove();
				break;
			case 2:
				x.ghostDraw();
				break;
			case 3:
				x.ghostMove();
				break;
			case 10:
				x.pacmanDraw();
				break;
			case 11:
				x.pacmanMove();
				break;
			case 12:
				x.ghostDraw();
				break;
			case 13:
				x.ghostMove();
				break;
			case 20:
				x.pacmanDraw();
				break;
			case 21:
				x.pacmanMove();
				break;
			case 22:
				x.ghostDraw();
				break;
			case 23:
				x.ghostMove();
				break;
			case 30:
				x.pacmanDraw();
				break;
			case 31:
				x.pacmanMove();
				break;
			case 32:
				x.ghostDraw();
				break;
			case 33:
				x.ghostMove();
				break;
			case 40:
				x.pacman_eating = true;
				for(u = 0; u < x.ghosts.length; ++u) {
					x.ghosts[u].ghost_eye = true;
				}
				break;
			case 41:
				x.pacmanDraw();
				break;
			case 42:
				x.pacmanMove();
				break;
			case 43:
				x.ghostDraw();
				break;
			case 44:
				x.ghostMove();
				break;
			case 51:
				x.pacmanDraw();
				break;
			case 52:
				x.pacmanMove();
				break;
			case 53:
				x.ghostDraw();
				break;
			case 54:
				x.ghostMove();
				break;
			case 61:
				x.pacmanDraw();
				break;
			case 62:
				x.pacmanMove();
				break;
			case 63:
				x.ghostDraw();
				break;
			case 64:
				x.ghostMove();
				break;
			case 71:
				x.pacmanDraw();
				break;
			case 72:
				x.pacmanMove();
				break;
			case 73:
				x.ghostDraw();
				break;
			case 74:
				x.ghostMove();
				break;
			case 90:
				x.pacman_eating = false;
				for(u = 0; u < x.ghosts.length; ++u) {
					x.ghosts[u].ghost_eye = false;
				}
				break;
			case 92:
				//x.vertical_scroll += 10;
				//window.scroll(0, x.vertical_scroll);
				//alert(screen.availWidth);
				break;
		}
		if (x.state < x.timer)
			++x.state;
		else
			x.state = 0;
}};

function init(level) {
	pacManGame.pacman1_right.src = "pacman1_right.png";
	pacManGame.pacman2_right.src = "pacman2_right.png";
	pacManGame.pacman1_left.src = "pacman1_left.png";
	pacManGame.pacman2_left.src = "pacman2_left.png";
	pacManGame.pacman1_top.src = "pacman1_top.png";
	pacManGame.pacman2_top.src = "pacman2_top.png";
	pacManGame.pacman1_bottom.src = "pacman1_bottom.png";
	pacManGame.pacman2_bottom.src = "pacman2_bottom.png";
	pacManGame.xsize = gameplay[level].board.x_size;
	pacManGame.ysize = gameplay[level].board.y_size;
	pacManGame.xl = gameplay[level].board.x_length;
	pacManGame.yl = gameplay[level].board.y_length;
	pacManGame.cells = gameplay[level].board.cells;
	pacManGame.pacman_pos_x = 6 * pacManGame.xl;
	pacManGame.pacman_pos_y = 7 * pacManGame.yl;

	for(u = 0; u < pacManGame.ghosts.length; ++u) {
		pacManGame.ghosts[u].ghost_1.src = "ghost_" + pacManGame.ghosts[u].color + "_1.png";
		pacManGame.ghosts[u].ghost_2.src = "ghost_" + pacManGame.ghosts[u].color + "_2.png";
		pacManGame.ghosts[u].ghost_pos_x = pacManGame.ghosts[u].ghost_pos_x * pacManGame.xl;
		pacManGame.ghosts[u].ghost_pos_y = pacManGame.ghosts[u].ghost_pos_y * pacManGame.yl;
	}
}

function numbers(n) {
	z = document.getElementById("score");
	h = "";
	k = n;
	t = Math.log10(n) + 1;
	while(t > 0) {
		m = k % 10;
		if (t == 1 && m > 0 || t > 1)
			h = "<img src='n_" + m + ".png'/>" + h;
		k = (k - k % 10) / 10;
		--t;
	}
	z.innerHTML = h;
}