import { useParent } from '@varlet/use';
import { BUTTON_GROUP_BIND_BUTTON_KEY } from '../button-group/provide.mjs';
export function useButtonGroup() {
  var {
    bindParent,
    parentProvider,
    index
  } = useParent(BUTTON_GROUP_BIND_BUTTON_KEY);
  return {
    index,
    buttonGroup: parentProvider,
    bindButtonGroup: bindParent
  };
}