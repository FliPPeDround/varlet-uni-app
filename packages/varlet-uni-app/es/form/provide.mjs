function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useChildren, useParent } from '@varlet/use';
import { getCurrentInstance } from 'vue';
export var FORM_BIND_FORM_ITEM_KEY = Symbol('FORM_BIND_FORM_ITEM_KEY');
export function useForm() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(FORM_BIND_FORM_ITEM_KEY);
  var instance = getCurrentInstance();
  var bindForm = bindParent ? formItemProvider => {
    bindParent(_extends({}, formItemProvider, {
      instance
    }));
  } : null;
  return {
    index,
    form: parentProvider,
    bindForm
  };
}
export function useFormItems() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(FORM_BIND_FORM_ITEM_KEY);
  return {
    length,
    formItems: childProviders,
    bindFormItems: bindChildren
  };
}