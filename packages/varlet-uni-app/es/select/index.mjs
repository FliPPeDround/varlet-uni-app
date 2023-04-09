import Select from './Select.mjs';
Select.install = function (app) {
  app.component(Select.name, Select);
};
export { props as selectProps } from './props.mjs';
export var _SelectComponent = Select;
export default Select;