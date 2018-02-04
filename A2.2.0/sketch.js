

function setup() {

  createCanvas(640, 360);
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

 background(224, 224, 224);

 ellipseMode(CENTER);
 stroke(27, 117, 188);
 strokeWeight(10);
 fill(255, 255, 255);
 ellipse(cx, cy, 270, 270);

 //hours tick
 ellipseMode(CENTER);
 stroke(ch);
 strokeWeight(5);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
 ellipse(cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius, h1, h1);

//minutes tick
 ellipseMode(CENTER);
 stroke(cm);
 strokeWeight(3);
 line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
 ellipse(cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius, m1, m1);

//seconds tick
 ellipseMode(CENTER);
 stroke(cs);
 strokeWeight(1);
 line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
 ellipse(cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius, s1, s1);

 ellipseMode(CENTER);
 fill(cs);
 stroke(cs);
 ellipse(cx, cy, 10, 10);

}
