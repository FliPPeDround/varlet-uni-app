import Countdown from './Countdown.mjs';
Countdown.install = function (app) {
  app.component(Countdown.name, Countdown);
};
export { props as countdownProps } from './props.mjs';
export var _CountdownComponent = Countdown;
export default Countdown;