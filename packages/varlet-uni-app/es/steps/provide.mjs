import { useChildren } from '@varlet/use';
export var STEPS_BIND_STEP_KEY = Symbol('STEPS_BIND_STEP_KEY');
export function useStep() {
  var {
    bindChildren,
    length,
    childProviders
  } = useChildren(STEPS_BIND_STEP_KEY);
  return {
    length,
    step: childProviders,
    bindStep: bindChildren
  };
}