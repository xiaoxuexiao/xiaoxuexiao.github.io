

// state data;
var uber = {};
var cab1 = {};

// state variables
var uberlat = [];
var uberlong = [];
var ubertime = [];

var cab1lat = [];
var cab1long = [];
var cab1t = [];

var s = 0;
var f = 0;

// state visual variables
var r = 3;

function preload() {



//uber = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/uber_0401%20-%20uber-raw-data-20140401-sorted.csv', 'csv', 'header');
//console.log(uber);
 

cab1 = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/yellow_tripdata_2014-04-01.csv', 'csv', 'header');
console.log(cab1);



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

// draw timeline;
  fill(255);
  ellipse(50+900/(24*60)*s, 950, 2, 2);


  fill(0, 225, 255);
  ellipse(uberlong[s], length-uberlat[s], r, r);
  
// draw yellow cab 01;

  fill(255, 255, 0, 10);
  //ellipse(cab1long[s], length-cab1lat[s], 3, 3);
 	var a = 0;
  
  for (var i = 0; i<cab1t.length; i++){
  	if ( cab1t[i] == s ) {
  		ellipse(cab1long[i], length-cab1lat[i], r, r);
  		a = a+1;
  	} 		
  }

	//draw curve;
	fill(255);
  	ellipse(50+900/(24*60)*s, 950-0.15*a, 2, 2);
	
	s = s+1;
 	if (s>24*60) {s=24*60+1;} //should stop s, when it reach uberlat.length.
 	//console.log(a);


}

	
//console.log(x);

function loadData() {


var a = cab1.getColumn("Pickup Latitude");
var b = cab1.getColumn("Pickup Longitude");
var c = cab1.getColumn("Pickup Datetime");



for (var i = 0; i<a.length; i++) { 

	var x = map(a[i], 40.65, 40.85, 0, width);
	var y = map(b[i], -74.10, -73.90, 0, length);
 
  //var x1 = map(Number(yellowcab[i].pickup_latitude), 40.65, 40.85, 0, width);
  //var y1 = map(Number(yellowcab[i].pickup_longitude), -74.10, -73.90, 0, length);

  append(cab1lat, x);
  append(cab1long, y);
  //append(cab1lat, x1);
  //append(cab1long, y1);

}

for (var i = 0; i<119634; i++) {

   //var x = c[i];
   var x = Number(c[i].substring(9, 10))*60 + Number(c[i].substring(11, 13));
   //var x = Number(c[i].substring(11, 13));
   append(cab1t, x);
}

for (var i = 119634; i<cab1lat.length; i++){

	var x = Number(c[i].substring(9, 11))*60 + Number(c[i].substring(12, 14));
   //var x = Number(c[i].substring(11, 13));
   append(cab1t, x);
}

console.log(cab1t);
//console.log(ubertime);


}
