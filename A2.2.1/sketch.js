

function setup() {

  createCanvas(640, 360);
}

function draw(){
    // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top


  var radius = height / 2; // this is the maximum possible radius
  secondsRadius = radius * 0.2;
  minutesRadius = radius * 0.375;
  hoursRadius = radius * 0.75;
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

 background(224, 224, 224);

translate(cx, cy);

 rectMode(CENTER);
 stroke(27, 117, 188);
 strokeWeight(10);
 fill(255, 255, 255);
 rect(0, 0, 270, 270);

 //hours tick
 stroke(ch);
 strokeWeight(6);
 line(- cos(h) * hoursRadius, - sin(h) * hoursRadius, cos(h) * hoursRadius, sin(h) * hoursRadius);


//minutes tick
push();
translate(cos(h) * hoursRadius / 2, sin(h) * hoursRadius / 2);
 ellipseMode(CENTER);
 stroke(cm);
 strokeWeight(4);
 line(- cos(m) * minutesRadius, - sin(m) * minutesRadius, cos(m) * minutesRadius, sin(m) * minutesRadius);
 pop();

 
//seconds tick
push();
translate(cos(h) * hoursRadius / 2, sin(h) * hoursRadius / 2);
 translate(cos(m) * minutesRadius / 2, sin(m) * minutesRadius / 2);
 ellipseMode(CENTER);
 stroke(cs);
 strokeWeight(2);
 line(- cos(s) * secondsRadius, - sin(s) * secondsRadius, cos(s) * secondsRadius, sin(s) * secondsRadius);
pop();


}


