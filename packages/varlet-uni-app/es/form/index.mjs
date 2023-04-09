import Form from './Form.mjs';
import { useValidation } from '../utils/components.mjs';
import { useForm } from './provide.mjs';
Form.install = function (app) {
  app.component(Form.name, Form);
};
Form.useValidation = useValidation;
Form.useForm = useForm;
export { props as formProps } from './props.mjs';
export var _FormComponent = Form;
export default Form;