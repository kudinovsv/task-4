const table = document.getElementById('table');

(function fillTable() {
// заполнение таблицы ячейками

  // формирование HTML строк со 2-ю по 9-ю
  let content = '';
  for (let i = 0; i < 8; i += 1) { // цикл по сторкам
    // сначала формируем HTML ячеек td в строке
    let tds = '';
    for (let j = 0; j < 8; j += 1) { // цикл по ячейкам в строке
      tds = `${tds}<td id="${i}${j}"></td>`; // каждой ячейке присваивем id c её кооридинатами
    }

    const th = `<th>${8 - i}</th>`;
    // оборамляем наши td th-ами и заворачиваем в tr
    content = `${content}<tr>${th}${tds}${th}</tr>`;
  }

  // формируем HTML для 1-ой и 10-ой строки таблицы, они будут состоять из одних th
  let header = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''].map(s => `<th>${s}</th>`).join('');
  header = `<tr>${header}</tr>`;
  table.innerHTML = `${header}${content}${header}`;
}());

// все потенциально возможные ходы коня
const moves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

/**
 * массив DOM-элементов перекрашенных ячеек на прошлом клике.
 * первым элементом сохраняется ячейка по которой был клик
 */
let recoloredCells = [];

const tableClick = function tableClick({ target }) {
// обработчик клика по таблице

  // клик не по td или клик по тому же td что и в прошлый раз не интересуют
  if (target.tagName !== 'TD' || target === recoloredCells[0]) return;

  // возвращаем цвета по умолчанию всем ячейкам перекршенным на прошлом клике
  recoloredCells.forEach((td) => { td.style.backgroundColor = ''; });

  target.style.backgroundColor = 'blue';
  recoloredCells = [target];

  // получаем координаты ячейки по которой кликнули из её id
  const [targetRow, targetCol] = [...target.id].map(coord => Number(coord));

  /**
   * формируем массив координат возможных ходов коня, и затем отбрасываем ячейки
   * выходящие за границы поля
   */
  const positions = moves
    .map(([x, y]) => ({ row: targetRow + y, col: targetCol + x }))
    .filter(coords => Object.values(coords).every(coord => (coord >= 0 && coord <= 7)));

  // перекрашиваем полученные ячейки и добавляем их в recoloredCells
  positions.forEach(({ row, col }) => {
    const td = document.getElementById(`${row}${col}`);
    td.style.backgroundColor = '#12c329';
    recoloredCells.push(td);
  });
};

table.addEventListener('click', tableClick);
