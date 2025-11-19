const notas = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let acordeActual = "";

// Diccionario de acordes con digitaciones (ejemplo simple)
const acordes = {
  "C": "x32010",
  "G": "320003",
  "Am": "x02210",
  "E": "022100"
};

function mostrarAcorde() {
  acordeActual = document.getElementById("acorde").value;
  document.getElementById("resultado").innerText = "Acorde: " + acordeActual;
  dibujarDiagrama(acordeActual);
}

function transponerAcorde(pasos) {
  if (!acordeActual) return;
  // Extraer raíz (ej. C de Cmaj7)
  let raiz = acordeActual.match(/[A-G]#?/)[0];
  let index = notas.indexOf(raiz);
  let nuevaRaiz = notas[(index + pasos + notas.length) % notas.length];
  acordeActual = acordeActual.replace(raiz, nuevaRaiz);
  document.getElementById("resultado").innerText = "Acorde transpuesto: " + acordeActual;
  dibujarDiagrama(acordeActual);
}

// Dibujar diagrama simple de guitarra
function dibujarDiagrama(acorde) {
  const diagrama = document.getElementById("diagrama");
  diagrama.innerHTML = "";

  if (!acordes[acorde]) {
    diagrama.innerHTML = "<p>No tengo el diagrama de este acorde aún 🎵</p>";
    return;
  }

  const posiciones = acordes[acorde];
  let svg = `<svg width="120" height="160" xmlns="http://www.w3.org/2000/svg">`;

  // Dibujar 6 cuerdas verticales
  for (let i = 0; i < 6; i++) {
    svg += `<line x1="${20+i*20}" y1="20" x2="${20+i*20}" y2="140" stroke="black"/>`;
  }

  // Dibujar 5 trastes horizontales
  for (let j = 0; j < 5; j++) {
    svg += `<line x1="20" y1="${40+j*20}" x2="120" y2="${40+j*20}" stroke="black"/>`;
  }

  // Colocar círculos según digitación
  for (let i = 0; i < posiciones.length; i++) {
    let pos = posiciones[i];
    if (pos !== "x" && pos !== "0") {
      svg += `<circle cx="${20+i*20}" cy="${20+pos*20}" r="6" fill="red"/>`;
    }
  }

  svg += `</svg>`;
  diagrama.innerHTML = svg;
}