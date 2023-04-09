import TabItem from './TabItem.mjs';
TabItem.install = function (app) {
  app.component(TabItem.name, TabItem);
};
export { props as tabItemProps } from './props.mjs';
export var _TabItemComponent = TabItem;
export default TabItem;