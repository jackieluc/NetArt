var r;
var dt;
var index;
var coefficients = [
    [6, 14],
    [10, 17]
    
];

function setup() {
    createCanvas(800, 800);

    // Initialize all values
    index = 0;
    r = height / 4.5;
    dt = PI / 2880;
}
    
function draw() {
    plot_parametric(coefficients[index][0], coefficients[index][1]);
}

function plot_parametric(c1, c2) {
        // Translate the origin point to the center of the screen
    translate(width/2, height/2);
    var x0;
    var x1;
    var y0;
    var y1;
  
    background(255);
    stroke(0);
    strokeWeight(3);
    x0 = 0;
    y0 = 0;
    
    for(var t = dt; t < TWO_PI; t += dt) {
        x1 = cos(t) + cos(c1 * t) / 2 + sin(c2 * t)/3;
        y1 = sin(t) + sin(c1 * t) / 2 + cos(c2 * t)/3;
        if (t > dt)
            line(r * x0, -r * y0, r * x1, -r * y1);
        x0 = x1;
        y0 = y1;
    }
    
    fill(0);
}

function keyPressed() {
    if(++index == coefficients.length)
        index = 0;
}

function mousePressed() {
    if(++index == coefficients.length)
        index = 0;
}