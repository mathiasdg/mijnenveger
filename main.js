/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const size = 5;
const canvas_size = 500;
const rows = size;
const cols = size;
let GAME_OVER = false;
let FINISHED = false;
let draw_size = canvas_size / size;
let total_mines = 0;
let total_cells = size * size;
let grid;
let grid_clicked;

function make_grid(rows, cols) {
  let grid = new Array(rows);
  for (let i = 0; i < rows; ++i) {
    grid[i] = new Array(cols);
  }

  return grid;
}

function plant_mines(grid) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (Math.random() < 0.22) {
        grid[i][j] = "M";
        ++total_mines;
      } else {
        grid[i][j] = 0;
      }
    }
  }

  return grid;
}

function calculate_neighbors(grid) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let mines_around = 0;

      if (i != 0) {
        if (j != 0) {
          if (grid[i - 1][j - 1] === "M") ++mines_around;
        }
        if (grid[i - 1][j] === "M") ++mines_around;
        if (j != cols - 1) {
          if (grid[i - 1][j + 1] === "M") ++mines_around;
        }
      }
      if (j != 0) {
        if (grid[i][j - 1] === "M") ++mines_around;
        if (i != rows - 1) {
          if (grid[i + 1][j - 1] === "M") ++mines_around;
        }
      }
      if (i != rows - 1) {
        if (grid[i + 1][j] === "M") ++mines_around;
        if (j != cols - 1) {
          if (grid[i + 1][j + 1] === "M") ++mines_around;
        }
      }
      if (j != cols - 1) {
        if (grid[i][j + 1] === "M") ++mines_around;
      }

      if (grid[i][j] !== "M") {
        grid[i][j] = mines_around;
      }
    }
  }

  return grid;
}

function floodfill(i, j) {
  console.log("floodfill");
  console.log(i, j);
  console.log(grid_clicked[i][j]);

  let x = draw_size * j;
  let y = draw_size * i;

  // draw text with amount of mines around the cell
  fill(222);
  square(x, y, draw_size);
  noStroke();
  fill(22);
  textSize(draw_size * 0.5);
  textAlign(CENTER, CENTER);
  // if cell has no neiggbours then draw nothing, even not the number 0 and show all neighbours cells with a flood fill function
  if (grid[i][j] !== 0) {
    text(cell, x + draw_size / 2, y + draw_size / 2 + 3);
  }
  --total_cells;

  let a = i - 1;
  let b = j - 1;
  let c = i + 1;
  let d = j + 1;

  if (i != 0) {
    if (j != 0) {
      if (grid[a][b] === 0 && !grid_clicked[a][b]) {
        grid_clicked[a][b] = true;
        floodfill(a, b);
      }
    }
    if (grid[a][j] === 0 && !grid_clicked[a][j]) {
      grid_clicked[a][j] = true;
      floodfill(a, j);
    }

    if (j != cols - 1) {
      if (grid[a][d] === 0 && !grid_clicked[a][d]) {
        grid_clicked[a][d] = true;
        floodfill(a, d);
      }
    }
  }
  if (j != 0) {
    if (grid[i][b] === 0 && !grid_clicked[i][b]) {
      grid_clicked[i][b] = true;
      floodfill(i, b);
    }
    if (i != rows - 1) {
      if (grid[c][b] === 0 && !grid_clicked[c][b]) {
        grid_clicked[c][b] = true;
        floodfill(c, b);
      }
    }
  }
  if (i != rows - 1) {
    if (grid[c][j] === 0 && !grid_clicked[c][j]) {
      grid_clicked[c][j] = true;
      floodfill(c, j);
    }
    if (j != cols - 1) {
      if (grid[c][d] === 0 && !grid_clicked[c][d]) {
        grid_clicked[c][d] = true;
        floodfill(c, d);
      }
    }
  }
  if (j != cols - 1) {
    if (grid[i][d] === 0 && !grid_clicked[i][d]) {
      grid_clicked[i][d] = true;
      floodfill(i, d);
    }
  }
}

function showAllCells() {
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
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

function showCell() {
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

      if (mouseIsPressed) {
        // draw background when cell is clicked
        fill(222);
        noStroke();
        square(x, y, draw_size);
        // draw marker if you think it is a mine by clicking right mousebutton
        if (mouseButton === RIGHT) {
          fill(22, 222, 22);
          circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);

          // console.log("gemarkeerd");
        } else {
          if (cell === "M") {
            GAME_OVER = true;
            fill(222, 22, 22);
            circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);

            console.log("BOOOM!");
            alert("GAME OVER!");
            showAllCells();
          } else {
            // draw text with amount of mines around the cell
            noStroke();
            fill(22);
            textSize(draw_size * 0.5);
            textAlign(CENTER, CENTER);
            // if cell has no neiggbours then draw nothing, even not the number 0 and show all neighbours cells with a flood fill function
            if (cell !== 0) {
              text(cell, x + draw_size / 2, y + draw_size / 2 + 3);
            } else {
              floodfill(pos_j, pos_i);
            }
            // if statement to end the game when all cells are clicked
            if (total_cells - total_mines === 1) {
              FINISHED = true;
              console.log("u bent uit!");
              showAllCells();
              alert("U BENT UIT!");
            }
            --total_cells;
          }
        }
        // mark the clicked cell as true in the 2D array that keeps track of that (grid_clicked)
        grid_clicked[pos_j][pos_i] = true;
      }
    } else {
      console.log("reeds geklikt");

      if (mouseButton === RIGHT) {
        // erase drawing of green circle and background
        erase();
        noStroke();
        fill(222);
        circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);
        square(x, y, draw_size);
        noErase();

        grid_clicked[pos_j][pos_i] = false;
      }
    }
  }
}

grid = plant_mines(make_grid(rows, cols));
grid_clicked = make_grid(rows, cols);
calculate_neighbors(grid);
console.table(grid);
console.table(grid_clicked);
console.log("totale mijnen: " + total_mines);

function setup() {
  let canvas = createCanvas(canvas_size, canvas_size);
  canvas.mousePressed(showCell);

  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", e => e.preventDefault());
  }
}

function draw() {
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      let x = draw_size * j;
      let y = draw_size * i;

      // draw empty start grid
      stroke(111, 122, 133);
      noFill();
      square(x, y, draw_size);
    }
  }
}
