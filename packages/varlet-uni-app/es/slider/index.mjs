import Slider from './Slider.mjs';
Slider.install = function (app) {
  app.component(Slider.name, Slider);
};
export { props as sliderProps } from './props.mjs';
export var _SliderComponent = Slider;
export default Slider;