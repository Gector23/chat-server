const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const colors = [
  ['#f44336', '#d32f2f', '#b71c1c'],
  ['#e91e63', '#c2185b', '#880e4f'],
  ['#9c27b0', '#7b1fa2', '#4a148c'],
  ['#673ab7', '#512da8', '#311b92'],
  ['#3f51b5', '#303f9f', '#1a237e'],
  ['#2196f3', '#1976d2', '#0d47a1'],
  ['#009688', '#00796b', '#004d40'],
  ['#4caf50', '#388e3c', '#1b5e20'],
  ['#ffeb3b', '#fbc02d', '#f57f17'],
  ['#ff9800', '#f57c00', '#e65100'],
];

exports.getColor = () => colors[randomInteger(0, 9)][randomInteger(0, 2)];
