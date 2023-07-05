let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

let currentSymbol = 'circle'; // Startsymbol festlegen
let audio_sucess = new Audio('sounds/wingame.mp3');
let audio_fail = new Audio('sounds/gameover.mp3');


function init() {
  render();
}

function render() {
  const container = document.getElementById('container');
  let tableHTML = '<table>';
  let fieldIndex = 0;

  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';

    for (let j = 0; j < 3; j++) {
      tableHTML += `<td onclick="handleCellClick(${fieldIndex})">`;

      if (fields[fieldIndex] === 'kreuz') {
        tableHTML += generateCrossSVG();
      } else if (fields[fieldIndex] === 'circle') {
        tableHTML += generateCircleSVG();
      }

      tableHTML += '</td>';
      fieldIndex++;
    }

    tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  container.innerHTML = tableHTML;
}

function handleCellClick(index) {
  const cell = document.getElementsByTagName("td")[index];
  const symbol = currentSymbol;
  currentSymbol = currentSymbol === 'circle' ? 'kreuz' : 'circle';
  fields[index] = symbol;
  const svgCode = symbol === "circle" ? generateCircleSVG() : generateCrossSVG();
  cell.innerHTML = svgCode;
  cell.onclick = null;


  if (checkWin()) {
    // Ein Spieler hat gewonnen
    // Deaktiviere alle restlichen Zellen
    const cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
      cells[i].onclick = null;
    }

    drawWinningLine(getWinningCondition());
    document.getElementById('players').style.display = 'none';
    document.getElementById('winner-container').style.display = 'block';
    document.getElementById('winner-text').textContent = `${symbol} hat gewonnen!`;
    audio_sucess.play();
    console.log('Spieler hat gewonnen!');
  }
  else if (isGameOver()) {
    // Spiel ist zu Ende, kein Spieler hat gewonnen
    const cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
      cells[i].onclick = null;
    }
    document.getElementById('players').style.display = 'none';
    document.getElementById('winner-container').style.display = 'block';
    document.getElementById('winner-text').textContent = `Spiel ist zu Ende, kein Spieler hat gewonnen!`;
    audio_fail.play();
  }
}


function isGameOver() {
  // Überprüfe, ob alle Felder belegt sind
  for (const field of fields) {
    if (field === null) {
      return false; // Es gibt noch leere Felder, das Spiel ist noch nicht zu Ende
    }
  }
  return true; // Alle Felder sind belegt, das Spiel ist zu Ende
}

function getWinningCondition() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontale Reihen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikale Reihen
    [0, 4, 8], [2, 4, 6] // diagonale Reihen
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return condition;
    }
  }
  return null;
}


function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontale Reihen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikale Reihen
    [0, 4, 8], [2, 4, 6] // diagonale Reihen
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      // Ein Spieler hat gewonnen
      return true;
    }
  }

  return false;
}

function drawWinningLine(condition) {
  const container = document.getElementById('container');
  const line = document.createElement('div');
  line.classList.add('winning-line');

  const [a, b, c] = condition;
  const cellSize = 100; // Größe einer Zelle in Pixeln
  const margin = 5; // Abstand zwischen den Zellen in Pixeln

  const x1 = (a % 3) * (cellSize + margin) + cellSize / 2;
  const y1 = Math.floor(a / 3) * (cellSize + margin) + cellSize / 2;
  const x2 = (c % 3) * (cellSize + margin) + cellSize / 2;
  const y2 = Math.floor(c / 3) * (cellSize + margin) + cellSize / 2;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1);

  line.style.width = length + 'px';
  line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}rad)`;

  container.appendChild(line);
}


// function drawWinningLine(condition) {
//   const container = document.getElementById('container');
//   const line = document.createElement('div');
//   line.classList.add('winning-line');
//   const [a, b, c] = condition;

//   if (a === 0 && b === 1 && c === 2) {
//     line.style.transform = 'translate(0, -33%) rotate(90deg)';
//   } else if (a === 3 && b === 4 && c === 5) {
//     line.style.transform = 'rotate(90deg)';
//   } else if (a === 6 && b === 7 && c === 8) {
//     line.style.transform = 'translate(0, 33%) rotate(90deg)';
//   } else if (a === 0 && b === 3 && c === 6) {
//     line.style.transform = 'translate(-3400%, 0) rotate(0deg)';
//   } else if (a === 1 && b === 4 && c === 7) {
//     line.style.transform = 'rotate(0deg)';
//   } else if (a === 2 && b === 5 && c === 8) {
//     line.style.transform = 'translate(3400%, 0) rotate(0deg)';
//   } else if (a === 0 && b === 4 && c === 8) {
//     line.style.transform = 'rotate(-45deg)';
//   } else if (a === 2 && b === 4 && c === 6) {
//     line.style.transform = 'rotate(45deg)';
//   }

//   container.appendChild(line);
// }

function restartGame() {
  fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  render();
}




////////////////////
// Generate Circle /
////////////////////

function generateCircleSVG() {
  const color = "#23789b";
  const animationDuration = "0.2s";

  const svgCode = `
    <svg viewBox="0 0 70 70" width="70" height="70">
      <circle cx="35" cy="35" r="30" fill="none" stroke="${color}" stroke-width="5">
        <animate attributeName="stroke-dasharray" from="0, 188.4955592153876" to="188.4955592153876, 0" dur="${animationDuration}" fill="freeze" />
      </circle>
    </svg>
  `;

  return svgCode;
}

////////////////////
// Generate Kreuz /
////////////////////

function generateCrossSVG() {
  const color = "#fdc000";
  const animationDuration = "200ms";

  const svgCode = `
    <svg viewBox="0 0 50 50" width="90" height="90">
      <line x1="10" y1="10" x2="40" y2="40" stroke="${color}" stroke-width="3">
        <animate attributeName="x1" from="10" to="40" dur="${animationDuration}" fill="freeze" />
        <animate attributeName="y1" from="10" to="40" dur="${animationDuration}" fill="freeze" />
        <animate attributeName="x2" from="40" to="10" dur="${animationDuration}" fill="freeze" />
        <animate attributeName="y2" from="40" to="10" dur="${animationDuration}" fill="freeze" />
      </line>
      <line x1="40" y1="10" x2="10" y2="40" stroke="${color}" stroke-width="3">
        <animate attributeName="x1" from="40" to="10" dur="${animationDuration}" fill="freeze" />
        <animate attributeName="y1" from="10" to="40" dur="${animationDuration}" fill="freeze" />
        <animate attributeName="x2" from="10" to="40" dur="${animationDuration}" fill="freeze" />
        <animate attributeName="y2" from="40" to="10" dur="${animationDuration}" fill="freeze" />
      </line>
    </svg>
  `;

  return svgCode;
}
