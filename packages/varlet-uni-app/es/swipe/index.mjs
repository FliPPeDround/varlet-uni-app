import Swipe from './Swipe.mjs';
Swipe.install = function (app) {
  app.component(Swipe.name, Swipe);
};
export { props as swipeProps } from './props.mjs';
export var _SwipeComponent = Swipe;
export default Swipe;