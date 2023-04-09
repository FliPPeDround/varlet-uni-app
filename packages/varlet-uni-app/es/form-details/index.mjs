import FormDetails from './FormDetails.mjs';
FormDetails.install = function (app) {
  app.component(FormDetails.name, FormDetails);
};
export { props as formDetailsProps } from './props.mjs';
export var _FormDetailsComponent = FormDetails;
export default FormDetails;