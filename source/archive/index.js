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
