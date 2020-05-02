let gameplay = [
	{
		"level" : 1,
		"cakeCounter" : 0,
		"wall" : new Image(),
		"cake" : new Image(),
		"board" : {
			"x_size" : 17,
			"y_size" : 27,
			"x_length" : 30,
			"y_length" : 30,
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

gameplay[0].wall.src = "wall.png";
gameplay[0].cake.src = "cake.png";

function drawGameplay(canvas, level, width, height) {

	var xsize = gameplay[level].board.x_size;
	var ysize = gameplay[level].board.y_size;
	var xl = width / xsize;
	var yl = height / ysize;

	canvas.width = xsize * xl;
	canvas.height = ysize * yl;

	gameplay[level].cakeCounter = 0;
	var ctx = canvas.getContext("2d");
	var savedImage = '';
	for(var y = 0; y < ysize; ++y) {
		for(var x = 0; x < xsize; ++x) {
			var c = gameplay[level].board.cells[x+y*xsize];
			if (c == "WALL") {
				ctx.drawImage(gameplay[level].wall, x*xl + 2, y*yl + 2, xl - 5, yl - 5);
			} else if (c == "CAKE") {
				++gameplay[level].cakeCounter;
				ctx.drawImage(gameplay[level].cake, x*xl + 2 + xl / (4*1.4), y*yl + 2 + yl / (4*1.4), xl / 1.4 - 5, yl / 1.4 - 5);
			} else if (c == "EMPTY") {
				ctx.beginPath();
				ctx.fillStyle = "#F1F1F1FF";
				ctx.fillRect(x*xl + 2, y*yl + 2, xl - 5, yl - 5);
				ctx.arc(x*xl + xl/2, y*yl + yl/2, xl/4, 0, Math.PI*2);
				ctx.fillStyle = "#F1F1F1FF";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
	savedImage = ctx.getImageData(0, 0, width, height);
	return savedImage;
};

export const GamePlay = gameplay;
export function DrawGamePlay(canvas, level, width, height) { return drawGameplay(canvas, level, width, height); };
