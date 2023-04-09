import Menu from './Menu.mjs';
Menu.install = function (app) {
  app.component(Menu.name, Menu);
};
export { props as menuProps } from './props.mjs';
export var _MenuComponent = Menu;
export default Menu;