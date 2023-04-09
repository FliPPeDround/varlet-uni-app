import Collapse from './Collapse.mjs';
Collapse.install = function (app) {
  app.component(Collapse.name, Collapse);
};
export { props as collapseProps } from './props.mjs';
export var _CollapseComponent = Collapse;
export default Collapse;