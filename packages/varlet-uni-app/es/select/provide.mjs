import { useChildren } from '@varlet/use';
export var SELECT_BIND_OPTION_KEY = Symbol('SELECT_BIND_OPTION_KEY');
export function useOptions() {
  var {
    length,
    childProviders,
    bindChildren
  } = useChildren(SELECT_BIND_OPTION_KEY);
  return {
    length,
    options: childProviders,
    bindOptions: bindChildren
  };
}