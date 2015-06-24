var context;
var width = 500;
var height = 500;

function setBackground() {
	context.clearRect(0, 0, width, height);
	context.fillStyle = "white";
	context.fillRect(0,0,width,height);
}

function point(x,y) {
	this.x = x;
	this.y = y;
}

var grid = [
	[1,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,2]
]

var mouse = new point(0,0);

var colors = ["black", "green", "red"];

var turn = 0;
var points = [2, 2];
var maxPoints = [2, 2];

var spacing = 2;
var tileSize = 40;

function drawGrid() {
	var y = 0;
	var x = 0;

	for (var row = 0; row < grid.length; row++) {
		x = 0;
		var line = grid[row];
		for (var col = 0; col < line.length; col++) {
			var tile = line[col];
			context.clearRect(x * tileSize + ((x + 1) * spacing), y * tileSize + ((y + 1) * spacing), tileSize, tileSize);
			context.fillStyle =  colors[tile];
			context.fillRect(x * tileSize + ((x + 1) * spacing), y * tileSize + ((y + 1) * spacing), tileSize, tileSize);
			x++;
		}
		y++;
	}
}

function draw() {
	setBackground();
	drawGrid();
}

function connectedTile(y, x) {
  var connected = false;
  if (x > 0) {
    var left = grid[y][x-1];
    connected = left === turn + 1;
  }

  if (!connected && x < grid.length) {
    var right = grid[y][x+1];
    connected = right === turn + 1;
  }

  if (!connected && y > 0) {
    var above = grid[y-1][x];
    connected = above === turn + 1;
  }

  if (!connected && y < grid.length) {
    var below = grid[y+1][x];
    connected = below === turn + 1;
  }

  return connected;
}

function moveTile(y, x) {
  var connected = connectedTile(y, x);

  if (!connected) {
    return;
  }

  grid[y][x] = 1+turn;

  points[turn]--;
  if (points[turn] <= 0) {
    points[turn] = maxPoints[turn];
    maxPoints[turn] = 2;
    turn = Math.abs(1 - turn);
  }

  var other = 1 + (Math.abs(1 - turn));

  if (cutoff === true) {
	//maxPoints[turn]++;
    //console.log("step up");
  }


}

$(document).ready(function() {
  var canvas = $('#canvas');
  context = canvas.get(0).getContext('2d');
  setBackground();

  setInterval(draw, 10);
  canvas.mousemove(function(e) {
    var mousex = e.pageX - canvas.offset().left;
    var mousey = e.pageY - canvas.offset().top;

	mouse.x = mousex;
	mouse.y = mousey;
  });

  canvas.mousedown(function(e) {
    var mousex = e.pageX - canvas.offset().left;
    var mousey = e.pageY - canvas.offset().top;

		mouse.x = mousex;
		mouse.y = mousey;


 var x = 0;
 var y = 0;
 var mx = 0;
 var my = 0;

 for (var row = 0; row < grid.length; row++) {
   x = 0;

   if (mouse.y >= ((y * tileSize) + ((y + 1) * spacing))) {
     my = y;

   }
   var line = grid[row];
   for (var col = 0; col < line.length; col++) {
     if (mouse.x >= ((x * tileSize) + ((x + 1) * spacing))) {
      mx = x;

     }
     x++;

   }

   y++;
 }

 moveTile(my, mx);
 drawGrid();
  });

});
