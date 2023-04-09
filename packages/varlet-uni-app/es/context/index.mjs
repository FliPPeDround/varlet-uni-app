import { reactive } from 'vue';
var context = {
  locks: {},
  zIndex: 2000,
  enableRipple: true
};
export var _ContextComponent = reactive(context);
export default reactive(context);