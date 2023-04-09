import Icon from './Icon.mjs';
Icon.install = function (app) {
  app.component(Icon.name, Icon);
};
export { props as iconProps } from './props.mjs';
export var _IconComponent = Icon;
export default Icon;