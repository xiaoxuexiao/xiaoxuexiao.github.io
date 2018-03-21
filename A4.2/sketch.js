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

// state variables



function preload() {


  // Assemble url for API call
  var url = "https://data.cityofnewyork.us/resource/2yzn-sicd.json";

  Yellowcab = loadJSON(url);

}

function setup() {
  width = 1000;
  length = 1000;
  createCanvas(width, length);
  background(0);

  extractData();
  ra = 6;
  angleMode(DEGREES);

 var button = createButton("show tips");
  button.mousePressed(showtipsSketch);

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
  
  fill(255, timesplit[i], timesplit[i]);
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


}


function showtipsSketch() {


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
  stroke(255);
  strokeWeight(0.5);
  fill(255, timesplit[i], timesplit[i]);
//  ellipse(k, h, tippercent[i]/2, tippercent[i]/2);
  ellipse(k, length-h, tippercent[i]/2, tippercent[i]/2);


 //tip


ellipse(width-450+45, length-80, 2, 2);
fill(255);
text('1% Tip', width-450+10+45, length-80+ra);
text('20% Tip', width-450+10+45+70, length-80+ra);
stroke(255);
noFill();
ellipse(width-450+45+70, length-80, 10, 10);
 

}

}


function draw() {
noStroke();
fill(255);
textSize(15);
text('NYC 2015/08 Yellow Cab Pick-up Time and Tip Rate', width-500, length-50);
fill(255, 0, 0);
ellipse(width-495, length-80, ra*2, ra*2);
text('am', width-495+10, length-80+ra);
fill(255, 255, 255);
ellipse(width-450, length-80, ra*2, ra*2);
text('pm', width-450+10, length-80+ra);




}

// console.log(first);


  //console.log(la);
  //console.log(max(la));
  //console.log(min(la));


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

