import HoverOverlay from './HoverOverlay.mjs';
import { ref } from 'vue';
HoverOverlay.install = function (app) {
  app.component(HoverOverlay.name, HoverOverlay);
};
export function useHoverOverlay() {
  var hovering = ref(false);
  var handleHovering = value => {
    hovering.value = value;
  };
  return {
    hovering,
    handleHovering
  };
}
export var _HoverOverlayComponent = HoverOverlay;
export default HoverOverlay;