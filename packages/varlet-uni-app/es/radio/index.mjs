import Radio from './Radio.mjs';
Radio.install = function (app) {
  app.component(Radio.name, Radio);
};
export { props as radioProps } from './props.mjs';
export var _RadioComponent = Radio;
export default Radio;