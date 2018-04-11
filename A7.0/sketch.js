// This example uses NYT's Top Stories API and visualizes the relative
// length of story headlines.
// ---

// state data;
var uber = {};
var yellowcab = {};

// state variables
var uberlat = [];
var uberlong = [];
var cablat = [];
var cablong = [];

var s = 0;


function preload() {


  // Assemble url for API call

  uber = loadTable('https://raw.githubusercontent.com/fivethirtyeight/uber-tlc-foil-response/master/uber-trip-data/uber-raw-data-apr14.csv', 'csv', 'header');

  var url = "https://data.cityofnewyork.us/resource/gkne-dk5s.json";

  yellowcab = loadJSON(url);

}


function setup() {
  width = 1000;
  length = 1000;
  createCanvas(width, length);
  background(0);
  loadData();
  frameRate(200);
  
}

function draw() {

  noStroke();
  fill(0, 225, 255, 130);
  ellipse(uberlong[s], length-uberlat[s], 3, 3);
  fill(255, 255, 0, 130);
  ellipse(cablong[s], length-cablat[s], 3, 3);
  s = s+1;
  if (s>1000){s=0;}

}

	
//console.log(x);

function loadData() {


var a = uber.getColumn("Lat");
var b = uber.getColumn("Lon");


//console.log(yellowcab);

for (var i = 0; i<1000; i++) { 

	var x = map(a[i], 40.65, 40.85, 0, width);
	var y = map(b[i], -74.10, -73.90, 0, length);
  var x1 = map(Number(yellowcab[i].pickup_latitude), 40.65, 40.85, 0, width);
  var y1 = map(Number(yellowcab[i].pickup_longitude), -74.10, -73.90, 0, length);

  append(uberlat, x);
  append(uberlong, y);
  append(cablat, x1);
  append(cablong, y1);

}

console.log(cablat);

}
