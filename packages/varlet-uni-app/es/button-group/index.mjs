// Component entry, the folder where the file exists will be exposed to the user
import ButtonGroup from './ButtonGroup.mjs';
ButtonGroup.install = function (app) {
  app.component(ButtonGroup.name, ButtonGroup);
};
export var _ButtonGroupComponent = ButtonGroup;
export default ButtonGroup;