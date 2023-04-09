import BackTop from './BackTop.mjs';
BackTop.install = function (app) {
  app.component(BackTop.name, BackTop);
};
export { props as backTopProps } from './props.mjs';
export var _BackTopComponent = BackTop;
export default BackTop;