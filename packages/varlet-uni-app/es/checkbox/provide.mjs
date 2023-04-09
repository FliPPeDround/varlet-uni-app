import { useParent } from '@varlet/use';
import { CHECKBOX_GROUP_BIND_CHECKBOX_KEY } from '../checkbox-group/provide.mjs';
export function useCheckboxGroup() {
  var {
    bindParent,
    parentProvider,
    index
  } = useParent(CHECKBOX_GROUP_BIND_CHECKBOX_KEY);
  return {
    index,
    checkboxGroup: parentProvider,
    bindCheckboxGroup: bindParent
  };
}