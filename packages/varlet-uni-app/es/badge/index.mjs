import Badge from './Badge.mjs';
Badge.install = function (app) {
  app.component(Badge.name, Badge);
};
export { props as badgeProps } from './props.mjs';
export var _BadgeComponent = Badge;
export default Badge;