var mapimg

var w = 1280
var h = 640
var zoom = 1

var earthquakes

var clat = 0
var clon = 0
var lat = 49.2827
var lon = -123.1207

function preload() {
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0," + zoom +
    ",0,0/" + w + 'x' + h + "?access_token=pk.eyJ1IjoiZWJhc3Npc3QiLCJhIjoiY2oyamxpMHlnMDAwODMzbzYxZzAxZGFuNSJ9.0w3qg4NA5rD1BcLXiyoeDw")
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
}

function setup() {
  createCanvas(w, h)
  translate(width / 2, height / 2)
  imageMode(CENTER)
  image(mapimg, 0, 0)

  var cx = webMercX(clon)
  var cy = webMercY(clat)


  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/)
    var lat = data[1]
    var lon = data[2]
    var mag = data[4]
    var x = webMercX(lon) - cx
    var y = webMercY(lat) - cy

    mag = pow(10, mag)
    mag = sqrt(mag)

    var magmax = sqrt(pow(10, 10))

    var d = map(mag, 0, magmax ,0 , 180)
    stroke(255, 0, 255)
    fill(255, 0, 255, 200)
    ellipse(x, y, d, d)
  }
}

function webMercX(lon) {
  lon = radians(lon)
  var a = (256 / PI) * pow(2, zoom)
  var b = lon + PI
  return a * b
}

function webMercY(lat) {
  lat = radians(lat)
  var a = (256 / PI) * pow(2, zoom)
  var b = tan(PI / 4 + lat / 2)
  var c = PI - log(b)
  return a * c
}
