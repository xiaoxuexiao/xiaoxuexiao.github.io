// This example uses NYT's Top Stories API and visualizes the relative
// length of story headlines.
// ---

var headlines = [];
var maxHeadLen, minHeadLen;

function preload() {


  // Assemble url for API call
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "6db9472ef04a4261828af02e9cb81f02"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);


  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.
}

function setup() {
  createCanvas(1600, 1000);
  background(0);

  textSize(15);

  textAlign(LEFT);

  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  extractHeadlines();
}

function draw() {
  background(0);

  // Set the left and top margin
  var margin = 40;
  translate(margin, margin);

  var lineheight = 15;
  var rectheight = 8;

  for (var i = 0; i < headlines.length; i++) {

    noStroke();
    //fill(0, 128, 218, 100);
    fill(0, 128, 218, headlines[i].length);
    rect(0, (i-1)*lineheight, (headlines[i].length), lineheight-1);
    // draw headline
    fill(0, 128, 218, headlines[i].length);
    text(headlines[i], (headlines[i].length), i*lineheight-3);
  }
}

function extractHeadlines() {

   //console.log(nytResponse); // take a look at the full API response structure

  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].abstract;
    // besides .title, other text data available to you include:
    // .abstract, .byline, .section, etc. etc.
//console.log(nytResponse.results[0].abstract);
  
    append(headlines, h);

  console.log(headlines);
  }


//   console.log(headlines); // make sure counted data looks as expected
   //console.log(maxHeadLen);
   //console.log(minHeadLen);
}