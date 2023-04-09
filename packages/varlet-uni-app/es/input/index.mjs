import Input from './Input.mjs';
Input.install = function (app) {
  app.component(Input.name, Input);
};
export { props as inputProps } from './props.mjs';
export var _InputComponent = Input;
export default Input;