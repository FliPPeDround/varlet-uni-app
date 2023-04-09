import AppBar from './AppBar.mjs';
AppBar.install = function (app) {
  app.component(AppBar.name, AppBar);
};
export { props as appBarProps } from './props.mjs';
export var _AppBarComponent = AppBar;
export default AppBar;