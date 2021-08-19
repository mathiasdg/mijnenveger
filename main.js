let rows = 14;
let cols = 16;
let total_mines = 0;
let grid;

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

grid = plant_mines(make_grid(rows, cols));
calculate_neighbors(grid);
console.table(grid);
console.log("totale mijnen: " + total_mines);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
