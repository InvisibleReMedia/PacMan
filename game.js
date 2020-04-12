/* @copyright 2020 */

pacManGame = {
	"state" : 0,
	"interval" : 0.000001,
	"timer" : 100,
	"pacman_pos_x" : 0,
	"pacman_pos_y" : 0,
	"pacman_lastPos_x" : 0,
	"pacman_lastPos_y" : 0,
	"pacman_move" : 13,
	"pacman_eating" : false,
	"pacman1_left" : new Image(),
	"pacman1_right" : new Image(),
	"pacman1_top" : new Image(),
	"pacman1_bottom" : new Image(),
	"pacman2_left" : new Image(),
	"pacman2_right" : new Image(),
	"pacman2_top" : new Image(),
	"pacman2_bottom" : new Image(),
	"horizontal_scroll" : 0,
	"vertical_scroll" : 0,
	"pacman_orientation" : "right",
	"pacman_rotate" : 0,
	"firstPass" : function(canvas, level) {
		canvas.width = this.xsize * this.xl;
		canvas.height = this.ysize * this.yl;
		this.canvas = canvas;
		this.level = level;
		this.pacmanCurrentImage = this.pacman1_right;
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
	},
	"pacmanMove" : function() {
		x = pacManGame;
		if (x.pacman_orientation == "left") {
			x.pacman_lastPos_x = x.pacman_pos_x;
			x.pacman_lastPos_y = x.pacman_pos_y;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_y % x.yl < x.yl / 2) {
					x.pacman_pos_y -= x.pacman_pos_y % x.yl;
				} else {
					x.pacman_pos_y += x.yl - x.pacman_pos_y % x.yl;
				}
				x.pacman_old_orientation = x.pacman_orientation;
			}
			pacman_center_x = x.pacman_pos_x + x.xl / 8 + x.xl / 1.3 / 2;
			if (pacman_center_x <= 0) {
				x.pacman_pos_x = x.canvas.width;
				x.horizontal_scroll = x.pacman_pos_x - screen.availWidth + 2 * x.xl;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			} else {
				x.pacman_pos_x -= x.pacman_move;
			}
			viewport_x_left = x.horizontal_scroll + screen.availWidth / 3;
			viewport_x_right = (x.horizontal_scroll + screen.availWidth) * 3/4;
			if (viewport_x_left > x.pacman_pos_x || viewport_x_right <= x.pacman_pos_x) {
				x.horizontal_scroll -= x.pacman_move;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			}
			if (x.pacman_eating)
				x.pacmanCurrentImage = x.pacman2_left;
			else
				x.pacmanCurrentImage = x.pacman1_left;
		}
		else if (x.pacman_orientation == "right") {
			x.pacman_lastPos_x = x.pacman_pos_x;
			x.pacman_lastPos_y = x.pacman_pos_y;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_y % x.yl < x.yl / 2) {
					x.pacman_pos_y -= x.pacman_pos_y % x.yl;
				} else {
					x.pacman_pos_y += x.yl - x.pacman_pos_y % x.yl;
				}
				x.pacman_old_orientation = x.pacman_orientation;
			}
			pacman_center_x = x.pacman_pos_x + x.xl / 8 + x.xl / 1.3 / 2;
			if (pacman_center_x >= x.canvas.width) {
				x.pacman_pos_x = 0;
				x.horizontal_scroll = -34;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			} else {
				x.pacman_pos_x += x.pacman_move;
			}
			viewport_x_left = x.horizontal_scroll + screen.availWidth / 3;
			viewport_x_right = (x.horizontal_scroll + screen.availWidth) * 3/4;
			if (viewport_x_left > x.pacman_pos_x || viewport_x_right <= x.pacman_pos_x) {
				x.horizontal_scroll += x.pacman_move;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			}
			if (x.pacman_eating)
				x.pacmanCurrentImage = x.pacman2_right;
			else
				x.pacmanCurrentImage = x.pacman1_right;
		}
		else if (x.pacman_orientation == "top") {
			x.pacman_lastPos_y = x.pacman_pos_y;
			x.pacman_lastPos_x = x.pacman_pos_x;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_x % x.xl < x.xl / 2) {
					x.pacman_pos_x -= x.pacman_pos_x % x.xl;
				} else {
					x.pacman_pos_x += x.xl - x.pacman_pos_x % x.xl;
				}
				x.pacman_old_orientation = x.pacman_orientation;
			}
			pacman_center_y = x.pacman_pos_y + x.yl / 8 + x.yl / 1.4 / 2;
			if (pacman_center_y <= 0) {
				x.pacman_pos_y = x.canvas.height;
				x.vertical_scroll = x.pacman_pos_y;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			} else {
				x.pacman_pos_y -= x.pacman_move;
			}
			viewport_y_top = x.vertical_scroll + screen.availHeight / 3;
			viewport_y_bottom = (x.vertical_scroll + screen.availHeight) * 3/4;
			if (viewport_y_top > x.pacman_pos_y || viewport_y_bottom <= x.pacman_pos_y) {
				x.vertical_scroll -= x.pacman_move;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			}
			if (x.pacman_eating)
				x.pacmanCurrentImage = x.pacman2_top;
			else
				x.pacmanCurrentImage = x.pacman1_top;
		}
		else if (x.pacman_orientation == "bottom") {
			x.pacman_lastPos_y = x.pacman_pos_y;
			x.pacman_lastPos_x = x.pacman_pos_x;
			if (x.pacman_old_orientation != x.pacman_orientation) {
				if (x.pacman_pos_x % x.xl < x.xl / 2) {
					x.pacman_pos_x -= x.pacman_pos_x % x.xl;
				} else {
					x.pacman_pos_x += x.xl - x.pacman_pos_x % x.xl;
				}
				x.pacman_old_orientation = x.pacman_orientation;
			}
			pacman_center_y = x.pacman_pos_y + x.yl / 8 + x.yl / 1.4 / 2;
			if (pacman_center_y >= x.canvas.height) {
				x.pacman_pos_y = 0;
				x.vertical_scroll = 0;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			} else {
				x.pacman_pos_y += x.pacman_move;
			}
			viewport_y_top = x.vertical_scroll + screen.availHeight / 3;
			viewport_y_bottom = (x.vertical_scroll + screen.availHeight) * 3/4;
			if (viewport_y_top > x.pacman_pos_y || viewport_y_bottom <= x.pacman_pos_y) {
				x.vertical_scroll += x.pacman_move;
				window.scroll(x.horizontal_scroll, x.vertical_scroll);
			}
			if (x.pacman_eating)
				x.pacmanCurrentImage = x.pacman2_bottom;
			else
				x.pacmanCurrentImage = x.pacman1_bottom;
		}
	},
	"pacmanDraw" : function() {
		x = pacManGame;
		ctx.clearRect(x.pacman_lastPos_x + x.xl / 8 - x.pacman_move, x.pacman_lastPos_y + x.yl / 8 - x.pacman_move, x.xl / 1.3 + x.pacman_move * 2, x.yl / 1.3 + x.pacman_move * 2);
		ctx.drawImage(x.pacmanCurrentImage, x.pacman_pos_x + x.xl / 8, x.pacman_pos_y + x.yl / 8, x.xl / 1.3, x.yl / 1.3);
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
			case 10:
				x.pacmanDraw();
				break;
			case 11:
				x.pacmanMove();
				break;
			case 20:
				x.pacmanDraw();
				break;
			case 21:
				x.pacmanMove();
				break;
			case 30:
				x.pacmanDraw();
				break;
			case 31:
				x.pacmanMove();
				break;
			case 40:
				x.pacman_eating = true;
				break;
			case 41:
				x.pacmanDraw();
				break;
			case 42:
				x.pacmanMove();
				break;
			case 41:
				x.pacmanDraw();
				break;
			case 42:
				x.pacmanMove();
				break;
			case 51:
				x.pacmanDraw();
				break;
			case 52:
				x.pacmanMove();
				break;
			case 61:
				x.pacmanDraw();
				break;
			case 62:
				x.pacmanMove();
				break;
			case 71:
				x.pacmanDraw();
				break;
			case 72:
				x.pacmanMove();
				break;
			case 90:
				x.pacman_eating = false;
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
	pacManGame.pacman_pos_x = 3 * pacManGame.xl;
	pacManGame.pacman_pos_y = 0;
}

