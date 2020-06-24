let row, col;
let checkClick = false;
let selectPath = -1;
let start, goal;

document.querySelector("#submitGrid").addEventListener("click", generateGrid);

document.querySelector("#findPath").addEventListener("click", findPath);

document.querySelector("#sg").addEventListener("click", startAndGoal);

function generateGrid() {
  let grid = document.getElementById("grid");
  selectPath = -1, start = "", goal = "";

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
  if (this.id === start || this.id === goal || selectPath == -1) {
    return;
  }
  if (selectPath == 1){
    this["style"]["background"] = "yellow";
    start = this.id;
    selectPath++;
  }
  else if (selectPath == 2){
    this["style"]["background"] = "blue";
    goal = this.id;
    selectPath = 0;
    alert("Now you can draw obstacle on the grid");
  }
  else{
    this["style"]["background"] = "green";
    console.log(this.id);
    if (checkClick == false) {
      checkClick = true;
    }
    else {
      checkClick = false;
    }
  }
}

function changeColor2() {
  if (selectPath != 0 || checkClick === false || this.id === start || this.id === goal){
    return;
  }
  this["style"]["background"] = "green";
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
  if (start == "" || goal == ""){
    return;
  }
  let queue = [];
  let parent = {};
  let vis = [];
  let s = start.split(" ");
  let g = goal.split(" ");
  let si = parseInt(s[0]), sj = parseInt(s[1]);
  let gi = parseInt(g[0]), gj = parseInt(g[1]);
  queue.push([si, sj, 0]);
  parent[si+" "+sj] = si+" "+sj;
  vis[[si, sj]] = true;

  let flag = true;
  while (queue.length > 0 && flag){
    let u = queue.shift();
    for (let k=0; k<4; k++){
      let i = u[0] + dx[k];
      let j = u[1] + dy[k];
      let cellID = i + " " + j;
      let cell = document.getElementById(cellID);
      
      if (i == row || j == col || i < 0 || j < 0 || vis[[i, j]] || cell.style.background == 'green'){
        continue;
      }

      queue.push([i, j, u[2]+1]);
      parent[cellID] = u[0] + " " + u[1];
      vis[[i, j]] = true;

      if (i == gi && j == gj){
        console.log('hello');
        flag = false;
        break;
      }

      document.getElementById(cellID).style.background = 'white';
    }

    await sleep(10);
  }

  if (flag){
    alert("No path found!");
  }
  let cellID = goal;
  while (true){
    cellID = parent[cellID];
    if (cellID == start){
      break;
    }
    document.getElementById(cellID).style.background = 'orange';
  }
}


function startAndGoal() {
  alert("Click on any two free cells to select Start and Goal. First clicked cell will be Start and Second clicked cell will be Goal.");

  selectPath = 1;
}