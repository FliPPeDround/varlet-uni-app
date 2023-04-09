import Chip from './Chip.mjs';
Chip.install = function (app) {
  app.component(Chip.name, Chip);
};
export { props as chipProps } from './props.mjs';
export var _ChipComponent = Chip;
export default Chip;