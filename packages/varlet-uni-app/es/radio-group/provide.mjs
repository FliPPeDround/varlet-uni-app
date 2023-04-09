import { useChildren } from '@varlet/use';
export var RADIO_GROUP_BIND_RADIO_KEY = Symbol('RADIO_GROUP_BIND_RADIO_KEY');
export function useRadios() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(RADIO_GROUP_BIND_RADIO_KEY);
  return {
    length,
    radios: childProviders,
    bindRadios: bindChildren
  };
}