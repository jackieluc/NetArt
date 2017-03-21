var r;
var dt;
var index;
var params = [
    [1, 2, 1, 2],
    
];

function setup() {
    createCanvas(800, 800);

    // Initialize all values
    index = 0;
    r = height/4.5;
    dt = PI / 2880;
}
    
function draw() {
    plot_parametric();
}

function plot_parametric() {
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
//        x1 = cos(1*t)-pow(cos(2*t), 3);
//        y1 = sin(1*t)-pow(sin(2*t), 3);
        x1 = cos(t)+cos(6*t) / 2+sin(14*t)/3;
        y1 = sin(t)+sin(6*t) / 2+cos(14*t)/3;
        if (t > dt)
            line(r*x0, -r*y0, r*x1, -r*y1);
        x0 = x1;
        y0 = y1;
    }
    fill(0);
}