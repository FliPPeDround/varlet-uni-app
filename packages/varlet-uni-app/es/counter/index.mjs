import Counter from './Counter.mjs';
Counter.install = function (app) {
  app.component(Counter.name, Counter);
};
export { props as counterProps } from './props.mjs';
export var _CounterComponent = Counter;
export default Counter;