import Pagination from './Pagination.mjs';
Pagination.install = function (app) {
  app.component(Pagination.name, Pagination);
};
export { props as paginationProps } from './props.mjs';
export var _PaginationComponent = Pagination;
export default Pagination;