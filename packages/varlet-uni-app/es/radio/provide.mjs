import { useParent } from '@varlet/use';
import { RADIO_GROUP_BIND_RADIO_KEY } from '../radio-group/provide.mjs';
export function useRadioGroup() {
  var {
    bindParent,
    parentProvider,
    index
  } = useParent(RADIO_GROUP_BIND_RADIO_KEY);
  return {
    index,
    radioGroup: parentProvider,
    bindRadioGroup: bindParent
  };
}