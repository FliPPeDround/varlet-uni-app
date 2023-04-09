import BottomNavigationItem from './BottomNavigationItem.mjs';
BottomNavigationItem.install = function (app) {
  app.component(BottomNavigationItem.name, BottomNavigationItem);
};
export { props as bottomNavigationItemProps } from './props.mjs';
export var _BottomNavigationItemComponent = BottomNavigationItem;
export default BottomNavigationItem;