import { useChildren } from '@varlet/use';
export var BUTTON_GROUP_BIND_BUTTON_KEY = Symbol('BUTTON_GROUP_BIND_BUTTON_KEY');
export function useButtons() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(BUTTON_GROUP_BIND_BUTTON_KEY);
  return {
    length,
    buttons: childProviders,
    bindButtons: bindChildren
  };
}