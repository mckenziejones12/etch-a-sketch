function createGrid(x) {
  // set container styles
  const container = document.querySelector("#container"); // Do I need this variable defined twice? See line 1.
  container.style.gridTemplateColumns = `repeat(${x}, auto)`;

  // create proper amount of X x Y cells
  for (let rows = 0; rows < x; rows++)
    for (var cols = 0; cols < x; cols++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.addEventListener("mouseover", colorCell);

      document.querySelector("#container").appendChild(div);
    }
}

function colorCell(event) {
  const cell = event.target;
  cell.style.backgroundColor = "black";
}

createGrid(50);
