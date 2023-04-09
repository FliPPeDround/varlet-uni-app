import Step from './Step.mjs';
Step.install = function (app) {
  app.component(Step.name, Step);
};
export { props as stepProps } from './props.mjs';
export var _StepComponent = Step;
export default Step;