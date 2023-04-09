import Tabs from './Tabs.mjs';
Tabs.install = function (app) {
  app.component(Tabs.name, Tabs);
};
export { props as tabsProps } from './props.mjs';
export var _TabsComponent = Tabs;
export default Tabs;