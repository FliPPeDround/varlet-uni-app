import { useChildren } from '@varlet/use';
export var CHECKBOX_GROUP_BIND_CHECKBOX_KEY = Symbol('CHECKBOX_GROUP_BIND_CHECKBOX_KEY');
export function useCheckboxes() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(CHECKBOX_GROUP_BIND_CHECKBOX_KEY);
  return {
    length,
    checkboxes: childProviders,
    bindCheckboxes: bindChildren
  };
}