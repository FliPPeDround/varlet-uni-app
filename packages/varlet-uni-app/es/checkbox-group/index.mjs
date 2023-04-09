import CheckboxGroup from './CheckboxGroup.mjs';
CheckboxGroup.install = function (app) {
  app.component(CheckboxGroup.name, CheckboxGroup);
};
export { props as checkboxGroupProps } from './props.mjs';
export var _CheckboxGroupComponent = CheckboxGroup;
export default CheckboxGroup;