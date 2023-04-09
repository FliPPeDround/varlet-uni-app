import Paper from './Paper.mjs';
Paper.install = function (app) {
  app.component(Paper.name, Paper);
};
export { props as paperProps } from './props.mjs';
export var _PaperComponent = Paper;
export default Paper;