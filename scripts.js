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

// DEMO: Set the background-color property of the click and doubleclick buttons
// so that they will exist inline on the elements and can be read from the HTML file

// DEMO: Write a function that accepts an element, reads its background color,
// and toggles between the base color and alternate color.

/** EVENT HANDLERS **/

// DEMO: Create an event listener that toggles the background-color property
// when the "click me" button is clicked

// DEMO: Create an event listener that toggles the background-color property
// when the "double-click me" button is double-clicked

// DEMO: Create a set of event listeners that change the background-color property
// when the mouse passes *onto* and then *off of* the "pass over me" button

// DEMO: Create a set of event listeners that change the background-color property
// of both the "pass over me" and the "and me" buttons when the mouse
// passes *onto* and then *off of* the "and me" button

// DEMO: Create a set of event listeners that change the background-color property
// when the mouse presses down on the "hold me down" button and then releases

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
