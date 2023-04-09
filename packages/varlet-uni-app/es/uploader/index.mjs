import Uploader from './Uploader.mjs';
Uploader.install = function (app) {
  app.component(Uploader.name, Uploader);
};
export { props as uploaderProps } from './props.mjs';
export var _UploaderComponent = Uploader;
export default Uploader;