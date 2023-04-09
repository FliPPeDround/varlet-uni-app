import Skeleton from './Skeleton.mjs';
Skeleton.install = function (app) {
  app.component(Skeleton.name, Skeleton);
};
export { props as skeletonProps } from './props.mjs';
export var _SkeletonComponent = Skeleton;
export default Skeleton;