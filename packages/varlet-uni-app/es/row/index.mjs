import Row from './Row.mjs';
Row.install = function (app) {
  app.component(Row.name, Row);
};
export { props as rowProps } from './props.mjs';
export var _RowComponent = Row;
export default Row;