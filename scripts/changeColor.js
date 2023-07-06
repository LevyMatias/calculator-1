const buttons = document.querySelectorAll('.calculator__buttons > button');

function changeRowColor(rowNumber, color) {
    buttons.forEach((button, index) => {
        const rowIndex = Math.floor(index / 4) + 1;
        if (rowIndex === rowNumber) {
            button.style.backgroundColor = color;
            button.style.color = '#ababab'
            button.classList.add('scale');
            
        }
    });
}
changeRowColor(1, '#193543');

function changeColumnColor(columnNumber, color) {
    buttons.forEach((button, index) => {
        const columnIndex = (index % 4) + 1;
        if (columnIndex === columnNumber) {
            button.style.backgroundColor = color;
            button.style.color = '#ababab'
            button.classList.add('scale');
        }
    });
}
changeColumnColor(4, '#193543');