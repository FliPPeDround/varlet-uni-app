import Col from './Col.mjs';
Col.install = function (app) {
  app.component(Col.name, Col);
};
export { props as colProps } from './props.mjs';
export var _ColComponent = Col;
export default Col;