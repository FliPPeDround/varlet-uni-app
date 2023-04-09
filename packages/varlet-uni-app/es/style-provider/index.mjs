import VarStyleProvider from './StyleProvider.mjs';
import { formatStyleVars } from '../utils/elements.mjs';
var mountedVarKeys = [];
function StyleProvider(styleVars) {
  mountedVarKeys.forEach(key => document.documentElement.style.removeProperty(key));
  mountedVarKeys.length = 0;
  var styles = formatStyleVars(styleVars != null ? styleVars : {});
  Object.entries(styles).forEach(_ref => {
    var [key, value] = _ref;
    document.documentElement.style.setProperty(key, value);
    mountedVarKeys.push(key);
  });
}
StyleProvider.Component = VarStyleProvider;
VarStyleProvider.install = function (app) {
  app.component(VarStyleProvider.name, VarStyleProvider);
};
StyleProvider.install = function (app) {
  app.component(VarStyleProvider.name, VarStyleProvider);
};
export { props as styleProviderProps } from './props.mjs';
export var _StyleProviderComponent = VarStyleProvider;
export default StyleProvider;