// constants
let mapLat = [40.65, 40.85];
let mapLon = [-74.05, -73.85];
let mapWindowSize = 60;
let curveAverageWindowSize = 5;
let timelineAxisColor = [255, 255, 255];
let timelineGraduationColor = [55, 55, 55];
let arrowColor = [190, 190, 190];

// pixel density
var density;

// raw datasets
var raw_uber_weekday;
var raw_uber_weekend;
var raw_cab_weekday;
var raw_cab_weekend;

// datasets
var uber;
var uber_weekday;
var uber_weekend;
var cab;
var cab_weekday;
var cab_weekend;

// indexes
var uber_index;
var uber_weekday_index;
var uber_weekend_index;
var cab_index;
var cab_weekday_index;
var cab_weekend_index;

var uber_maximum;
var uber_weekday_maximum;
var uber_weekend_maximum;
var cab_maximum;
var cab_weekday_maximum;
var cab_weekend_maximum;

// runtime varibales
var timestamp = 0;
var frame = 0;
var datasets;
var datasetColors;
var pause = false;


function preload() {
  raw_uber_weekday = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/uber_0401.csv', 'csv', 'header');
  raw_uber_weekend = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/uber_0405.csv', 'csv', 'header');
  raw_cab_weekday = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/yellow_tripdata_2014-04-01.csv', 'csv', 'header');
  raw_cab_weekend = loadTable('https://raw.githubusercontent.com/xiaoxuexiao/xiaoxuexiao.github.io/master/A7.0/yellow_tripdata_2014-04-05.csv', 'csv', 'header');
}

function setup() {
  density = pixelDensity();
  canvas_width = max(windowWidth, 1000);
  canvas_height = max(windowHeight, 1000);
  createCanvas(canvas_width, canvas_height);

  // create virtual boxes for the different components
  timelineBox = [(canvas_width - min(1000, canvas_width - 420)) / 2, canvas_height - 200, min(1000, canvas_width - 420), 200];
  mapSize = min((canvas_width / 2) - 100, (canvas_height - 200) - 100);
  mapLeftBox = [(canvas_width / 2) - 50 - mapSize, 50, mapSize, mapSize];
  mapRightBox = [canvas_width - 50 - mapSize, 50, mapSize, mapSize];
  arrowLeftBox = [(canvas_width - timelineBox[2] - 420) / 2, canvas_height - 200, 210, 200];
  arrowRightBox = [(canvas_width + timelineBox[2]) / 2, canvas_height - 200, 210, 200];

  // process the data
  console.log("loading data");
  uber_weekday = loadData(raw_uber_weekday, mapSize, mapSize);
  uber_weekend =  loadData(raw_uber_weekend, mapSize, mapSize);
  cab_weekday = loadData(raw_cab_weekday, mapSize, mapSize);
  cab_weekend =  loadData(raw_cab_weekend, mapSize, mapSize);
  uber = merge(uber_weekday, uber_weekend);
  cab = merge(cab_weekday, cab_weekend);
  console.log("data loaded");

  // process the indexes
  uber_index = loadIndex(uber, mapSize, mapSize);
  uber_weekday_index = loadIndex(uber_weekday, mapSize, mapSize);
  uber_weekend_index = loadIndex(uber_weekend, mapSize, mapSize);
  cab_index = loadIndex(cab, mapSize, mapSize);
  cab_weekday_index = loadIndex(cab_weekday, mapSize, mapSize);
  cab_weekend_index = loadIndex(cab_weekend, mapSize, mapSize);

  // process the maximum value
  uber_maximum = loadMaximum(uber);
  uber_weekday_maximum = loadMaximum(uber_weekday);
  uber_weekend_maximum = loadMaximum(uber_weekend);
  cab_maximum = loadMaximum(cab);
  cab_weekday_maximum = loadMaximum(cab_weekday);
  cab_weekend_maximum = loadMaximum(cab_weekend);

  datasets = [[cab_weekday, cab_weekend], [uber_weekday, uber_weekend], [cab, uber]];
  indexes = [[cab_weekday_index, cab_weekend_index], [uber_weekday_index, uber_weekend_index], [cab_index, uber_index]];
  maximums = [[cab_weekday_maximum, cab_weekend_maximum], [uber_weekday_maximum, uber_weekend_maximum], [cab_maximum, uber_maximum]];
  titles = [["Cab Weekday", "Cab Weekend"], ["Uber Weekday", "Uber Weekend"], ["Cab All Week", "Uber All Week"]];
  datasetColors = [[[255, 255, 0], [255, 180, 0]], [[0, 225, 255], [0, 66, 255]], [[255, 255, 0], [0, 255, 255]]]

  frameRate(15);
  textFont('Verdana');
}

