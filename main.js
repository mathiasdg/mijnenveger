const size = 7;
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

function showCell() {
  let pos_i = Math.floor(mouseX / draw_size);
  let pos_j = Math.floor(mouseY / draw_size);

  if (GAME_OVER) {
    console.log("GAME OVER!");
  } else if (FINISHED) {
    console.log("FINISHED!");
  } else {
    if (!grid_clicked[pos_j][pos_i]) {
      let cell = grid[pos_j][pos_i];
      let x = draw_size * pos_i;
      let y = draw_size * pos_j;

      if (cell === "M") {
        if (mouseIsPressed) {
          if (mouseButton === LEFT) {
            GAME_OVER = true;
            console.log("BOOOM!");
            fill(222, 22, 22);
          }
          if (mouseButton === RIGHT) {
            fill(22, 222, 22);
            console.log("mooie vondst!!");
          }
          noStroke();
          circle(x + draw_size / 2, y + draw_size / 2, draw_size / 2);
        }
      } else {
        if (total_cells - total_mines === 1) {
          FINISHED = true;
          console.log("u bent uit!");
        }
        noStroke();
        fill(22);
        textSize(draw_size * 0.5);
        textAlign(CENTER, CENTER);
        if (1) {
          text(cell, x + draw_size / 2, y + draw_size / 2 + 3);
        }
        --total_cells;
      }
      grid_clicked[pos_j][pos_i] = true;
    } else {
      console.log("reeds geklikt");
    }
  }
}

grid = plant_mines(make_grid(rows, cols));
grid_clicked = make_grid(rows, cols);
calculate_neighbors(grid);
// console.table(grid);
// console.table(grid_clicked);
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
