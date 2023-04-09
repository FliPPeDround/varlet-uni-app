import List from './List.mjs';
List.install = function (app) {
  app.component(List.name, List);
};
export { props as listProps } from './props.mjs';
export var _ListComponent = List;
export default List;