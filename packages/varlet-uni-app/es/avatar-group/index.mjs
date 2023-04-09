import AvatarGroup from './AvatarGroup.mjs';
AvatarGroup.install = function (app) {
  app.component(AvatarGroup.name, AvatarGroup);
};
export { props as avatarGroupProps } from './props.mjs';
export var _AvatarGroupComponent = AvatarGroup;
export default AvatarGroup;