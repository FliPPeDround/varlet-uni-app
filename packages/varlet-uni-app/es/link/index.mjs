import Link from './Link.mjs';
Link.install = function (app) {
  app.component(Link.name, Link);
};
export { props as linkProps } from './props.mjs';
export var _LinkComponent = Link;
export default Link;