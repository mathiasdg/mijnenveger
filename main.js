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
        // draw background when cell clicked
        fill(222);
        noStroke();
        square(x, y, draw_size);
        if (mouseButton === RIGHT) {
          fill(22, 222, 22);
          stroke(111, 122, 133);
          circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);

          console.log("gemarkeerd");
        } else {
          if (cell === "M") {
            GAME_OVER = true;
            fill(222, 22, 22);
            circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);

            console.log("BOOOM!");
            alert("GAME OVER!");
            showAllCells();

            noStroke();
          } else {
            if (total_cells - total_mines === 1) {
              FINISHED = true;
              console.log("u bent uit!");
              alert("U BENT UIT!");
            }

            // draw text with amount of mines around the cell
            noStroke();
            fill(22);
            textSize(draw_size * 0.5);
            textAlign(CENTER, CENTER);
            if (cell !== 0) {
              text(cell, x + draw_size / 2, y + draw_size / 2 + 3);
            }
            --total_cells;
          }
        }
        grid_clicked[pos_j][pos_i] = true;
      }
    } else {
      console.log("reeds geklikt");

      if (mouseButton === RIGHT) {
        erase();
        fill(22, 222, 22);
        circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);
        noErase();
        grid_clicked[pos_j][pos_i] = false;

        console.log("markering weg?");
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
