import Sticky from './Sticky.mjs';
Sticky.install = function (app) {
  app.component(Sticky.name, Sticky);
};
export { props as stickyProps } from './props.mjs';
export var _StickyComponent = Sticky;
export default Sticky;