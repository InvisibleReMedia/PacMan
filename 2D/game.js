/* @copyright 2020 */

var counterMusicPlayer = 1;
var player = null;
var isMediaPlaying = false
function playMusic() {
	if (!player || !isMediaPlaying) {
		if (counterMusicPlayer % 20 == 0) {
			counterMusicPlayer = 1;
			player = document.querySelector('#music');
			player.onplaying = (evt) => { isMediaPlaying = true; };
			player.onended = (evt) => { isMediaPlaying = false; };
			let dash = dashjs.MediaPlayer().create();
            dash.initialize(player, "arr.mpd", true);
		} else {
			// play game
			let p = new Audio("pacman.wav");
			p.load();
			new Promise((resolve, reject) => {
				try {
					p.play();
					++counterMusicPlayer;
					resolve(true);
				} catch {
					reject(false);
				}
			}).catch(_ => _);
		}
	}
}

function Lee(ghost) {
	// 0 : SUD, 1 : NORD, 2 : OUEST, 3 : EST
	ghost.mesh = new Array(x.xsize).fill(0).map(x => new Array(x.ysize).fill(0));

	for(y = 0; y < x.ysize; ++y) {
		for(p = 0; p < x.xsize; ++p) {
			if (x.cells[p][y] != "WALL") {
				ghost.mesh[p][y] = 0;
			}
		}
	}
	dest_x = ghost.ghost_destination_x;
	dest_y = ghost.ghost_destination_y;
	pos_x = (ghost.ghost_pos_x - ghost.ghost_pos_x % x.xl) / x.xl;
	pos_y = (ghost.ghost_pos_y - ghost.ghost_pos_y % x.yl) / x.yl;
	ghost.mesh[dest_x][dest_y] = 1;
	ghost.stack = [];
	ghost.stack_length = 0;
	ghost.stack[ghost.stack_length] = dest_x + dest_y * x.ysize * x.xsize;
	++ghost.stack_length;
	ghost.stack_position = 0;
	while(ghost.stack_position < ghost.stack_length) {
		c = ghost.stack[ghost.stack_position];
		++ghost.stack_position;
		z = c % (x.ysize * x.xsize);
		y = (c - z) / (x.ysize * x.xsize);

		// test si position ghost atteinte
		//if (z == pos_x && y == pos_y)
			//break;
		k = ghost.mesh[z][y];
		// SUD
		t = y + 1;
		if (t < x.ysize && x.cells[z + t * x.xsize] != "WALL") {
			s = ghost.mesh[z][t];
			if (s == 0) {
				ghost.mesh[z][t] = k + 1;
				ghost.stack[ghost.stack_length] = z + t * x.ysize * x.xsize;
				++ghost.stack_length;
			}
		}
		t = y - 1;
		// NORD
		if (t >= 0 && x.cells[z + t * x.xsize] != "WALL") {
			s = ghost.mesh[z][t];
			if (s == 0) {
				ghost.mesh[z][t] = k + 1;
				ghost.stack[ghost.stack_length] = z + t * x.ysize * x.xsize;
				++ghost.stack_length;
			}
		}
		// EST
		t = z + 1;
		if (t < x.xsize && x.cells[t + y * x.xsize] != "WALL") {
			s = ghost.mesh[t][y];
			if (s == 0) {
				ghost.mesh[t][y] = k + 1;
				ghost.stack[ghost.stack_length] = t + y * x.ysize * x.xsize;
				++ghost.stack_length;
			}
		}
		// OUEST
		t = z - 1;
		if (t >= 0 && x.cells[t + y * x.xsize] != "WALL") {
			s = ghost.mesh[t][y];
			if (s == 0) {
				ghost.mesh[t][y] = k + 1;
				ghost.stack[ghost.stack_length] = t + y * x.ysize * x.xsize;
				++ghost.stack_length;
			}
		}
	}
}

