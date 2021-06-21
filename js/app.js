"use strict";


function makeGrid(form) {
  document.getElementById("mainGrid").innerHTML =
    `<table id="tableGrid">
        <tbody id="tbodyGrid"></tbody>
      </table>`;

  let table = document.getElementById("tbodyGrid");
  let x = form.cols.value;
  let y = form.rows.value;
  let buildTable = "";

  for (let i = 0; i < y; i++) {
    buildTable += `<tr id="R${i}">`;
    for (let j = 0; j < x; j++) {
      buildTable +=
        `<td id="${j}${i}"></td>`;
    }
    buildTable += `</tr>`;
  }
  table.innerHTML = buildTable;

  makeCells(x, y);

  return false;
}



function makeCells(width, height) {
  let randomDirection = 0;
  let visitedCells = 0;
  let cells = [];
  let stack = [];
  let neighbors = [];
  let nextPosition = [];
  let currentCellId;
  let lastCellId;
  let currentCell;
  let lastCell;


  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells.push([x, y]);
    }
  }
  console.log(cells);

  stack.push([...cells[0]]);
  cells[0].push(true);
  visitedCells++;

  while (visitedCells < cells.length) {
    neighbors = [];

    // Neighbors detection
    for (const element of cells) {
      // north
      if (
        element[1] === stack[stack.length - 1][1] - 1 &&
        element[0] === stack[stack.length - 1][0] &&
        !element[2]
      ) {
        neighbors.push(0);
      }
      // South
      if (
        element[1] === stack[stack.length - 1][1] + 1 &&
        element[0] === stack[stack.length - 1][0] &&
        !element[2]
      ) {
        neighbors.push(2);
      }
      // east
      if (
        element[0] === stack[stack.length - 1][0] + 1 &&
        element[1] === stack[stack.length - 1][1] &&
        !element[2]
      ) {
        neighbors.push(1);
      }
      // west
      if (
        element[0] === stack[stack.length - 1][0] - 1 &&
        element[1] === stack[stack.length - 1][1] &&
        !element[2]
      ) {
        neighbors.push(3);
      }
    }

    neighbors.length > 0 ?
      randomDirection = Math.floor(Math.random() * neighbors.length) :
      randomDirection = -1;







    function moveToTheNextCell(position1, position2, operation, direction) {
      nextPosition[0] = [...stack[stack.length - 1]];

      operation ?
        nextPosition[position1][position2]++ :
        nextPosition[position1][position2]--;

      stack.push([...nextPosition[0]]);
      visitedCells++;

      for (const element of cells) {
        if (element[0] === stack[stack.length - 1][0] && element[1] === stack[stack.length - 1][1]) {
          element.push(true);
          break;
        }
      }

      currentCellId =
        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`);
      lastCellId =
        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`);

      switch (direction) {
        case 0:
          currentCellId.style.borderBottom = "none";

          lastCellId.style.borderTop = "none";
          break;

        case 1:
          currentCellId.style.borderLeft = "none";

          lastCellId.style.borderRight = "none";
          break;
        case 2:

          currentCellId.style.borderTop = "none";

          lastCellId.style.borderBottom = "none";
          break;

        case 3:
          currentCellId.style.borderRight = "none";

          lastCellId.style.borderLeft = "none";
          break;

        default:
          break;
      }

      document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
        .style.backgroundColor = "red";

      document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
        .style.backgroundColor = "white";
    }






    // moving the character
    switch (neighbors[randomDirection]) {
      case 0:
        moveToTheNextCell(0, 1, 0, 0);
        break;

      case 1:
        moveToTheNextCell(0, 0, 1, 1);
        break;

      case 2:
        moveToTheNextCell(0, 1, 1, 2);
        break;

      case 3:
        moveToTheNextCell(0, 0, 0, 3);
        break;

      default:
        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.backgroundColor = "white";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.backgroundColor = "red";

        stack.pop();
    }
  }
}
