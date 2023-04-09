import Steps from './Steps.mjs';
Steps.install = function (app) {
  app.component(Steps.name, Steps);
};
export { props as stepsProps } from './props.mjs';
export var _StepsComponent = Steps;
export default Steps;