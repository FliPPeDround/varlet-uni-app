import Overlay from './Overlay.mjs';
Overlay.install = function (app) {
  app.component(Overlay.name, Overlay);
};
export { props as overlayProps } from './props.mjs';
export var _OverlayComponent = Overlay;
export default Overlay;