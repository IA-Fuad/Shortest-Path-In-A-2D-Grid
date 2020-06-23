let row, col;
let checkClick = false;

document.querySelector("#submitGrid").addEventListener("click", generateGrid);

//document.querySelector("#submitPath").addEventListener("click", findPath);

document.querySelector("#sg").addEventListener("click", startAndGoal);

function generateGrid() {
  let grid = document.getElementById("grid");

  if (grid.innerHTML != "") {
    grid.innerHTML = "";
  }

  document.getElementById('instruction').innerHTML = "Click on the cells to create obstacle. Click and Hold to create multiple obstacle at once";

  row = document.getElementById("row").value;
  col = document.getElementById("col").value;
  let w = col * 10 + col * 2;
  grid.style.width = w + "px";

  for (let i = 0, j = 0, k = 0; i < row * col; i++, k++) {
    if (k == col){
      j++;
      k = 0;
    }
    let x = document.createElement("div");
    x.setAttribute(
      "style",
      "background: red; width: 10px; height: 10px; border: 1px solid black; margin: 0px; padding: 0px"
    );
    let cellID = j + " " + k;
    x.setAttribute("id", cellID);
    x.setAttribute("class", "cell");
    x.addEventListener("mousedown", changeColor);
    x.addEventListener("mouseover", changeColor2);
    x.addEventListener("mouseup", stopChanging);
    grid.appendChild(x);
  }
}

function changeColor() {
  let xx = (row - 1) + " " + (col - 1);
  if (this.id === '0 0' || this.id === xx){
    return;
  }
  this["style"]["background"] = "green";
  console.log(this.id);
  if (checkClick == false){
    checkClick = true;
  }
  else {
    checkClick = false;
  }
}

function changeColor2() {
  let xx = (row - 1) + " " + (col - 1);
  if (checkClick === false || this.id === '0 0' || this.id === xx){
    return;
  }
  this["style"]["background"] = "green";
  console.log(this.id);
}

function stopChanging() {
  checkClick = false;
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let dx = [0, 0, 1, -1];
let dy = [1, -1, 0, 0];

async function findPath() {
  let queue = [];
  let parent = {};
  let vis = [];
  queue.push([0, 0, 0]);
  parent[0+" "+0] = 0+" "+0;
  vis[[0, 0]] = true;

  while (queue.length > 0){
    let u = queue.shift();
    for (let k=0; k<4; k++){
      let i = u[0] + dx[k];
      let j = u[1] + dy[k];
      let cellID = i + " " + j;
      let cell = document.getElementById(cellID);
      
      if (i == row || j == col || i < 0 || j < 0 || vis[[i, j]] || cell.style.background == 'green'){
        continue;
      }

      document.getElementById(cellID).style.background = 'white';

      queue.push([i, j, u[2]+1]);
      parent[cellID] = u[0] + " " + u[1];
      vis[[i, j]] = true;

      if (i == row-1 && j == col-1){
        
        break;
      }
    }

    await sleep(10);
  }

  let cellID = (row-1) + " " + (col-1);
  console.log(parent[cellID], parent[0+" "+0]);
  while (parent[cellID] != cellID){
    document.getElementById(cellID).style.background = 'orange';
    cellID = parent[cellID];
    console.log(cellID, parent[cellID]);
   // console.log(parent[cellID]);
  }
}


function startAndGoal() {
  alert("Click on any two free cells to select Start and Goal. First clicked cell will be Start and Second clicked cell will be Goal.");

  findPath();
}