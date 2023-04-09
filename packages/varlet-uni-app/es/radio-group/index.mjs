import RadioGroup from './RadioGroup.mjs';
RadioGroup.install = function (app) {
  app.component(RadioGroup.name, RadioGroup);
};
export { props as radioGroupProps } from './props.mjs';
export var _RadioGroupComponent = RadioGroup;
export default RadioGroup;