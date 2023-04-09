import Tooltip from './Tooltip.mjs';
Tooltip.install = function (app) {
  app.component(Tooltip.name, Tooltip);
};
export { props as tooltipProps } from './props.mjs';
export var _TooltipComponent = Tooltip;
export default Tooltip;