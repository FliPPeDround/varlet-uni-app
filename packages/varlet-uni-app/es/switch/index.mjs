import Switch from './Switch.mjs';
Switch.install = function (app) {
  app.component(Switch.name, Switch);
};
export { props as switchProps } from './props.mjs';
export var _SwitchComponent = Switch;
export default Switch;