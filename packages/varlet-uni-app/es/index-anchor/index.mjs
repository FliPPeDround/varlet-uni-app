import IndexAnchor from './IndexAnchor.mjs';
IndexAnchor.install = function (app) {
  app.component(IndexAnchor.name, IndexAnchor);
};
export { props as indexAnchorProps } from './props.mjs';
export var _IndexAnchorComponent = IndexAnchor;
export default IndexAnchor;