function drawTimelineAxis(box, maximum) {
  // draw the horizontal and vertical axis
  stroke(timelineAxisColor);
  strokeWeight(2);
  line(box[0] + 50, box[1] + 160, box[0] + box[2] - 80, box[1] + 160);

  stroke(timelineGraduationColor);
  line(box[0] + 50, box[1] + 120, box[0] + box[2] - 80, box[1] + 120);
  line(box[0] + 50, box[1] + 80, box[0] + box[2] - 80, box[1] + 80);
  line(box[0] + 50, box[1] + 40, box[0] + box[2] - 80, box[1] + 40);

  // draw the graduations
  noStroke();
  fill(timelineAxisColor);
  textSize(12);
  textAlign(CENTER);
  for (var i = 0; i <= 24; i++){
      ellipse(box[0] + 50 + (box[2] - 130)/24*i, box[1] + 160, 6, 6);
      text(i, box[0] + 50 + (box[2] - 130)/24*i, box[1] + 180);
  }

  textAlign(RIGHT, CENTER);
  for (var i = 0; i <= 3; i++) {
    text(i * maximum / 3, box[0] + 35, box[1] + 160 - i*40);
  }

  textAlign(RIGHT, BOTTOM);
  text("Trip count", box[0] + 50, box[1] + 10);

  textAlign(LEFT, CENTER);
  text("Hour of day", box[0] + box[2] - 65, box[1] + 160);

  textSize(16);
  textAlign(CENTER, BOTTOM);
  text("Uber and Yellow Cab trip count comparison in 2014", box[0] + (box[2] / 2), box[1]);
}

function drawTimelineCurve(box, dataset, maximum, color) {
  var previous = 0;
  var current = 0;

  for (var i = 0; i < 60*24; i++) {
    // moving average for first curve
    var count = 0;
    for (var j = i - curveAverageWindowSize + 1; j < i + curveAverageWindowSize; j++) {
      if (j < 0) {
        count += dataset[j + 60*24].length;
      } else if (j >= 60*24) {
        count += dataset[j - 60*24].length;
      } else {
        count += dataset[j].length;
      }
    }
    previous = current;
    current = 120 * (count / (2*curveAverageWindowSize - 1)) / maximum;

    if (i > 0) {
      let distance = timestampDistance(timestamp, i);
      var alpha = 0.0;
      if (distance < mapWindowSize) {
        alpha = 100
      } else if (distance > 3*mapWindowSize) {
        alpha = 20;
      } else {
        // linear gradient outside of the window
        alpha = 20 + (80 * (1 - ((distance - mapWindowSize) / (2 * mapWindowSize))));
      }

      strokeWeight(2);
      stroke(color[0], color[1], color[2], alpha);
      line(box[0] + 50 + (box[2] - 130)/(24*60)*(i-1), box[1] + 160 - previous, box[0] + 50 + (box[2] - 130)/(24*60)*i, box[1] + 160 - current);
    }
  }
}

