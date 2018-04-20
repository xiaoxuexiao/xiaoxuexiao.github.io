

// state data;
var uber = {};
var yellowcab = {};

// state variables
var uberlat = [];
var uberlong = [];
var ubertime = [];

var cablat = [];
var cablong = [];

var s = 0;
var f = 0;


function preload() {



uber = loadTable('uber_0401 - uber-raw-data-20140401-sorted.csv', 'csv', 'header');
//console.log(uber);
 

  var url = "https://data.cityofnewyork.us/resource/gkne-dk5s.json";

  //yellowcab = loadJSON(url);

}


function setup() {
  width = 1000;
  length = 1000;
  createCanvas(width, length);
  background(0);
  loadData();
  frameRate(10000);
  
}

function draw() {

  noStroke();
  fill(0, 225, 255, 130);
  ellipse(uberlong[s], length-uberlat[s], 3, 3);
  fill(255, 255, 0, 130);
  ellipse(cablong[s], length-cablat[s], 3, 3);
  s = s+1;
  if (s>uberlat.length) {s=0;} //should stop s, when it reach uberlat.length.


}

	
//console.log(x);

function loadData() {


var a = uber.getColumn("Lat");
var b = uber.getColumn("Lon");
var c = uber.getColumn("Date/Time");


//console.log(yellowcab);

for (var i = 0; i<a.length; i++) { 

	var x = map(a[i], 40.65, 40.85, 0, width);
	var y = map(b[i], -74.10, -73.90, 0, length);
 
  //var x1 = map(Number(yellowcab[i].pickup_latitude), 40.65, 40.85, 0, width);
  //var y1 = map(Number(yellowcab[i].pickup_longitude), -74.10, -73.90, 0, length);

  append(uberlat, x);
  append(uberlong, y);
  //append(cablat, x1);
  //append(cablong, y1);

}


for (var i = 0; i<60; i++) {

   var x1 = Number(c[i].substring(10, 11))+ Number(c[i].substring(13, 14));
   append(ubertime, x1);
}

//console.log(ubertime);


}
