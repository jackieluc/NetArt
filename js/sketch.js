p5.disableFriendlyErrors = true;

var images = [];
var imageIndex;
var canvas;
var r;
var dt;
var index;
var sandboxEnabled;
var instructions;

var coefficients = [
    [6, 14],
    [10, 17],
    [105, 100],
    [7, 11],
    [5, 15],
    [5, 11],
    [29, 59],
    [29, 61],
    [21, 34],
    [103, 50],
    [91, 93],
    [7, 343],
    [9, 7]
];

function setup() {
    sandboxEnabled = false;
    disableInstructions = false;
    
    // setup all the images
    for (var i = 1; i < 4; i++) {
        images[i] = createImg("images/image" + i + ".png");
        images[i].size(1100, 1100);
        images[i].hide();
    }
    
    // setup the canvas
    canvas = createCanvas(1100, 1100);

    // initialize all values
    index = 0;
    imageIndex = 1;
    r = height / 5;
    
    // 3000 is some arbritrary high number that smooths out the lines
    // more lines there are the more smooth it looks
    dt = PI / 3000;
}
    
function draw() {
    // if sandbox is disabled, draw default images instead
    if (!sandboxEnabled) 
        setDefaultImages();
    
    plot_parametric(coefficients[index][0], coefficients[index][1]);
}

// main function that plots the parametric equation with two coefficients as parameters
function plot_parametric(c1, c2) {
    clear();
    var x0;
    var x1;
    var y0;
    var y1;  
    
    // update parametric equation display
    updateEquationDisplay(c1, c2);
    
    // display the image at a specified location
    image(images[imageIndex], width / 30, height / 100);
    
    // if sandbox is enabled, user can adjust the drawing size
    if (sandboxEnabled)
        adjustDrawingSize();
    
    // translate the origin point to the center of the screen
    translate(width / 2, height / 2);
  
    // white stroke lines and a thin stroke weight
    stroke(255);
    strokeWeight(2);
    x0 = 0;
    y0 = 0;

    // loop that plots the parametric function, which always looks symmetric
    for(var t = dt; t < TWO_PI; t += dt) {
        x1 = cos(t) + cos(c1 * t) / 2 + sin(c2 * t) / 3;
        y1 = sin(t) + sin(c1 * t) / 2 + cos(c2 * t) / 3;
        
        // when t = dt, draws an extra undesirable line from centre of canvas to the next (x1, y1)
        if (t > dt)
            line(r * x0, -r * y0, r * x1, -r * y1);
        
        x0 = x1;
        y0 = y1;
    }
    
    fill(0);
}

// update the equation display for the user
function updateEquationDisplay(c1, c2) {
    $("#x-component").text("x(t) = cos(t) + cos(" + c1 + " * t) / 2 + sin(" + c2 + " * t) / 3");
    $("#y-component").text("y(t) = sin(t) + sin(" + c1 + " * t) / 2 + cos(" + c2 + " * t) / 3");
}

// set default images that look visually appealing
function setDefaultImages() {
    if (imageIndex == 1) {
        index = 8;
        r = 260;
    }
    else if (imageIndex == 2) {
        index = 2;
        r = 429;
    }
    else if (imageIndex == 3) {
        index = 9; 
        r = 2384;
    }
}

// adjust canvas size of drawings when the up or down arrow is pressed
function adjustDrawingSize() {
    if (keyIsDown(UP_ARROW)) {
        r *= 1.3;
    }
    else if (keyIsDown(DOWN_ARROW)) {
        r /= 1.3;
    }
}

// listen to keyboard events
function keyPressed() {
    // toggle sandbox mode
    if (keyCode == CONTROL) {
        sandboxEnabled = !sandboxEnabled;
        instructions = !instructions;
        
        if (instructions) {
            $("#controls").append("<p class=\"sandbox-mode\">Press <b>Up Arrow</b> to increase the drawing\'s size</p> <p class=\"sandbox-mode\">Press <b>Down Arrow</b> to decrease the drawing's size</p> <p class=\"sandbox-mode\">Press <b>Right Arrow</b> to go to the next drawing</p> <p class=\"sandbox-mode\">Press <b>Left Arrow</b> to go to the previous drawing</p>")
            $(".sandbox-mode").css("visibility", "visible");
            
        }
        else {
            $(".sandbox-mode").css("visibility", "hidden");
            $(".sandbox-mode").remove();
        }
            
    }
    
    // sandbox mode, user is able to go through the different results
    if (sandboxEnabled) {
        if (keyCode == RIGHT_ARROW) {
            if(++index == coefficients.length)
                index = 0;
        }
        else if (keyCode == LEFT_ARROW) {
            if (--index == -1)
                index = coefficients.length - 1;
        }
    }
    
    // move to the next image (loops around to the beginning if exceeds length of array)
    if (key == 2) {
        if (++imageIndex == images.length)
            imageIndex = 1;
    }
    
    // move to the previous image (loops around to the end if exceeds beginning index)
    else if (key == 1) {
        if (--imageIndex == 0)
            imageIndex = images.length - 1;
    }
}