// This example uses NYT's Top Stories API and visualizes the relative
// length of story headlines.
// ---


var Yellowcab;
var pickup = [];
var tippercent = [];
var time = [];
var timesplit = [];
var passenger = [];
var la = [];
var long = [];
var state = 0;

// state variables



function preload() {


  // Assemble url for API call
  var url = "https://data.cityofnewyork.us/resource/2yzn-sicd.json";

  Yellowcab = loadJSON(url);

}

function setup() {

 var button = createButton("Click");
  button.mousePressed(Click);

  width = 1000;
  length = 1000;
  createCanvas(width, length);
  background(0);

  extractData();
  ra = 6;
  angleMode(DEGREES);

//console.log(Yellowcab[0].tip_amount);
//misinterpretation:

  }


function draw() {


if(state == 0) {

var lafirst = max(la);
  var lasecond = max(la);

 for (var i = 0; i < 1000; i++) {
  var h = la[i];
  if ( h < lafirst )
  { lasecond = lafirst;
    lafirst = h;

 }

}
 
 var longfirst = min(long);
  var longsecond = min(long);

 for (var i = 0; i < 1000; i++) {
  var h = long[i];
  if ( h > longfirst )
  { longsecond = longfirst;
    longfirst = h;

 }
}
 

//console.log(longfirst);
//draw circle with color

for (var i = 0; i < 1000; i++) {
  var h = map(la[i], lasecond, max(la), 0, length);
  var k = map(long[i], min(long), longsecond, 0, width);

//console.log(k);
  noStroke();
  var x = timesplit[i];
  fill(255-x, 228-(x*220/255), 164*x/255);

//  ellipse(k, h, tippercent[i]/2, tippercent[i]/2);
  ellipse(k, length-h, ra, ra);

//interaction

//if (mouseX > k-ra && mouseX < k+ra && mouseY > h-ra && mouseY < h+ra){
      //fill('grey');
      //rect(mouseX, mouseY, 130, 20);
      //textSize(10);
      //fill(255);
      //text(pickup[i], mouseX+5, mouseY+5, 130-5, 20-5);
  
   // }

 }

push();
 translate(800, 800);
//draw clock 
for (var i = 0; i<256; i++) {

rotate(360/255);
strokeWeight(1);
stroke(255-i, 228-(i*220/255), 164*i/255);
line(0, 0, 0, -50);


}
pop();

}

if (state == 1) { width = 1000;
  length = 1000;
  createCanvas(width, length);
  background(0);

//console.log(Yellowcab[0].tip_amount);
  var lafirst = max(la);
  var lasecond = max(la);

 for (var i = 0; i < 1000; i++) {
  var h = la[i];
  if ( h < lafirst )
  { lasecond = lafirst;
    lafirst = h;

 }

}
 
 var longfirst = min(long);
  var longsecond = min(long);

 for (var i = 0; i < 1000; i++) {
  var h = long[i];
  if ( h > longfirst )
  { longsecond = longfirst;
    longfirst = h;

 }
}
 

//console.log(longfirst);
//draw circle with color

for (var i = 0; i < 1000; i++) {
  var h = map(la[i], lasecond, max(la), 0, length);
  var k = map(long[i], min(long), longsecond, 0, width);

//console.log(k);
  var x = timesplit[i];

  if ( x >= 0 && x < 255/2 ) {

  fill(2*x, 8+(440/255)*x, 164-(328/255)*x);

//  ellipse(k, h, tippercent[i]/2, tippercent[i]/2);
  ellipse(k, length-h, ra, ra);

}

else{
  fill(255*2-2*x, 448-(440/255)*x, 164-328+(328/255)*x);

//  ellipse(k, h, tippercent[i]/2, tippercent[i]/2);
  ellipse(k, length-h, ra, ra);

} 

}


push();
 translate(800, 800);
//draw clock 
for (var x = 0; x<256; x++) {

rotate(360/255);
strokeWeight(1);


if ( x >= 0 && x < 255/2 ) {

  stroke(2*x, 8+(440/255)*x, 164-(328/255)*x);

}

else{
  stroke(255*2-2*x, 448-(440/255)*x, 164-328+(328/255)*x);


} 

//stroke(255-i, 228-(i*220/255), 164*i/255);

line(0, 0, 0, -50);


}
pop();


}





noStroke();
fill(255);
textSize(15);
var s = 720;
var s1 = 360;
text('NYC 2015/08 Yellow Cab Pick-up Time', s, s1);
var t = 'How color code can lead to a different impression of the same info: The first pick of color code for the time is misleading for the jump from blue to yellow at the midnight point. As people use to perceive day time as light and night time as dark, it is confusing when the actual operation is reversed. The second pick fixes this problem by following our intuition of perceiving color, where the transition from blue at midnight to yellow at noon is natural and gradual.';
text(t, s, (s1)+20, 200, 400);


//draw text
push();
translate(800, 800);
for (var i = 0; i<24; i++) {
rotate(360/24);
fill('white');
textSize(8);
text(i+1, 0, -60);
}
pop();


}

  // console.log(first);
  //console.log(la);
  //console.log(max(la));
  //console.log(min(la));

function Click() {
  state = (state == 0) ? 1 : 0; // shorthand if-statement, aka "inline if"

}



function extractData() {

  
  for (var i = 0; i < 1000; i++) {
    var h = Yellowcab[i].pickup_datetime;
    var j = 100*Number(Yellowcab[i].tip_amount)/Number(Yellowcab[i].total_amount);
    var k = Number(Yellowcab[i].passenger_count);
    var l = Number(Yellowcab[i].pickup_latitude);
    var m = Number(Yellowcab[i].pickup_longitude);

    



  append(pickup, h);  
  append(tippercent, j);
  append(passenger, k);
  append(la, l);
  append(long, m);

console.log(tippercent);

//console.log(pickup[0].length);

    //for (var j = 0; j<2; j++) {
      //split(pickup[j], "T");

// console.log(split(pickup[0], "T"));

  }

  //console.log(passenger);

for (var i = 0; i < 1000; i++) {
  var h = split((pickup[i].substring(11, (pickup[i].length)-4)), ":"); 

  append(time, h);
  
}

//console.log(time[0][2] + time[0][1] + time[0][0]);
//console.log(Number(time[0][1])+1);


for (var i = 0; i < 1000; i++) {
  var h = Number(time[i][2])+Number(time[i][1]*60)+Number(time[i][0]*60*60);
  //console.log(h);
  var k = map(h, 0, 24*60*60, 0, 255);
  append(timesplit, k);

}

//console.log(timesplit);
//console.log(split(time[0], ":"));
// console.log(pickup[0].substring(11, (pickup[0].length)-4));
 //console.log(tippercent);

}

