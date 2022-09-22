var currentColorSelection = "black";

// function definitions
function createGrid(x) {
  // set container styles
  const container = document.querySelector("#container");
  container.style.gridTemplateColumns = `repeat(${x}, auto)`;

  // create proper amount of X x Y cells
  for (let rows = 0; rows < x; rows++)
    for (let cols = 0; cols < x; cols++) {
      const div = document.createElement("div");
      div.className = "cell";

      document.querySelector("#container").appendChild(div);
    }
}

function colorCell(element, color) {
  element.style.backgroundColor = color;
}

function refreshGrid() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < cells.length; i++) {
    const singleCell = cells[i];
    colorCell(singleCell, "white"); //colorCell function ran when looped through each individual cell and turns cell white - in other words, looped through all cells in grid and "clear" grid
  }
}

function changeGridSize() {
  const changeSizeString = prompt(
    "How many boxes per side would you like your grid to have?"
  );
  const changeSizeNumber = parseInt(changeSizeString, 10);

  // Removing previous cells before creating new sized grid.
  const container = document.querySelector("#container");

  // Make a copy of children
  const childrenCopy = [...container.children];
  const numCells = childrenCopy.length;
  for (let i = 0; i < numCells; i++) {
    const oldCell = childrenCopy[i];
    oldCell.remove();
  }

  // Create the new grid!
  createGrid(changeSizeNumber);
}

function generateRandomColor() {
  const colors = ["black", "yellow", "green", "blue", "purple", "salmon"];
  const randomDecimal = Math.random();
  const randomNumber = colors.length * randomDecimal;
  const roundedRandomWholeNumber = Math.round(randomNumber);
  const randomColor = colors[roundedRandomWholeNumber];
  return randomColor;
}

function handleMouseMove(event) {
  if (event.target.className.includes("cell")) {
    colorCell(event.target, currentColorSelection);
  }
}

function handleSelection(event, color) {
  if (!color) {
    //if color selection is not black, choose a random color
    currentColorSelection = generateRandomColor();
    return;
  }
  currentColorSelection = color;
}

// Normal program flow - top to bottom

// Create grid and setup mouse over event listeners
createGrid(16);

// Grab clear grid button and 'clear' cells (set color of each to white)
const clearButton = document.querySelector("#clearGrid");
clearButton.addEventListener("click", refreshGrid);

const changeSize = document.querySelector("#changeGridSize");
changeSize.addEventListener("click", changeGridSize);

// ~~~ Only draw on mouse drag
document.addEventListener("mousedown", () => {
  document.addEventListener("mousemove", handleMouseMove);
});

// stop coloring on mouse drag
document.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", handleMouseMove);
});

// ~~~ Handle random color selection
const randomButton = document.querySelector("#random");
randomButton.addEventListener("click", handleSelection);

// ~~~ Handle black selection
const blackButton = document.querySelector("#black");
blackButton.addEventListener("click", (e) => handleSelection(e, "black"));
