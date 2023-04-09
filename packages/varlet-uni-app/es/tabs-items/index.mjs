import TabsItems from './TabsItems.mjs';
TabsItems.install = function (app) {
  app.component(TabsItems.name, TabsItems);
};
export { props as tabsItemsProps } from './props.mjs';
export var _TabsItemsComponent = TabsItems;
export default TabsItems;