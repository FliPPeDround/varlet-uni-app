import PullRefresh from './PullRefresh.mjs';
PullRefresh.install = function (app) {
  app.component(PullRefresh.name, PullRefresh);
};
export { props as pullRefreshProps } from './props.mjs';
export var _PullRefreshComponent = PullRefresh;
export default PullRefresh;