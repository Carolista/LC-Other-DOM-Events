/*** Other DOM Events ***/

/*
    dblclick, mouseover, mouseout
*/

// Event listener for page load
window.addEventListener("load", function() {
    console.log('Page loaded.');
    init();
});

// DOM code for page elements
function init() {

    /** NON-OBJECT VARIABLES **/

    let baseColor = "rgb(34, 34, 34)";
    let altColor = "rgb(156, 10, 63)";


    /** OBJECTS **/

    const clickButton = document.getElementById("click");
    const doubleClickButton = document.getElementById("double-click");
    const passOverButton = document.getElementById("over-and-out");
    const andMeButton = document.getElementById("and-me");
    const pressDownButton = document.getElementById("down-and-up");

    /** PRE-SET STYLES **/
    /* The DOM can't read your style sheet, so IF your handlers depend on reading the current color of an element from the page, you have to set it here first. If your handler needs only to change the color, but not read it, this is not necessary. For the click and double-click handlers, we need it to be able to tell what color it is in order to evaluate the conditionals and toggle between one color and another. */
    clickButton.style.backgroundColor = baseColor;
    doubleClickButton.style.backgroundColor = baseColor;

    /** EVENT HANDLERS **/

    // When the "click me" button is clicked
    clickButton.addEventListener("click", function() {
        let currentColor = clickButton.style.backgroundColor;
        if (currentColor === baseColor) {
            clickButton.style.backgroundColor = altColor;
        } else {
            clickButton.style.backgroundColor = baseColor;
        }
    });

    // When the "double-click me" button is double-clicked
    doubleClickButton.addEventListener("dblclick", function() {
        let currentColor = doubleClickButton.style.backgroundColor;
        if (currentColor === baseColor) {
            doubleClickButton.style.backgroundColor = altColor;
        } else {
            doubleClickButton.style.backgroundColor = baseColor;
        }
    });

    // When the mouse first passes *onto* the "pass over me" button
    passOverButton.addEventListener("mouseover", function() {
        passOverButton.style.backgroundColor = altColor;
    });

    // When the mouse passes *off of* the "pass over me" button
    passOverButton.addEventListener("mouseout", function() {
        passOverButton.style.backgroundColor = baseColor;
    });

    // When the mouse first passes *onto* the "and me" button
    andMeButton.addEventListener("mouseover", function() {
        passOverButton.style.backgroundColor = altColor;
        andMeButton.style.backgroundColor = altColor;
    });

    // When the mouse passes *off of* the "and me" button
    andMeButton.addEventListener("mouseout", function() {
        andMeButton.style.backgroundColor = baseColor;
        passOverButton.style.backgroundColor = baseColor;
    });

    // When the mouse presses down on the "hold me down" button
     pressDownButton.addEventListener("mousedown", function() {
        pressDownButton.style.backgroundColor = altColor;
    });

    // When the mouse presses down on the "hold me down" button
    pressDownButton.addEventListener("mouseup", function() {
        pressDownButton.style.backgroundColor = baseColor;
    });


    /** BONUS: MOUSEMOVE WITH A CANVAS ELEMENT **/

    let isDrawing = false;
    let x = 0;
    let y = 0;

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const clearCanvas = document.getElementById('clear');

    // When the user presses down with the mouse
    canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
    });

    // When the user moves the mouse after pressing down
    canvas.addEventListener('mousemove', e => {
    if (isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
    });

    // When the user releases the mouse
    window.addEventListener('mouseup', e => {
    if (isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
    });

    // When the user presses the "clear canvas" button
    clearCanvas.addEventListener('click', e => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Needed for mousemove handler above
    function drawLine(context, x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

}