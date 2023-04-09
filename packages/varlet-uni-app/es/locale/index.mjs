function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { ref } from 'vue';
import zhCN from './zh-CN.mjs';
import enUS from './en-US.mjs';
function useLocale() {
  var packs = {};
  var pack = ref({});
  var add = (lang, pack) => {
    pack.lang = lang;
    packs[lang] = pack;
  };
  var use = lang => {
    if (!packs[lang]) {
      console.warn("The " + lang + " does not exist. You can mount a language package using the add method");
      return {};
    }
    pack.value = packs[lang];
  };
  var merge = (lang, pack) => {
    if (!packs[lang]) {
      console.warn("The " + lang + " does not exist. You can mount a language package using the add method");
      return;
    }
    packs[lang] = _extends({}, packs[lang], pack);
    use(lang);
  };
  return {
    packs,
    pack,
    add,
    use,
    merge
  };
}
var {
  packs,
  pack,
  add,
  use,
  merge
} = useLocale();
add('zh-CN', zhCN);
use('zh-CN');
export { zhCN, enUS, packs, pack, add, use, merge, useLocale };
export var _LocaleComponent = {
  zhCN,
  enUS,
  packs,
  pack,
  add,
  use,
  merge,
  useLocale
};
export default {
  zhCN,
  enUS,
  packs,
  pack,
  add,
  use,
  merge,
  useLocale
};