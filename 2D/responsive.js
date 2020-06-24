/* @copyright 2020 */

function generateKeyDown(x,y) {
	if (pacManGame.timeout) {
		pacman_x = (pacManGame.pacman_pos_x - pacManGame.pacman_pos_x % pacManGame.xl) / pacManGame.xl;
		pacman_y = (pacManGame.pacman_pos_y - pacManGame.pacman_pos_y % pacManGame.yl) / pacManGame.yl;
		touch_x = (x - x % pacManGame.xl) / pacManGame.xl;
		y = y - (96 - window.scrollY);
		touch_y = ((y - y % pacManGame.yl) / pacManGame.yl);
		dx = touch_x - pacman_x;
		dy = touch_y - pacman_y;
		if (touch_y < 0 || touch_y >= pacManGame.ysize) {
			alert(y + ";" + window.scrollY + ";" + pacManGame.canvas.offsetTop);
		}
		direction = "none";
		if (dy == 0) {
			if (dx <= 0)
				direction = 'left';
			else
				direction = 'right';
		} else if (dx == 0) {
			if (dy <= 0)
				direction = 'top';
			else
				direction = 'bottom';
		} else if (dy == 1 || dy == -1) {
			if (dx <= 0)
				direction = 'left';
			else
				direction = 'right';
		} else if (dx == 1 || dx == -1) {
			if (dy <= 0)
				direction = 'top';
			else
				direction = 'bottom';
		}
		keyCode = 0;
		if (direction == 'left') keyCode = 37;
		else if (direction == 'right') keyCode = 39;
		else if (direction == 'top') keyCode = 38;
		else if (direction == 'bottom') keyCode = 40;
		if (keyCode > 0) {
			var event = new KeyboardEvent('keydown', {
				'keyCode' : keyCode
			});
			window.dispatchEvent(event);
		}
	}
}