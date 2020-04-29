/* @copyright 2020 */

function isMobile() {
	if (window.navigator.userAgent.indexOf("Mobile") != -1 || window.navigator.userAgent.indexOf("Android") != -1)
		return true;
	else
		return false;
}

function generateKeyDown(direction) {
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