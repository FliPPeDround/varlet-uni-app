import Popup from './Popup.mjs';
Popup.install = function (app) {
  app.component(Popup.name, Popup);
};
export { props as popupProps } from './props.mjs';
export var _PopupComponent = Popup;
export default Popup;