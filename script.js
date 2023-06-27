let fields = [
    null,
    'x',
    null,
    'o',
    'o',
    'o',
    null,
    null,
    'x'
  ];

function init(){
    render();
}

function render() {
    const container = document.getElementById('container');
    const symbols = ['o', 'x']; // Symbole für Kreis und Kreuz
    let tableHTML = '<table>'; // HTML-Code für die Tabelle
   
    for (let i = 0; i < 3; i++) {
      tableHTML += '<tr>'; // Neue Tabellenzeile erstellen
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j; // Index im "fields"-Array berechnen
        const symbol = fields[index]  ; // Symbol für das Feld abrufen
        
        // tableHTML += `<td>${symbol}</td>`; 
        // Zelleninhalt hinzufügen

        tableHTML += `<td class="${symbol}">${symbol}</td>`;
      }
      tableHTML += '</tr>'; // Tabellenzeile abschließen
    }
    
    tableHTML += '</table>'; // Tabelle abschließen
    
    container.innerHTML = tableHTML; // HTML-Code in den Container einfügen
  }
  