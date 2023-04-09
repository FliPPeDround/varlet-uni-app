export function half(value) {
  return "calc(" + value + " / 2)";
}
export function computeMargin(y, x, options) {
  var {
    direction,
    justify,
    index,
    lastIndex
  } = options;
  var margin = '0';
  if (direction === 'row') {
    if (['flex-start', 'center', 'flex-end', 'start', 'end'].includes(justify)) {
      if (index !== lastIndex) {
        margin = half(y) + " " + x + " " + half(y) + " 0";
      } else {
        margin = half(y) + " 0";
      }
    } else if (justify === 'space-around') {
      margin = half(y) + " " + half(x);
    } else if (justify === 'space-between') {
      if (index === 0) {
        margin = half(y) + " " + half(x) + " " + half(y) + " 0";
      } else if (index === lastIndex) {
        margin = half(y) + " 0 " + half(y) + " " + half(x);
      } else {
        margin = half(y) + " " + half(x);
      }
    }
  }
  if (direction === 'column' && index !== lastIndex) {
    margin = "0 0 " + y + " 0";
  }
  return margin;
}