function drawMap(box, index, color) {
  for (var i = 0; i < index.length; i++) {
    let x = i % box[2];
    let y = Math.floor(i / box[2]);

    var maximumCoeff = 0;
    for (var j = 0; j < index[i].length; j++) {
      if (index[i][j][1] < maximumCoeff) {
        break;
      }

      let distance = timestampDistance(timestamp, index[i][j][0]);
      var coeff = 0.0;
      if (distance < mapWindowSize) {
        coeff = 1
      } else if (distance > 3*mapWindowSize) {
        coeff = 0;
      } else {
        // linear gradient outside of the window
        coeff = (1 - ((distance - mapWindowSize) / (2*mapWindowSize)));
      }
      coeff *= index[i][j][1];

      if (coeff > maximumCoeff) {
        maximumCoeff = coeff;
      }
    }

    if (maximumCoeff > 0) {
      let alpha = int(20 + (200 * maximumCoeff));
      drawPixel(box[0] + x, box[1] + y, [color[0], color[1], color[2], alpha]);
    }
  }
}

function drawLeftArrow() {
  stroke(arrowColor);
  strokeWeight(3);

  let box = arrowLeftBox;
  line(box[0] + 60, box[1] + (box[3] / 2), box[0] + box[2] - 70, box[1] + 20);
  line(box[0] + 60, box[1] + (box[3] / 2), box[0] + box[2] - 70, box[1] + box[3] - 20);

  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text("previous", box[0] + 40, box[1] + (box[3] / 2));
}

function drawRightArrow() {
  stroke(arrowColor);
  strokeWeight(3);

  let box = arrowRightBox;
  line(box[0] + box[2] - 60, box[1] + (box[3] / 2), box[0] + 70, box[1] + 20);
  line(box[0] + box[2] - 60, box[1] + (box[3] / 2), box[0] + 70, box[1] + box[3] - 20);

  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text("next", box[0] + box[2] - 40, box[1] + (box[3] / 2));
}

function drawTitle(box, title) {
  textAlign(LEFT, TOP);
  textSize(24);
  text(title, box[0], box[1]);
}

function draw() {
  background(0);

  let maximum = Math.ceil(max(maximums[frame][0], maximums[frame][1]) / 15) * 15;
  if (maximum > 150) {
    maximum = Math.ceil(maximum / 150) * 150;
  }
  drawLeftArrow();
  drawRightArrow();
  drawTimelineAxis(timelineBox, maximum);
  drawTimelineCurve(timelineBox, datasets[frame][0], maximum, datasetColors[frame][0]);
  drawTimelineCurve(timelineBox, datasets[frame][1], maximum, datasetColors[frame][1]);

  loadPixels();
  drawMap(mapLeftBox, indexes[frame][0], datasetColors[frame][0]);
  drawMap(mapRightBox, indexes[frame][1], datasetColors[frame][1]);
  updatePixels();

  drawTitle(mapLeftBox, titles[frame][0]);
  drawTitle(mapRightBox, titles[frame][1]);

  if (!pause) {
    timestamp += 15;
    if (timestamp >= 60*24) {
      timestamp = 0;
    }
  }
}

function drawPixel(x, y, color) {
  for (var i = 0; i < density; i++) {
    for (var j = 0; j < density; j++) {
      let idx = 4 * ((y * density + j) * canvas_width * density + (x * density + i));
      pixels[idx] = color[0];
      pixels[idx + 1] = color[1];
      pixels[idx + 2] = color[2];
      pixels[idx + 3] = color[3];
    }
  }
}	

