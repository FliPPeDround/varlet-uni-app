import Checkbox from './Checkbox.mjs';
Checkbox.install = function (app) {
  app.component(Checkbox.name, Checkbox);
};
export { props as checkboxProps } from './props.mjs';
export var _CheckboxComponent = Checkbox;
export default Checkbox;