function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { defineComponent, computed } from 'vue';
import { props } from './props.mjs';
import { useFormItems } from './provide.mjs';
import { createNamespace } from '../utils/components.mjs';
import { find } from '@varlet/shared';
import { getParentScroller, getTop, scrollTo, toPxNum } from '../utils/elements.mjs';
import { linear } from '../utils/shared.mjs';
var {
  n
} = createNamespace('form');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarForm',
  props,
  setup(props) {
    var disabled = computed(() => props.disabled);
    var readonly = computed(() => props.readonly);
    var {
      formItems,
      bindFormItems
    } = useFormItems();
    var scroll = formItemElement => {
      // wait form-details animation end
      setTimeout(() => {
        var scroller = getParentScroller(formItemElement);
        var scrollerTop = scroller === window ? 0 : getTop(scroller);
        var top = getTop(formItemElement) - scrollerTop - toPxNum(props.scrollToErrorOffsetY);
        scrollTo(scroller, {
          top,
          animation: linear
        });
      }, 300);
    };

    // expose
    var validate = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* () {
        var res = yield Promise.all(formItems.map(_ref2 => {
          var {
            validate
          } = _ref2;
          return validate();
        }));
        if (props.scrollToError) {
          var [, errorIndex] = find(res, r => r === false, props.scrollToError);
          var hasError = errorIndex > -1;
          if (hasError) {
            var _formItems$errorIndex;
            var formItemElement = (_formItems$errorIndex = formItems[errorIndex].instance.proxy) == null ? void 0 : _formItems$errorIndex.$el;
            scroll(formItemElement);
          }
          return !hasError;
        }
        return res.every(result => result === true);
      });
      return function validate() {
        return _ref.apply(this, arguments);
      };
    }();

    // expose
    var reset = () => formItems.forEach(_ref3 => {
      var {
        reset
      } = _ref3;
      return reset();
    });

    // expose
    var resetValidation = () => formItems.forEach(_ref4 => {
      var {
        resetValidation
      } = _ref4;
      return resetValidation();
    });
    var formProvider = {
      disabled,
      readonly
    };
    bindFormItems(formProvider);
    return {
      n,
      validate,
      reset,
      resetValidation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;