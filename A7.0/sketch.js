

// state data sources;
var uber1 = {};
var uber2 = {};

var cab1 = {};
var cab2 = {};


// state variables
var uber1lat = [];
var uber1long = [];
var uber1t = [];

var uber2lat = []
var uber2long = [];
var uber2t = [];

var cab1lat = [];
var cab1long = [];
var cab1t = [];

var cab2lat = [];
var cab2long = [];
var cab2t = [];


// state frame;
var s = 0;
var f = 0;

// state visual variables
var r = 3;


function preload() {



uber1 = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/uber_0401.csv', 'csv', 'header');
console.log(uber1);

uber2 = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/uber_0405.csv', 'csv', 'header');

cab1 = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/yellow_tripdata_2014-04-01.csv', 'csv', 'header');
//console.log(cab1);

cab2 = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/yellow_tripdata_2014-04-05.csv', 'csv', 'header');

}


function setup() {

  width = 1000;
  length = 1000;
  
  createCanvas(width, length);
  background(0);
  
  frameRate(200);

  loadData();
  

  var button0 = createButton("next");
  button0.mousePressed(Next);

  
}

function draw() {

  noStroke();

// draw timeline;

  fill(255);
  ellipse(50+900/(24*60)*s, 960, 2, 2);

    for (var i = 0; i<25; i++){
    if ( i*60 == s ) {
      fill(255);
      ellipse(50+900/24*i, 960, 6, 6);
      text(i, 50+900/24*i-4, 980);
    }
  } 




// data cab comparison;


  if (f == 0) {

  //text

  fill(255);
  text('Yellow Cab Trip Weekday (04/01/2014) and Weekend (04/05/2014) Comparison', 50, 50);  
  fill(255, 255, 0);
  ellipse(50, 100, 8, 8);
  text('Weekday', 60, 100);
  fill(255, 180, 0);
  ellipse(50, 120, 8, 8);
  text('Weekend', 60, 120);

  var a = 0;
  var b = 0;

  // draw yellow cab 01 map;
  
  for (var i = 0; i<cab1t.length; i++){
    if ( cab1t[i] == s ) {
      fill(255, 255, 0, 10);
      ellipse(cab1long[i]+160, length-cab1lat[i], r, r);
      a = a+1;
    }     
  }

// draw yellow cab 02 map;

  for (var i = 0; i<cab2t.length; i++){
    if ( cab2t[i] == s ) {
      fill(255, 180, 0, 10);
      ellipse(cab2long[i]-350, length-cab2lat[i], r, r);
      b = b+1;

    }
  }


  //draw curve;
  fill(255, 255, 0);
  ellipse(50+900/(24*60)*s, 950-0.15*a, 2, 2);

  fill(255, 180, 0);
  ellipse(50+900/(24*60)*s, 950-0.15*b, 2, 2);
  
  s = s+1;
  if (s>24*60) {s=24*60+1;} 
  //should stop s, when it reach uberlat.length.
  //console.log(a);
  }




//data uber comparison;

  else if (f == 1 ) {

   //text

  fill(255);
  text('Uber Trip Weekday (04/01/2014) and Weekend (04/05/2014) Comparison', 50, 50);  
  fill(0, 255, 255);
  ellipse(50, 100, 8, 8);
  text('Weekday', 60, 100);
  fill(0, 66, 255);
  ellipse(50, 120, 8, 8);
  text('Weekend', 60, 120);   

  var a = 0;
  var b = 0;

  //uber1 
 for (var i = 0; i<uber1t.length; i++){
    if ( uber1t[i] == s ) {
      fill(0, 225, 255, 100);
      ellipse(uber1long[i]+160, length-uber1lat[i], r, r);
      a = a+1;

    }
  }

 for (var i = 0; i<uber2t.length; i++){
    if ( uber2t[i] == s ) {
      fill(0, 66, 255, 100);
      ellipse(uber2long[i]-350, length-uber2lat[i], r, r);
      b = b+1;
    }
  }

  //draw curve;
  fill(0, 225, 255);
  ellipse(50+900/(24*60)*s, 950-a, 2, 2);

  fill(0, 66, 255);
  ellipse(50+900/(24*60)*s, 950-b, 2, 2);
  
  s = s+1;
  if (s>24*60) {s=24*60+1;} 
  //should stop s, when it reach uberlat.length.
  //console.log(a);

  }





//data uber/cab weekday comparison;

  else if (f == 2) {

     //text
  fill(255);
  text('Yellow Cab/Uber Trip Weekday (04/01/2014) Comparison', 50, 50);  
  fill(0, 255, 255);
  ellipse(50, 100, 8, 8);
  text('Uber', 60, 100);
  fill(255, 255, 0);
  ellipse(50, 120, 8, 8);
  text('Yellow Cab', 60, 120);   

 	var a = 0;
  var b = 0;

  // draw yellow cab 01 map;
  
  for (var i = 0; i<cab1t.length; i++){
  	if ( cab1t[i] == s ) {
      fill(255, 255, 0, 10);
  		ellipse(cab1long[i]+160, length-cab1lat[i], r, r);
  		a = a+1;
  	} 		
  }

// draw uber 01 map;

  for (var i = 0; i<uber1t.length; i++){
    if ( uber1t[i] == s ) {
      fill(0, 225, 255, 100);
      ellipse(uber1long[i]-350, length-uber1lat[i], r, r);
      b = b+1;

    }
  }


	//draw curve;
	fill(255, 255, 0);
  ellipse(50+900/(24*60)*s, 950-0.15*a, 2, 2);

  fill(0, 225, 255);
  ellipse(50+900/(24*60)*s, 950-b, 2, 2);
	
	s = s+1;
 	if (s>24*60) {s=24*60+1;} 
  //should stop s, when it reach uberlat.length.
 	//console.log(a);

}




}




