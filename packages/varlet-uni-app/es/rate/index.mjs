import Rate from './Rate.mjs';
Rate.install = function (app) {
  app.component(Rate.name, Rate);
};
export { props as rateProps } from './props.mjs';
export var _RateComponent = Rate;
export default Rate;