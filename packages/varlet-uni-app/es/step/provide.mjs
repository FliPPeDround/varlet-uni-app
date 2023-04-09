import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { STEPS_BIND_STEP_KEY } from '../steps/provide.mjs';
export function useSteps() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(STEPS_BIND_STEP_KEY);
  if (!bindParent) {
    error('Steps', '<step/> must in <steps>');
  }
  return {
    index,
    steps: parentProvider,
    bindSteps: bindParent
  };
}