import Result from './Result.mjs';
Result.install = function (app) {
  app.component(Result.name, Result);
};
export { props as resultProps } from './props.mjs';
export var _ResultComponent = Result;
export default Result;