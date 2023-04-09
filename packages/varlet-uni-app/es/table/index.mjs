import Table from './Table.mjs';
Table.install = function (app) {
  app.component(Table.name, Table);
};
export { props as tableProps } from './props.mjs';
export var _TableComponent = Table;
export default Table;