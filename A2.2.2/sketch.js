function setup() {

  createCanvas(640, 360);
  rectMode(CENTER);
}

function draw(){
    // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top


  var radius = height / 2; // this is the maximum possible radius
  secondsRadius = radius * 0.2;
  minutesRadius = radius * 0.48;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.8;

  cx = width / 2;
  cy = height / 2;


  var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

 var s1 = map(second(), 0, 60, 0, 60);
 var m1 = map(minute() + norm(second(), 0, 60), 0, 60, 20, 50);
 var h1 = map(hour() + norm(minute(), 0, 60), 0, 24, 0, 50);

var cs = color(39, 170, 225);
var cm = color(27, 117, 188);
var ch = color(43, 57, 144);

 background(43, 57, 144);


translate(cx, cy);
noStroke();
fill(39, 170, 225, 60);
scale(1.5);

push();
rotate(h);
rect(0, 0, 150, 150);
pop();

push();
rotate(m);
rect(0, 0, 110, 110);
pop();

push();
rotate(s);
rect(0, 0, 70, 70);
pop();


}