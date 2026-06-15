/*** OTHER DOM EVENTS ***/

/** CONSTANTS FOR REUSE **/

const BASE_COLOR = 'rgb(34, 34, 34)';
const ALT_COLOR = 'rgb(156, 10, 63)';

/** OBJECTS **/

const clickButton = document.getElementById('click');
const doubleClickButton = document.getElementById('double-click');
const passOverButton = document.getElementById('over-and-out');
const andMeButton = document.getElementById('and-me');
const pressDownButton = document.getElementById('down-and-up');

/** PRE-SET STYLES **/

/* 
    The DOM can't read your style sheet, so IF your handlers depend on 
    reading the current color of an element from the page, you have to 
    set it here first. If your handler needs only to change the color, 
    but not read it, this is not necessary. For the click and double-click 
    handlers, we need it to be able to tell what color it is in order to 
    evaluate the conditionals and toggle between one color and another. 
*/

clickButton.style.backgroundColor = BASE_COLOR;
doubleClickButton.style.backgroundColor = BASE_COLOR;

function toggleColor(element) {
	let currentColor = element.style.backgroundColor; // read from inline styling
	return currentColor === BASE_COLOR ? ALT_COLOR : BASE_COLOR;
}

/** EVENT HANDLERS **/

// When the "click me" button is clicked
clickButton.addEventListener('click', () => {
	clickButton.style.backgroundColor = toggleColor(clickButton);
});

// When the "double-click me" button is double-clicked
doubleClickButton.addEventListener('dblclick', () => {
	doubleClickButton.style.backgroundColor = toggleColor(doubleClickButton);
});

// When the mouse first passes *onto* the "pass over me" button
passOverButton.addEventListener('mouseover', () => {
	passOverButton.style.backgroundColor = ALT_COLOR;
});

// When the mouse passes *off of* the "pass over me" button
passOverButton.addEventListener('mouseout', () => {
	passOverButton.style.backgroundColor = BASE_COLOR;
});

// When the mouse first passes *onto* the "and me" button
andMeButton.addEventListener('mouseover', () => {
	passOverButton.style.backgroundColor = ALT_COLOR;
	andMeButton.style.backgroundColor = ALT_COLOR;
});

// When the mouse passes *off of* the "and me" button
andMeButton.addEventListener('mouseout', () => {
	andMeButton.style.backgroundColor = BASE_COLOR;
	passOverButton.style.backgroundColor = BASE_COLOR;
});

// When the mouse presses down on the "hold me down" button
pressDownButton.addEventListener('mousedown', () => {
	pressDownButton.style.backgroundColor = ALT_COLOR;
});

// When the mouse presses down on the "hold me down" button
pressDownButton.addEventListener('mouseup', () => {
	pressDownButton.style.backgroundColor = BASE_COLOR;
});

/** BONUS: MOUSEMOVE WITH A CANVAS ELEMENT **/

let isDrawing = false;
let x = 0;
let y = 0;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clear');

// Needed for mousemove and mouseup handlers
function drawLine(context, x1, y1, x2, y2) {
	context.beginPath();
	context.strokeStyle = 'black';
	context.lineWidth = 2;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();
}

// When the user presses down with the mouse
canvas.addEventListener('mousedown', event => {
	x = event.offsetX;
	y = event.offsetY;
	isDrawing = true;
});

// When the user moves the mouse after pressing down
canvas.addEventListener('mousemove', event => {
	if (isDrawing === true) {
		drawLine(context, x, y, event.offsetX, event.offsetY);
		x = event.offsetX;
		y = event.offsetY;
	}
});

// When the user releases the mouse
window.addEventListener('mouseup', event => {
	if (isDrawing === true) {
		drawLine(context, x, y, event.offsetX, event.offsetY);
		x = 0;
		y = 0;
		isDrawing = false;
	}
});

// When the user presses the "clear canvas" button
clearButton.addEventListener('click', () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
});
