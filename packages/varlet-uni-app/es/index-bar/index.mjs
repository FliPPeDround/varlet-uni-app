import IndexBar from './IndexBar.mjs';
IndexBar.install = function (app) {
  app.component(IndexBar.name, IndexBar);
};
export { props as indexBarProps } from './props.mjs';
export var _IndexBarComponent = IndexBar;
export default IndexBar;