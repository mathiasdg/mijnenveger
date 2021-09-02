/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const size = 5;
const canvas_size = 500;
let GAME_OVER = false;
let FINISHED = false;
let draw_size = canvas_size / size;
let total_mines = 0;
let total_cells = size * size;
let grid;
let grid_clicked;

function make_grid(size) {
  let grid = new Array(size);
  for (let i = 0; i < size; ++i) {
    grid[i] = new Array(size);
  }

  return grid;
}

function plant_mines(grid) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (Math.random() < 0.16) {
        grid[i][j] = "M";
        ++total_mines;
      } else {
        grid[i][j] = 0;
      }
    }
  }

  return grid;
}

function calculate_neighbours(grid) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let mines_around = 0;

      if (i != 0) {
        if (j != 0) {
          if (grid[i - 1][j - 1] === "M") ++mines_around;
        }
        if (grid[i - 1][j] === "M") ++mines_around;
        if (j != size - 1) {
          if (grid[i - 1][j + 1] === "M") ++mines_around;
        }
      }
      if (j != 0) {
        if (grid[i][j - 1] === "M") ++mines_around;
        if (i != size - 1) {
          if (grid[i + 1][j - 1] === "M") ++mines_around;
        }
      }
      if (i != size - 1) {
        if (grid[i + 1][j] === "M") ++mines_around;
        if (j != size - 1) {
          if (grid[i + 1][j + 1] === "M") ++mines_around;
        }
      }
      if (j != size - 1) {
        if (grid[i][j + 1] === "M") ++mines_around;
      }

      if (grid[i][j] !== "M") {
        grid[i][j] = mines_around;
      }
    }
  }

  return grid;
}

function draw_cell(value, x, y) {
  grid_clicked[x / draw_size][y / draw_size] = 1;
  // draw background
  fill(222);
  square(y, x, draw_size);
  // draw text with amount of mines around the cell
  noStroke();
  fill(22);
  textSize(draw_size * 0.5);
  textAlign(CENTER, CENTER);
  // if cell has no neighbours then draw nothing, even not the number 0 and show all neighbours cells with a flood fill function
  if (grid[x / draw_size][y / draw_size] !== 0) {
    text(value, y + draw_size / 2, x + draw_size / 2 + 3);
  }
}

function flood_fill(j, i) {
  let x = draw_size * i;
  let y = draw_size * j;
  let cell = grid[j][i];

  // draw_cell(cell, y, x);
  --total_cells;

  let a = j - 1;
  let b = i - 1;
  let c = j + 1;
  let d = i + 1;

  if (j != 0) {
    if (i != 0) {
      if (grid[a][b] !== "M" && !grid_clicked[a][b]) {
        draw_cell(grid[a][b], draw_size * a, draw_size * b);
        if (grid[a][b] === 0) {
          flood_fill(a, b);
        }
      }
    }
    if (grid[a][i] !== "M" && !grid_clicked[a][i]) {
      draw_cell(grid[a][i], draw_size * a, draw_size * i);
      if (grid[a][i] === 0) {
        flood_fill(a, j);
      }
    }

    if (i != size - 1) {
      if (grid[a][d] !== "M" && !grid_clicked[a][d]) {
        draw_cell(grid[a][d], draw_size * a, draw_size * d);
        if (grid[a][d] === 0) {
          flood_fill(a, d);
        }
      }
    }
  }
  if (i != 0) {
    if (grid[j][b] !== "M" && !grid_clicked[j][b]) {
      draw_cell(grid[j][b], draw_size * j, draw_size * b);
      if (grid[j][b] === 0) {
        flood_fill(j, b);
      }
    }
    if (j != size - 1) {
      if (grid[c][b] !== "M" && !grid_clicked[c][b]) {
        draw_cell(grid[c][b], draw_size * c, draw_size * b);
        if (grid[c][b] === 0) {
          flood_fill(c, b);
        }
      }
    }
  }
  if (j != size - 1) {
    if (grid[c][i] !== "M" && !grid_clicked[c][i]) {
      draw_cell(grid[c][i], draw_size * c, draw_size * i);
      if (grid[c][i] === 0) {
        flood_fill(c, i);
      }
    }
    if (i != size - 1) {
      if (grid[c][d] !== "M" && !grid_clicked[c][d]) {
        draw_cell(grid[c][d], draw_size * c, draw_size * d);
        if (grid[c][d] === 0) {
          flood_fill(c, d);
        }
      }
    }
  }
  if (i != size - 1) {
    if (grid[j][d] !== "M" && !grid_clicked[j][d]) {
      draw_cell(grid[j][d], draw_size * j, draw_size * d);
      if (grid[j][d] === 0) {
        flood_fill(j, d);
      }
    }
  }

  // draw_cell(cell, x, y, i, j);
}