pacManGame = {
	"state" : 0,
	"score" : 0,
	"lives" : 3,
	"interval" : 1,
	"timer" : 100,
	"pacman_pos_x" : 0,
	"pacman_pos_y" : 0,
	"pacman_lastPos_x" : 0,
	"pacman_lastPos_y" : 0,
	"pacman_move" : 4,
	"pacman_eating" : false,
	"pacman1_left" : new Image(),
	"pacman1_right" : new Image(),
	"pacman1_top" : new Image(),
	"pacman1_bottom" : new Image(),
	"pacman2_left" : new Image(),
	"pacman2_right" : new Image(),
	"pacman2_top" : new Image(),
	"pacman2_bottom" : new Image(),
	"pacman_lost" : false,
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
			"ghost_move" : 1,
			"ghost_destination_x" : 3,
			"ghost_destination_y" : 3,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right",
			"stack" : [],
			"stack_length" : 0,
			"stack_position" : 0,
			"action_area" : 5
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
			"ghost_move" : 1,
			"ghost_destination_x" : 7,
			"ghost_destination_y" : 0,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right",
			"stack" : [],
			"stack_length" : 0,
			"stack_position" : 0,
			"action_area" : 5
		},
		{
			"ghost_1" : new Image(),
			"ghost_2" : new Image(),
			"color" : "green",
			"ghost_eye" : false,
			"ghost_lastPos_x" : 0,
			"ghost_lastPos_y" : 0,
			"ghost_pos_x" : 7,
			"ghost_pos_y" : 19,
			"ghost_move" : 1,
			"ghost_destination_x" : 7,
			"ghost_destination_y" : 19,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right",
			"stack" : [],
			"stack_length" : 0,
			"stack_position" : 0,
			"action_area" : 10
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
			"ghost_move" : 1,
			"ghost_destination_x" : 5,
			"ghost_destination_y" : 9,
			"ghost_direction_change" : "none",
			"ghost_orientation" : "right",
			"stack" : [],
			"stack_length" : 0,
			"stack_position" : 0,
			"action_area" : 10
		}
	],
	"horizontal_scroll" : 0,
	"vertical_scroll" : 0,
	"banner_h_scroll" : 0,
	"banner_v_scroll" : 0,
	"pacman_orientation" : "right",
	"pacman_rotate" : 0,
	"pacmanCanMove" : true,
	"pacmanSplash" : function() {
		pacManGame.pacmanMove();
		pacManGame.initDraw();
		clearInterval(pacManGame.initDrawTimeout);
	},
	"pacmanStart" : function() {
		pacManGame.timeout = setInterval(pacManGame.play, pacManGame.interval);
		clearInterval(pacManGame.readyTimeout);
	},
	"firstPass" : function(canvas, level) {
		canvas.width = this.xsize * this.xl;
		canvas.height = this.ysize * this.yl;
		this.canvas = canvas;
		this.level = level;
		this.banner = document.getElementById("banner");
		this.banner.style.width = this.canvas.width + "px";
		this.bravo = document.getElementById("bravo");
		this.explode = document.getElementById("explode");
		this.pacmanCurrentImage = this.pacman1_right;
		for(u = 0; u < this.ghosts.length; ++u) {
			this.ghosts[u].ghostCurrentImage = this.ghosts[u].ghost_1;
		}
		window.addEventListener('scroll', function(e) {
			if (pacManGame.banner) {
				if (window.scrollX < pacManGame.canvas.width - pacManGame.banner.offsetWidth + 34) {
					pacManGame.banner.style.left = window.scrollX + "px";
				}
				else {
					pacManGame.banner.style.left = (pacManGame.canvas.width - pacManGame.banner.offsetWidth + 34) + "px";
				}
				pacManGame.banner.style.top = window.scrollY + "px";
			}
		});
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
		x = this;
		x.horizontal_scroll = x.pacman_pos_x - 2 * x.xl;
		x.vertical_scroll = x.pacman_pos_y - 2 * x.yl;
		window.scroll(x.horizontal_scroll, x.vertical_scroll);
		this.readyTimeout = setInterval(this.pacmanStart, 5000);
		this.initDrawTimeout = setInterval(this.pacmanSplash, 2000);
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

			dest_x = x.ghosts[u].ghost_destination_x;
			dest_y = x.ghosts[u].ghost_destination_y;
			pos_x = (x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl) / x.xl;
			pos_y = (x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl) / x.yl;
			if (pos_x == dest_x && pos_y == dest_y) {
				pacman_x = (x.pacman_pos_x - x.pacman_pos_x % x.xl) / x.xl;
				pacman_y = (x.pacman_pos_y - x.pacman_pos_y % x.yl) / x.yl;
				if (Math.abs(pos_x - pacman_x) <= x.ghosts[u].action_area && Math.abs(pos_y - pacman_y) <= x.ghosts[u].action_area) {
					x.ghosts[u].ghost_destination_x = pacman_x;
					x.ghosts[u].ghost_destination_y = pacman_y;
				}
				else {
					do {
						ang = Math.floor(Math.random() * 360);
						dx = Math.floor(x.ghosts[u].action_area * Math.cos(ang * Math.PI / 180)) + 1;
						dy = Math.floor(x.ghosts[u].action_area * Math.sin(ang * Math.PI / 180)) + 1;
						x.ghosts[u].ghost_destination_x = pos_x + dx;
						x.ghosts[u].ghost_destination_y = pos_y + dy;
						if (x.ghosts[u].ghost_destination_x < 0) {
							x.ghosts[u].ghost_destination_x = 0;
						} else if (x.ghosts[u].ghost_destination_x >= x.xsize) {
							x.ghosts[u].ghost_destination_x = x.xsize - 1;
						}
						if (x.ghosts[u].ghost_destination_y < 0) {
							x.ghosts[u].ghost_destination_y = 0;
						} else if (x.ghosts[u].ghost_destination_y >= x.ysize) {
							x.ghosts[u].ghost_destination_y = x.ysize - 1;
						}
					} while(x.cells[x.ghosts[u].ghost_destination_x + x.ghosts[u].ghost_destination_y * x.xsize] == "WALL");
				}
				Lee(x.ghosts[u]);
			}

			x.ghosts[u].ghost_lastPos_x = x.ghosts[u].ghost_pos_x;
			x.ghosts[u].ghost_lastPos_y = x.ghosts[u].ghost_pos_y;

			d = x.ghosts[u].mesh[pos_x][pos_y];
			dir = "none";
			// SUD
			t = pos_y + 1;
			if (t < x.ysize && x.cells[pos_x + t * x.xsize] != "WALL") {
				s = x.ghosts[u].mesh[pos_x][t];
				if (d > s) { d = s; dir = "sud"; }
			}
			// NORD
			t = pos_y - 1;
			if (t >= 0 && x.cells[pos_x + t * x.xsize] != "WALL") {
				s = x.ghosts[u].mesh[pos_x][t];
				if (d > s) { d = s; dir = "nord"; }
			}
			// EST
			t = pos_x + 1;
			if (t < x.xsize && x.cells[t + pos_y * x.xsize] != "WALL") {
				s = x.ghosts[u].mesh[t][pos_y];
				if (d > s) { d = s; dir = "est"; }
			}
			// OUEST
			t = pos_x - 1;
			if (t >= 0 && x.cells[t + pos_y * x.xsize] != "WALL") {
				s = x.ghosts[u].mesh[t][pos_y];
				if (d > s) { d = s; dir = "ouest"; }
			}

			if (dir == "sud") {
				x.ghosts[u].ghost_orientation = "bottom";
				x.ghosts[u].ghostCanMove = true;
			}
			else if (dir == "nord") {
				x.ghosts[u].ghost_orientation = "top";
				x.ghosts[u].ghostCanMove = true;
			}
			else if (dir == "est") {
				x.ghosts[u].ghost_orientation = "right";
				x.ghosts[u].ghostCanMove = true;
			}
			else if (dir == "ouest") {
				x.ghosts[u].ghost_orientation = "left";
				x.ghosts[u].ghostCanMove = true;
			}
			

			if (x.ghosts[u].ghost_orientation == "left") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_pos_y -= x.ghosts[u].ghost_pos_y % x.yl;
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
					x.ghosts[u].ghostCanMove = false;
				}
			} else if (x.ghosts[u].ghost_orientation == "right") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_pos_y -= x.ghosts[u].ghost_pos_y % x.yl;
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
					x.ghosts[u].ghostCanMove = false;
				}
			} else if (x.ghosts[u].ghost_orientation == "top") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_pos_x -= x.ghosts[u].ghost_pos_x % x.xl;
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
					x.ghosts[u].ghostCanMove = false;
				}
			} else if (x.ghosts[u].ghost_orientation == "bottom") {
				if (x.ghosts[u].ghost_old_orientation != x.ghosts[u].ghost_orientation) {
					x.ghosts[u].ghost_pos_x -= x.ghosts[u].ghost_pos_x % x.xl;
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
					x.ghosts[u].ghostCanMove = false;
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
	},
	"ghostMove" : function() {
		x.ghostTestMove();
		for(u = 0; u < x.ghosts.length; ++u) {
			if (x.ghosts[u].ghostCanMove) {
				if (x.ghosts[u].ghost_orientation == "left") {
					x.ghosts[u].ghost_pos_x -= x.ghosts[u].ghost_move;
				}
				else if (x.ghosts[u].ghost_orientation == "right") {
					x.ghosts[u].ghost_pos_x += x.ghosts[u].ghost_move;
				}
				else if (x.ghosts[u].ghost_orientation == "top") {
					x.ghosts[u].ghost_pos_y -= x.ghosts[u].ghost_move;
				}
				else if (x.ghosts[u].ghost_orientation == "bottom") {
					x.ghosts[u].ghost_pos_y += x.ghosts[u].ghost_move;
				}
				if (x.ghosts[u].ghost_eye)
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_1;
				else
					x.ghosts[u].ghostCurrentImage = x.ghosts[u].ghost_2;
			}
		}
	},
	"pacmanBlink" : function() {
		if (!x.blink) {
			ctx.clearRect(x.pacman_lastPos_x + x.xl / 8 - x.pacman_move, x.pacman_lastPos_y + x.yl / 8 - x.pacman_move, x.xl / 1.3 + x.pacman_move * 2, x.yl / 1.3 + x.pacman_move * 2);
			for(u = 0; u < x.ghosts.length; ++u) {
				ctx.drawImage(x.ghosts[u].ghostCurrentImage, x.ghosts[u].ghost_pos_x + x.xl / 8, x.ghosts[u].ghost_pos_y + x.yl / 8, x.xl / 1.3, x.yl / 1.3);
			}
		} else {
			for(u = 0; u < x.ghosts.length; ++u) {
				ctx.clearRect(x.ghosts[u].ghost_lastPos_x + x.xl / 8 - x.ghosts[u].ghost_move, x.ghosts[u].ghost_lastPos_y + x.yl / 8 - x.ghosts[u].ghost_move, x.xl / 1.3 + x.ghosts[u].ghost_move * 2, x.yl / 1.3 + x.ghosts[u].ghost_move * 2);
			}
			ctx.drawImage(x.pacmanCurrentImage, x.pacman_pos_x + x.xl / 8, x.pacman_pos_y + x.yl / 8, x.xl / 1.3, x.yl / 1.3);
		}
		x.blink = !x.blink;
		++x.blinkCount;
		if (x.blinkCount > 10) {
			clearInterval(x.blinkTimeout);
			x.pacmanReBirth();
		}
	},
	"pacmanReBirth" : function() {
		do {
			near_ghost = false;
			px = Math.floor(Math.random() * x.xsize);
			py = Math.floor(Math.random() * x.ysize);
			for(u = 0; u < x.ghosts.length; ++u) {
				ghost_x = (x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl) / x.xl;
				ghost_y = (x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl) / x.yl;
				if (Math.abs(ghost_x - px) <= 5 && Math.abs(ghost_y - py) <= 5) {
					near_ghost = true;
				}
			}
			is_wall = x.cells[px + py * x.xsize] == "WALL";
		} while(near_ghost || is_wall);
		ctx.clearRect(x.pacman_lastPos_x + x.xl / 8 - x.pacman_move, x.pacman_lastPos_y + x.yl / 8 - x.pacman_move, x.xl / 1.3 + x.pacman_move * 2, x.yl / 1.3 + x.pacman_move * 2);
		x.pacman_pos_x = px * x.xl;
		x.pacman_pos_y = py * x.yl;
		x.xcell = px;
		x.ycell = py;
		x.horizontal_scroll = x.pacman_pos_x - 2 * x.xl;
		x.vertical_scroll = x.pacman_pos_y - 2 * x.yl;
		window.scroll(x.horizontal_scroll, x.vertical_scroll);
		x.readyTimeout = setInterval(x.pacmanStart, 3000);
		x.initDrawTimeout = setInterval(x.pacmanSplash, 100);
	},
	"pacmanDraw" : function() {
		if (!x.pacman_lost) {
			ctx.clearRect(x.pacman_lastPos_x + x.xl / 8 - x.pacman_move, x.pacman_lastPos_y + x.yl / 8 - x.pacman_move, x.xl / 1.3 + x.pacman_move * 2, x.yl / 1.3 + x.pacman_move * 2);
			ctx.drawImage(x.pacmanCurrentImage, x.pacman_pos_x + x.xl / 8, x.pacman_pos_y + x.yl / 8, x.xl / 1.3, x.yl / 1.3);
			if (x.cells[x.xcell + x.ycell * x.xsize] == "CAKE") {
				playMusic();
				x.cells[x.xcell + x.ycell * x.xsize] = "EMPTY";
				drawGameplay(board, x.level);
				x = pacManGame;
				x.banner.childNodes[2].innerText = gameplay[pacManGame.level].cakeCounter;
				++x.score;
				numbers(x.score * 100);
				if (gameplay[x.level].cakeCounter == 0) {
					clearInterval(x.timeout);
					x.bravo.style.left = window.scrollX + "px";
					x.bravo.style.width = screen.availWidth + "px";
					x.bravo.style.height = screen.availHeight + "px";
					x.bravo.style.top = window.scrollY + "px";
					x.bravo.style.display = "inline";
				}
			}
			for(u = 0; u < x.ghosts.length; ++u) {
				pacman_x = (x.pacman_pos_x - x.pacman_pos_x % x.xl) / x.xl;
				pacman_y = (x.pacman_pos_y - x.pacman_pos_y % x.yl) / x.yl;
				ghost_x = (x.ghosts[u].ghost_pos_x - x.ghosts[u].ghost_pos_x % x.xl) / x.xl;
				ghost_y = (x.ghosts[u].ghost_pos_y - x.ghosts[u].ghost_pos_y % x.yl) / x.yl;
				if (pacman_x == ghost_x && pacman_y == ghost_y) {
					if (x.lives == 0)
						x.pacman_lost = true;
					else {
						clearInterval(x.timeout);
						x.blink = false;
						x.blinkCount = 0;
						x.blinkTimeout = setInterval(x.pacmanBlink, 200);
						break;
					}
				}
			}
		} else {
			x.explode.style.left = (x.pacman_pos_x - x.xl / 2) + "px";
			x.explode.style.width = (x.xl * 2) + "px";
			x.explode.style.height = (x.yl * 2) + "px";
			x.explode.style.top = (x.pacman_pos_y + 95 - x.yl / 2) + "px";
			x.explode.style.display = "inline";
			clearInterval(x.timeout);
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
	"initDraw" : function() {
		ctx = x.canvas.getContext("2d");
		ctx.clearRect(x.pacman_lastPos_x + x.xl / 8 - x.pacman_move, x.pacman_lastPos_y + x.yl / 8 - x.pacman_move, x.xl / 1.3 + x.pacman_move * 2, x.yl / 1.3 + x.pacman_move * 2);
		ctx.drawImage(x.pacmanCurrentImage, x.pacman_pos_x + x.xl / 8, x.pacman_pos_y + x.yl / 8, x.xl / 1.3, x.yl / 1.3);
		x.ghostDraw();
		drawGameplay(board, x.level);
		x = pacManGame;
		x.banner.childNodes[2].innerText = gameplay[pacManGame.level].cakeCounter;
		numbers(x.score * 100);
		--x.lives;
		x.banner.childNodes[1].removeChild(x.banner.childNodes[1].childNodes[x.lives]);
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
	gameplay[level].wall.src = "wall.png";
	gameplay[level].cake.src = "cake.png";
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