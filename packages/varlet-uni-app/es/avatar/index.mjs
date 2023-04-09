import Avatar from './Avatar.mjs';
Avatar.install = function (app) {
  app.component(Avatar.name, Avatar);
};
export { props as avatarProps } from './props.mjs';
export var _AvatarComponent = Avatar;
export default Avatar;