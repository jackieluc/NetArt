var images = [];
var imageIndex;
var canvas;
var r;
var dt;
var index;
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
    for (var i = 1; i < 3; i++) {
        images[i] = createImg("../images/image" + i + ".jpg");
//        images[i].position(width, height / 4);
        images[i].size(1100, 1100);
        images[i].hide();
    }
    
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
    plot_parametric(coefficients[index][0], coefficients[index][1]);
}

function plot_parametric(c1, c2) {
    clear();
    var x0;
    var x1;
    var y0;
    var y1;  
    
    image(images[imageIndex], innerWidth / 100 + 17, height / 99);
    
    adjustCanvasSize();
    
    // translate the origin point to the center of the screen
    translate(width / 2, height / 2);
  
//    background(255);
    stroke(255);
    strokeWeight(2);
    x0 = 0;
    y0 = 0;
    
    for(var t = dt; t < TWO_PI; t += dt) {
        x1 = cos(t) + cos(c1 * t) / 2 + sin(c2 * t) / 3;
        y1 = sin(t) + sin(c1 * t) / 2 + cos(c2 * t) / 3;
        
        if (t > dt)
            line(r * x0, -r * y0, r * x1, -r * y1);
        
        x0 = x1;
        y0 = y1;
    }
    
    fill(0);
}

// adjust canvas size if the up or down arrow is pressed
function adjustCanvasSize() {
    if (keyIsDown(UP_ARROW)) {
        r *= 1.1;
    }
    else if (keyIsDown(DOWN_ARROW)) {
        r /= 1.1;
    }
}

// move onto the next image when a key has been pressed
function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        if(++index == coefficients.length)
            index = 0;
    }
    else if (keyCode == LEFT_ARROW) {
        if (--index == -1)
            index = coefficients.length - 1;
    }
    else if (key == "e") {
        textSize(32);
        text("x = cos(t) + cos(" + coefficients[index][0] + " * t) / 2 + sin(" + coefficients[index][1] + " * t) / 3", 100, 100, 100, 100);
    }
    else if (key == 1) {
        if (++imageIndex == images.length)
            imageIndex = 1;
    }
    else if (key == 2) {
        if (--imageIndex == 0)
            imageIndex = images.length - 1;
    }
}