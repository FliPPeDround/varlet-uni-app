import Progress from './Progress.mjs';
Progress.install = function (app) {
  app.component(Progress.name, Progress);
};
export { props as progressProps } from './props.mjs';
export var _ProgressComponent = Progress;
export default Progress;