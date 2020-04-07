/* @copyright 2020 */

gameplay = [
	{
		"level" : 1,
		"board" : {
			"x_size" : 17,
			"y_size" : 27,
			"x_length" : (screen.width - 34) / 17,
			"y_length" : 100,
			"cells" : [
				"WALL", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "WALL",
				"CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE",
				"CAKE", "WALL", "WALL", "WALL", "CAKE", "WALL", "WALL", "CAKE", "CAKE", "CAKE", "WALL", "WALL", "CAKE", "WALL", "WALL", "WALL", "CAKE",
				"CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE",
				"CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE",
				"WALL", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "WALL", "WALL", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "WALL",
				"WALL", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "WALL", "WALL", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "WALL",
				"CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE",
				"CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE",
				"CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE",
				"CAKE", "CAKE", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "CAKE", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "CAKE", "CAKE",
				"CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE",
				"CAKE", "WALL", "WALL", "WALL", "CAKE", "WALL", "CAKE", "WALL", "WALL", "WALL", "CAKE", "WALL", "CAKE", "WALL", "WALL", "WALL", "CAKE",
				"CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "WALL", "WALL", "WALL", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE",
				"CAKE", "WALL", "WALL", "WALL", "CAKE", "CAKE", "CAKE", "WALL", "WALL", "WALL", "CAKE", "CAKE", "CAKE", "WALL", "WALL", "WALL", "CAKE",
				"CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE",
				"CAKE", "WALL", "WALL", "WALL", "CAKE", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "CAKE", "WALL", "WALL", "WALL", "CAKE",
				"CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE",
				"WALL", "CAKE", "WALL", "CAKE", "WALL", "WALL", "WALL", "WALL", "CAKE", "WALL", "WALL", "WALL", "WALL", "CAKE", "WALL", "CAKE", "WALL",
				"WALL", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "WALL",
				"CAKE", "CAKE", "CAKE", "CAKE", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "CAKE", "CAKE", "CAKE", "CAKE",
				"WALL", "CAKE", "WALL", "CAKE", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "CAKE", "WALL", "CAKE", "WALL",
				"CAKE", "CAKE", "CAKE", "CAKE", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "CAKE", "CAKE", "CAKE", "CAKE",
				"CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE",
				"CAKE", "WALL", "WALL", "CAKE", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "CAKE", "WALL", "WALL", "CAKE",
				"CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE",
				"CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE", "CAKE", "CAKE", "CAKE", "WALL", "CAKE", "CAKE",
			]
		}
	}
];

function drawGameplay(canvas, level) {

	xsize = gameplay[level].board.x_size;
	ysize = gameplay[level].board.y_size;
	xl = gameplay[level].board.x_length;
	yl = gameplay[level].board.y_length;

	canvas.width = xsize * xl;
	canvas.height = ysize * yl;

	ctx = canvas.getContext("2d");
	for(y = 0; y < ysize; ++y) {
		for(x = 0; x < xsize; ++x) {
			c = gameplay[level].board.cells[x+y*xsize];
			if (c == "WALL") {
				ctx.fillStyle = "#222222FF";
				ctx.fillRect(x*xl + 2, y*yl + 2, xl - 5, yl - 5);
			} else if (c == "CAKE") {
				ctx.beginPath();
				ctx.fillStyle = "#CCCCCCFF";
				ctx.fillRect(x*xl + 2, y*yl + 2, xl - 5, yl - 5);
				ctx.arc(x*xl + xl/2, y*yl + yl/2, xl/4, 0, Math.PI*2);
				ctx.fillStyle = "green";
				ctx.fill();
				ctx.closePath();
			} else if (c == "EMPTY") {
				ctx.beginPath();
				ctx.fillStyle = "#CCCCCCFF";
				ctx.fillRect(x*xl + 2, y*yl + 2, xl - 5, yl - 5);
				ctx.arc(x*xl + xl/2, y*yl + yl/2, xl/4, 0, Math.PI*2);
				ctx.fillStyle = "#CCCCCCFF";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
