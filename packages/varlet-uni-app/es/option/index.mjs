import Option from './Option.mjs';
Option.install = function (app) {
  app.component(Option.name, Option);
};
export { props as optionProps } from './props.mjs';
export var _OptionComponent = Option;
export default Option;