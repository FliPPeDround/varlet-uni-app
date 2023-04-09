import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { SELECT_BIND_OPTION_KEY } from '../select/provide.mjs';
export function useSelect() {
  var {
    index,
    parentProvider,
    bindParent
  } = useParent(SELECT_BIND_OPTION_KEY);
  if (!bindParent) {
    error('Option', '<var-option/> must in <var-select/>');
  }
  return {
    index,
    select: parentProvider,
    bindSelect: bindParent
  };
}