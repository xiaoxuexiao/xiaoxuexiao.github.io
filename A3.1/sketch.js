var headlines = [];
var hitwords = [
  "x",
  "z",
  "j",
  "w"

];

var nytResponse;
var letterCounts;

var maxTextSize = 250;
var defaultTextSize = 24;


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
  createCanvas(800, 1150);
  background(0);

  textSize(14);
  textAlign(LEFT);

  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  extractHeadlines();
}

function draw() {
  background(0);

  var lineheight = 24;
  var margin = 40;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], '');
  console.log(words);

    var nextX = 0;

     for (var j = 0; j < words.length; j++) {
      if (hitwords.includes(words[j].toLowerCase())) {
        fill("blue");
        rect(0, i*lineheight, 20, lineheight);
      } else {
        fill("yellow");
      }

      text(words[j], nextX, i*lineheight);
      nextX += textWidth(words[j]);
    }
  }
}

function extractHeadlines() {

  // console.log(nytResponse); // take a look at the full API response structure

  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
    // besides .title, other text data available to you include:
    // .abstract, .byline, .section, etc. etc.
    append(headlines, h);
  }

   //console.log(headlines); // make sure counted data looks as expected
}




