import Cell from './Cell.mjs';
Cell.install = function (app) {
  app.component(Cell.name, Cell);
};
export { props as cellProps } from './props.mjs';
export var _CellComponent = Cell;
export default Cell;