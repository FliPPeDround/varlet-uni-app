import Loading from './Loading.mjs';
Loading.install = function (app) {
  app.component(Loading.name, Loading);
};
export { props as loadingProps } from './props.mjs';
export var _LoadingComponent = Loading;
export default Loading;