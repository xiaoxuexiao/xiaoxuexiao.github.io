// This example uses NYT's Top Stories API and visualizes the relative
// length of story headlines.
// ---

var headlines = [];
var abstract = [];
var Yellowcab;
var pickup = [];
var tippercent = [];
var time = [];
var timesplit = [];
var passenger = [];


function preload() {


  // Assemble url for API call
  var url = "https://data.cityofnewyork.us/resource/2yzn-sicd.json";

  Yellowcab = loadJSON(url);

}

function setup() {
  createCanvas(800, 800);
  background(0);
  noLoop();
  extractData();
  //angleMode(DEGREES);
}

function draw() {
//console.log(Yellowcab[0].tip_amount);
  console.log(Yellowcab);

  cx = width / 2;
  cy = height / 2;


 background(40, 40, 40);

 translate(cx, cy);


push();
 for (var i = 0; i < 1000; i++) { 
 stroke(color(255, 228, 0, 50));
 rotate(timesplit[i]);
 strokeWeight(2*passenger[i]);
 line(0, 0, 0, -8*tippercent[i]);}
pop(); 

push();
 for (var i = 0; i < 25; i++) {
 	strokeWeight(4);
 	stroke(255);
 	rotate(1 * TWO_PI / 24);
 	point(0, -200);
 }

pop();

 translate(-cx, -cy);
fill("yellow");
text('2015 New York City Yellow Cab Tip Rate through Day', 20, 20);
}



function extractData() {

  
  for (var i = 0; i < 1000; i++) {
    var h = Yellowcab[i].pickup_datetime;
    var j = 100*Number(Yellowcab[i].tip_amount)/Number(Yellowcab[i].total_amount);
    var k = Number(Yellowcab[i].passenger_count);

  append(pickup, h);  
  append(tippercent, j);
  append(passenger, k);



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
	var k = map(h, 0, 24*60*60, 0, TWO_PI);
	append(timesplit, k);

}

//console.log(timesplit);
//console.log(split(time[0], ":"));

// console.log(pickup[0].substring(11, (pickup[0].length)-4));


 //console.log(tippercent);

}

