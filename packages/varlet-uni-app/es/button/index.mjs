import Button from './Button.mjs';
Button.install = function (app) {
  app.component(Button.name, Button);
};
export { props as buttonProps } from './props.mjs';
export var _ButtonComponent = Button;
export default Button;