function show_all_cells() {
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      let x = draw_size * j;
      let y = draw_size * i;
      let cell = grid[i][j];

      // draw background when cell clicked
      fill(222);
      noStroke();
      square(x, y, draw_size);

      if (cell === "M") {
        fill(222, 22, 22);
        circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);
      } else {
        // draw text with amount of mines around the cell
        noStroke();
        fill(22);
        textSize(draw_size * 0.5);
        textAlign(CENTER, CENTER);
        if (cell !== 0) {
          text(cell, x + draw_size / 2, y + draw_size / 2 + 3);
        }
      }
    }
  }
}

function toggle_marker(pos_j, pos_i, x, y) {
  if (grid_clicked[pos_j][pos_i] !== 2) {
    fill(22, 222, 22);
    circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);

    grid_clicked[pos_j][pos_i] = 2;
  }
  // erase drawing of green circle and background
  else {
    erase();
    noStroke();
    fill(222);
    circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);
    square(x, y, draw_size);
    noErase();

    grid_clicked[pos_j][pos_i] = 0;
  }
}

function show_cell() {
  let pos_i = Math.floor(mouseX / draw_size);
  let pos_j = Math.floor(mouseY / draw_size);
  let x = draw_size * pos_i;
  let y = draw_size * pos_j;

  if (GAME_OVER) {
    console.log("GAME OVER!");
    alert("GAME OVER!");
  } else if (FINISHED) {
    console.log("FINISHED!");
    alert("U BENT UIT! WOEW!");
  } else {
    if (!grid_clicked[pos_j][pos_i]) {
      let cell = grid[pos_j][pos_i];

      // draw background when cell is clicked
      fill(222);
      noStroke();
      square(x, y, draw_size);
      if (mouseButton === RIGHT) {
        // draw marker if you think it is a mine by clicking right mousebutton
        toggle_marker(pos_j, pos_i, x, y);
      } else {
        grid_clicked[pos_j][pos_i] = 1;

        if (cell === "M") {
          GAME_OVER = true;
          alert("GAME OVER!");
          show_all_cells();
        } else if (cell !== 0) {
          // draw text with amount of mines around the cell
          noStroke();
          fill(22);
          textSize(draw_size * 0.5);
          textAlign(CENTER, CENTER);
          text(cell, x + draw_size / 2, y + draw_size / 2 + 3);
        } else {
          // if cell has no neighbours then draw nothing, not even the number 0 and show all neighbours cells with a flood fill function
          // console.log("pos_j, pos_i", pos_j, pos_i);
          flood_fill(pos_j, pos_i);
        }

        // mark the clicked cell as true in the 2D array that keeps track of that (grid_clicked)
        // value is 0 if not yet clicked, 1 if it is clicked already, and 2 if it has a marker that can be deleted again

        --total_cells;
      }
    } else {
      // console.log("reeds geklikt");

      if (mouseButton === RIGHT && grid_clicked[pos_j][pos_i] === 2) {
        toggle_marker(pos_j, pos_i, x, y);
      }
    }
  }
  // textSize(11);
  // text(x + " " + y, x + draw_size / 2, y + draw_size / 2);
}

grid = plant_mines(make_grid(size));
total_cells -= total_mines;
grid_clicked = make_grid(size);
calculate_neighbours(grid);
console.table(grid);
// console.table(grid_clicked);
// console.log("totale mijnen: " + total_mines);

function setup() {
  let canvas = createCanvas(canvas_size, canvas_size);
  canvas.mousePressed(show_cell);

  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", e => e.preventDefault());
  }
}

function draw() {
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      let x = draw_size * j;
      let y = draw_size * i;

      // draw empty start grid
      stroke(111, 122, 133);
      noFill();
      square(x, y, draw_size);
      // text(x + " " + y, x + draw_size / 2, y + draw_size / 2);
    }
  }
  // if statement to end the game when all cells are clicked
  // if (total_cells - total_mines === 1) {
  //   FINISHED = true;
  //   show_all_cells();
  //   alert("U BENT UIT!");
  // }
}
