import Space from './Space.mjs';
Space.install = function (app) {
  app.component(Space.name, Space);
};
export { props as spaceProps } from './props.mjs';
export var _SpaceComponent = Space;
export default Space;