function Next() {
  background(0);
  s = 0;
  f = f+1;
  if (f > 2) {
    f = 0;
  }
}
	

function loadData() {

//data uber0401

var a1 = uber1.getColumn("Lat");
var b1 = uber1.getColumn("Lon"); 
var c1 = uber1.getColumn("Date/Time");

for (var i = 0; i<a1.length; i++) { 

  var x = map(a1[i], 40.65, 40.85, 0, width);
  var y = map(b1[i], -74.10, -73.90, 0, length);

  append(uber1lat, x);
  append(uber1long, y);
}

for (var i = 0; i<3884; i++) {

   var x = Number(c1[i].substring(9, 10))*60 + Number(c1[i].substring(11, 13));
  //var x = c1[i];

  append(uber1t, x);
}

for (var i = 3884; i<uber1lat.length; i++){

  var x = Number(c1[i].substring(9, 11))*60 + Number(c1[i].substring(12, 14));
 
  append(uber1t, x);
}

//console.log(uber1t);

//data uber0405;


var a2 = uber2.getColumn("Lat");
var b2 = uber2.getColumn("Lon"); 
var c2 = uber2.getColumn("Date/Time");

for (var i = 0; i<a2.length; i++) { 

  var x = map(a2[i], 40.65, 40.85, 0, width);
  var y = map(b2[i], -74.10, -73.90, 0, length);

  append(uber2lat, x);
  append(uber2long, y);
}

for (var i = 0; i<3140; i++) {

   var x = Number(c2[i].substring(9, 10))*60 + Number(c2[i].substring(11, 13));

   append(uber2t, x);
}


for (var i = 3140; i<uber2lat.length; i++){

  var x = Number(c2[i].substring(9, 11))*60 + Number(c2[i].substring(12, 14));
 
  append(uber2t, x);
}


//console.log(uber2t);

//data cab0405;

var a3 = cab2.getColumn("Pickup Latitude");
var b3 = cab2.getColumn("Pickup Longitude");
var c3 = cab2.getColumn("Pickup Datetime");

for (var i = 0; i<a3.length; i++) { 

  var x = map(a3[i], 40.65, 40.85, 0, width);
  var y = map(b3[i], -74.10, -73.90, 0, length);


  append(cab2lat, x);
  append(cab2long, y);

}


for (var i = 0; i<150904; i++) {

   var x = Number(c3[i].substring(9, 10))*60 + Number(c3[i].substring(11, 13));
   
   append(cab2t, x);
}

for (var i = 150904; i<cab2lat.length; i++){

  var x = Number(c3[i].substring(9, 11))*60 + Number(c3[i].substring(12, 14));
 
  append(cab2t, x);
}



//console.log(cab2t);
//console.log(ubertime);





//data cab0401

var a = cab1.getColumn("Pickup Latitude");
var b = cab1.getColumn("Pickup Longitude");
var c = cab1.getColumn("Pickup Datetime");

for (var i = 0; i<a.length; i++) { 

	var x = map(a[i], 40.65, 40.85, 0, width);
	var y = map(b[i], -74.10, -73.90, 0, length);

  append(cab1lat, x);
  append(cab1long, y);
}

for (var i = 0; i<119634; i++) {

   var x = Number(c[i].substring(9, 10))*60 + Number(c[i].substring(11, 13));
   
   append(cab1t, x);
}

for (var i = 119634; i<cab1lat.length; i++){

	var x = Number(c[i].substring(9, 11))*60 + Number(c[i].substring(12, 14));
 
  append(cab1t, x);
}

//console.log(cab1t);
//console.log(ubertime);

}
