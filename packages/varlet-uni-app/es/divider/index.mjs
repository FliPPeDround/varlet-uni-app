import Divider from './Divider.mjs';
Divider.install = function (app) {
  app.component(Divider.name, Divider);
};
export { props as dividerProps } from './props.mjs';
export var _DividerComponent = Divider;
export default Divider;