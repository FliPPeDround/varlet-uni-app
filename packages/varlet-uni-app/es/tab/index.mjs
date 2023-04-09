import Tab from './Tab.mjs';
Tab.install = function (app) {
  app.component(Tab.name, Tab);
};
export { props as tabProps } from './props.mjs';
export var _TabComponent = Tab;
export default Tab;