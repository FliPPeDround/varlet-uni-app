import CollapseItem from './CollapseItem.mjs';
CollapseItem.install = function (app) {
  app.component(CollapseItem.name, CollapseItem);
};
export { props as collapseItemProps } from './props.mjs';
export var _CollapseItemComponent = CollapseItem;
export default CollapseItem;