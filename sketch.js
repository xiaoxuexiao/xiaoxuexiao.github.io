



function setup() {
  createCanvas(800, 400);
}

function draw() {
  background('pink');

  var h = hour();
  var m = minute();
  var s = second();

  	var x2 = map(m, 0, 60, 0, 800);

 fill(131, 197, 234);
  rect(x2, 140, 100, 100);

  textSize(20);
  fill(131, 197, 234);
  text('Current hour:\n' + h+' : ' + m+' : ' + s, 400, 50);
  

  	var x1 = map(s, 0, 60, 0, 400);
  	  fill(234, 172, 131);
  ellipse(200, x1, 30, 30);


  scale(2);
  ellipse(110, 50, h, 20);
 
  textSize(50);
  fill(150, 150, 150);
  text('Hello, Jiawen', 400, 200);
}




