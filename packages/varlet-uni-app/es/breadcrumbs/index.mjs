import Breadcrumbs from './Breadcrumbs.mjs';
Breadcrumbs.install = function (app) {
  app.component(Breadcrumbs.name, Breadcrumbs);
};
export { props as breadcrumbsProps } from './props.mjs';
export var _BreadcrumbsComponent = Breadcrumbs;
export default Breadcrumbs;