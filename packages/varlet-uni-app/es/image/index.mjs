import Image from './Image.mjs';
Image.install = function (app) {
  app.component(Image.name, Image);
};
export { props as imageProps } from './props.mjs';
export var _ImageComponent = Image;
export default Image;