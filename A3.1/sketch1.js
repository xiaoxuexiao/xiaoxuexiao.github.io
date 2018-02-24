var nytResponse;
var headlines = [];
var hitwords = [
  "x",
  "z",
  "j",
  "w"

];



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
	createCanvas(1200, 1000);

	noLoop();

  extractHeadlines();

}


function draw() {
  background(0);
  fill("red");
  
  for (var i = 0; i < nytResponse.results.length; i++) {
  text(nytResponse.results[i].title, 20, 20+i*15);
}

//console.log(nytResponse);

for (var j = 0; j < headlines.length; j++) {
    var words = split(headlines[j], '');
     console.log(words);

}

function extractHeadlines() {

  // console.log(nytResponse); // take a look at the full API response structure

  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
    // besides .title, other text data available to you include:
    // .abstract, .byline, .section, etc. etc.
    append(headlines, h);
  }
}
   //console.log(headlines); // make sure counted data looks as expected