function loadData(rawDataset, width, height) {
  var dataset = Array(60*24);
  for (var i = 0; i < 60*24; i ++) {
    dataset[i] = [];
  }

  var timeColumn = rawDataset.getColumn(0);
  var latColumn = rawDataset.getColumn(1);
  var lonColumn = rawDataset.getColumn(2);

  for (var i = 0; i < timeColumn.length; i++) {
    var x = map(parseFloat(lonColumn[i]), mapLon[0], mapLon[1], 0, width);
    var y = height - map(parseFloat(latColumn[i]), mapLat[0], mapLat[1], 0, height);
    let splitTime = timeColumn[i].split(" ")[1].split(":");
    var parsedTime = (parseInt(splitTime[0]) * 60) + parseInt(splitTime[1]);
    append(dataset[parsedTime], [x, y]);
  }

  return dataset;
}

function loadIndex(dataset, width, height) {
  console.log("loading the index");
  var index = Array(width*height);
  for (var i = 0; i < width*height; i++) {
    index[i] = [];
  }

  for (var i = 0; i < 60*24; i++) {
    let coordinates = dataset[i];
    for (var j = 0; j < coordinates.length; j++) {
      let x = Math.floor(coordinates[j][0]);
      let y = Math.floor(coordinates[j][1]);

      if (coordinates[j][0] > x && coordinates[j][1] > y) {
        let coeff = (coordinates[j][0] - x) * (coordinates[j][1] - y);
        let idx = (y * width) + x;
        if (idx >= 0 && idx < index.length) {
          index[idx].push([i, coeff]);
        }
      }
      if (coordinates[j][0] < x + 1 && coordinates[j][1] > y) {
        let coeff = (x + 1 - coordinates[j][0]) * (coordinates[j][1] - y);
        let idx = (y * width) + (x + 1);
        if (idx >= 0 && idx < index.length) {
          index[idx].push([i, coeff]);
        }
      }
      if (coordinates[j][0] > x && coordinates[j][1] < y + 1) {
        let coeff = (coordinates[j][0] - x) * (y + 1 - coordinates[j][1]);
        let idx = ((y + 1) * width) + x;
        if (idx >= 0 && idx < index.length) {
          index[idx].push([i, coeff]);
        }
      }
      if (coordinates[j][0] < x + 1 && coordinates[j][1] < y + 1) {
        let coeff = (x + 1 - coordinates[j][0]) * (y + 1 - coordinates[j][1]);
        let idx = ((y + 1) * width) + (x + 1);
        if (idx >= 0 && idx < index.length) {
          index[idx].push([i, coeff]);
        }
      }
    }
  }

  for (var i = 0; i < index.length; i++) {
    index[i].sort(function(a, b){return b[1] - a[1]})
  }

  console.log("loaded the index");

  return index;
}

function loadMaximum(dataset) {
  var maximum = 0;
  for (var i = 0; i < 60*24; i++) {
    if (dataset[i].length > maximum) {
      maximum = dataset[i].length;
    }
  }
  return maximum;
}

function merge(dataset1, dataset2) {
  var dataset = Array(60*24);
  for (var i = 0; i < 60*24; i ++) {
    dataset[i] = dataset1[i].concat(dataset2[i]);
  }
  return dataset;
}

function timestampDistance(timestamp1, timestamp2) {
  if (timestamp1 < timestamp2) {
    return min(timestamp2 - timestamp1, timestamp1 - timestamp2 + 60*24);
  } else {
    return min(timestamp1 - timestamp2, timestamp2 - timestamp1 + 60*24);
  }
}

// actions
function next() {
  frame = frame + 1;
  if (frame > 2) {
    frame = 0;
  }
}

function previous() {
  frame = frame - 1;
  if (frame < 0) {
    frame = 2;
  }
}

function mousePressed() {
  if (mouseInBox(timelineBox)) {
    pause = true;
  }
}

function mouseReleased() {
  pause = false;
}

function mouseClicked() {
  console.log("clicked");
  if (mouseInBox(arrowLeftBox)) {
    previous();
  } else if (mouseInBox(arrowRightBox)) {
    next();
  }
}

function mouseInBox(box) {
  return mouseX >= box[0] && mouseX < box[0] + box[2] && mouseY >= box[1] && mouseY < box[1] + box[3];
}