import Breadcrumb from './Breadcrumb.mjs';
Breadcrumb.install = function (app) {
  app.component(Breadcrumb.name, Breadcrumb);
};
export { props as breadcrumbProps } from './props.mjs';
export var _BreadcrumbComponent = Breadcrumb;
export default Breadcrumb;