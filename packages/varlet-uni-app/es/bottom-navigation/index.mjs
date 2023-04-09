import BottomNavigation from './BottomNavigation.mjs';
BottomNavigation.install = function (app) {
  app.component(BottomNavigation.name, BottomNavigation);
};
export { props as bottomNavigationProps } from './props.mjs';
export var _BottomNavigationComponent = BottomNavigation;
export default BottomNavigation;