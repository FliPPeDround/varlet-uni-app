function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import VarHoverOverlay, { useHoverOverlay } from '../hover-overlay/index.mjs';
import VarFormDetails from '../form-details/index.mjs';
import VarIcon from '../icon/index.mjs';
import VarPopup from '../popup/index.mjs';
import ImagePreview from '../image-preview/index.mjs';
import Ripple from '../ripple/index.mjs';
import Hover from '../hover/index.mjs';
import { defineComponent, nextTick, reactive, computed, watch, ref } from 'vue';
import { props } from './props.mjs';
import { isNumber, toNumber, isString, isArray } from '@varlet/shared';
import { isHTMLSupportImage, isHTMLSupportVideo } from '../utils/shared.mjs';
import { call, useValidation, createNamespace, formatElevation } from '../utils/components.mjs';
import { useForm } from '../form/provide.mjs';
var {
  n,
  classes
} = createNamespace('uploader');
var fid = 0;
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, withModifiers as _withModifiers, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, withDirectives as _withDirectives, renderSlot as _renderSlot, withCtx as _withCtx, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onClick"];
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["src", "alt"];
var _hoisted_4 = ["multiple", "accept", "capture", "disabled"];
var _hoisted_5 = ["src"];
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_hover_overlay = _resolveComponent("var-hover-overlay");
  var _component_var_form_details = _resolveComponent("var-form-details");
  var _component_var_popup = _resolveComponent("var-popup");
  var _directive_ripple = _resolveDirective("ripple");
  var _directive_hover = _resolveDirective("hover");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box')))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('file-list'))
  }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.files, f => {
    return _withDirectives((_openBlock(), _createElementBlock("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('file'), _ctx.formatElevation(_ctx.elevation, 2), [f.state === 'loading', _ctx.n('--loading')])),
      key: f.id,
      onClick: $event => _ctx.preview(f)
    }, [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('file-name'))
    }, _toDisplayString(f.name || f.url), 3 /* TEXT, CLASS */), _ctx.removable ? (_openBlock(), _createElementBlock("div", {
      key: 0,
      class: _normalizeClass(_ctx.n('file-close')),
      onClick: _withModifiers($event => _ctx.handleRemove(f), ["stop"])
    }, [_createVNode(_component_var_icon, {
      class: _normalizeClass(_ctx.n('file-close-icon')),
      "var-uploader-cover": "",
      name: "delete"
    }, null, 8 /* PROPS */, ["class"])], 10 /* CLASS, PROPS */, _hoisted_2)) : _createCommentVNode("v-if", true), f.cover ? (_openBlock(), _createElementBlock("img", {
      key: 1,
      class: _normalizeClass(_ctx.n('file-cover')),
      style: _normalizeStyle({
        objectFit: f.fit
      }),
      src: f.cover,
      alt: f.name
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_3)) : _createCommentVNode("v-if", true), _createElementVNode("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('file-indicator'), [f.state === 'success', _ctx.n('--success')], [f.state === 'error', _ctx.n('--error')]))
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_1)), [[_directive_ripple, {
      disabled: _ctx.disabled || _ctx.formDisabled || _ctx.readonly || _ctx.formReadonly || !_ctx.ripple
    }]]);
  }), 128 /* KEYED_FRAGMENT */)), !_ctx.maxlength || _ctx.modelValue.length < _ctx.maxlength ? _withDirectives((_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes([!_ctx.$slots.default, _ctx.n('action') + " " + _ctx.formatElevation(_ctx.elevation, 2)], [_ctx.disabled || _ctx.formDisabled, _ctx.n('--disabled')])),
    onClick: _cache[1] || (_cache[1] = function () {
      return _ctx.chooseFile && _ctx.chooseFile(...arguments);
    })
  }, [_createElementVNode("input", {
    ref: "input",
    type: "file",
    class: _normalizeClass(_ctx.n('action-input')),
    multiple: _ctx.multiple,
    accept: _ctx.accept,
    capture: _ctx.capture,
    disabled: _ctx.disabled || _ctx.formDisabled || _ctx.readonly || _ctx.formReadonly,
    onChange: _cache[0] || (_cache[0] = function () {
      return _ctx.handleChange && _ctx.handleChange(...arguments);
    })
  }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_4), _renderSlot(_ctx.$slots, "default", {}, () => [_createVNode(_component_var_icon, {
    class: _normalizeClass(_ctx.n('action-icon')),
    "var-uploader-cover": "",
    name: "plus"
  }, null, 8 /* PROPS */, ["class"]), _createVNode(_component_var_hover_overlay, {
    hovering: _ctx.hovering && !_ctx.disabled && !_ctx.formDisabled
  }, null, 8 /* PROPS */, ["hovering"])])], 2 /* CLASS */)), [[_directive_ripple, {
    disabled: _ctx.disabled || _ctx.formDisabled || _ctx.readonly || _ctx.formReadonly || !_ctx.ripple || _ctx.$slots.default
  }], [_directive_hover, _ctx.handleHovering, "desktop"]]) : _createCommentVNode("v-if", true)], 2 /* CLASS */), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage,
    "extra-message": _ctx.maxlengthText
  }, null, 8 /* PROPS */, ["error-message", "extra-message"]), _createVNode(_component_var_popup, {
    class: _normalizeClass(_ctx.n('preview')),
    "var-uploader-cover": "",
    position: "center",
    show: _ctx.showPreview,
    "onUpdate:show": _cache[2] || (_cache[2] = $event => _ctx.showPreview = $event),
    onClosed: _cache[3] || (_cache[3] = $event => _ctx.currentPreview = null)
  }, {
    default: _withCtx(() => {
      var _ctx$currentPreview, _ctx$currentPreview2;
      return [_ctx.currentPreview && _ctx.isHTMLSupportVideo((_ctx$currentPreview = _ctx.currentPreview) == null ? void 0 : _ctx$currentPreview.url) ? (_openBlock(), _createElementBlock("video", {
        key: 0,
        class: _normalizeClass(_ctx.n('preview-video')),
        playsinline: "true",
        "webkit-playsinline": "true",
        "x5-playsinline": "true",
        "x5-video-player-type": "h5",
        "x5-video-player-fullscreen": "false",
        controls: "",
        src: (_ctx$currentPreview2 = _ctx.currentPreview) == null ? void 0 : _ctx$currentPreview2.url
      }, null, 10 /* CLASS, PROPS */, _hoisted_5)) : _createCommentVNode("v-if", true)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "show"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarUploader',
  directives: {
    Ripple,
    Hover
  },
  components: {
    VarIcon,
    VarPopup,
    VarFormDetails,
    VarHoverOverlay
  },
  props,
  setup(props) {
    var input = ref(null);
    var showPreview = ref(false);
    var currentPreview = ref(null);
    var maxlengthText = computed(() => {
      var {
        maxlength,
        modelValue: {
          length
        }
      } = props;
      return isNumber(maxlength) ? length + " / " + maxlength : '';
    });
    var {
      form,
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var files = computed(() => {
      var {
        modelValue,
        hideList
      } = props;
      if (hideList) {
        return [];
      }
      return modelValue;
    });
    var preview = varFile => {
      var {
        disabled,
        readonly,
        previewed
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly || !previewed) {
        return;
      }
      var {
        url
      } = varFile;
      if (isString(url) && isHTMLSupportImage(url)) {
        ImagePreview(url);
        return;
      }
      if (isString(url) && isHTMLSupportVideo(url)) {
        currentPreview.value = varFile;
        showPreview.value = true;
      }
    };
    var createVarFile = file => {
      return {
        id: fid++,
        url: '',
        cover: '',
        name: file.name,
        file
      };
    };
    var getFiles = event => {
      var el = event.target;
      var {
        files: fileList
      } = el;
      return Array.from(fileList);
    };
    var resolver = varFile => {
      return new Promise(resolve => {
        var fileReader = new FileReader();
        fileReader.onload = () => {
          var base64 = fileReader.result;
          varFile.file.type.startsWith('image') && (varFile.cover = base64);
          varFile.url = base64;
          resolve(varFile);
        };
        fileReader.readAsDataURL(varFile.file);
      });
    };
    var getResolvers = varFiles => varFiles.map(resolver);
    var getBeforeReaders = varFiles => {
      var {
        onBeforeRead
      } = props;
      return varFiles.map(varFile => {
        return new Promise(resolve => {
          if (!onBeforeRead) {
            resolve({
              valid: true,
              varFile
            });
          }
          var results = call(onBeforeRead, reactive(varFile));
          results = isArray(results) ? results : [results];
          Promise.all(results).then(values => {
            resolve({
              valid: !values.some(value => !value),
              varFile
            });
          });
        });
      });
    };
    var handleChange = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (event) {
        var {
          maxsize,
          maxlength,
          modelValue,
          onOversize,
          onAfterRead,
          readonly,
          disabled
        } = props;
        if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
          return;
        }
        var getValidSizeVarFile = varFiles => {
          return varFiles.filter(varFile => {
            if (varFile.file.size > toNumber(maxsize)) {
              call(onOversize, reactive(varFile));
              return false;
            }
            return true;
          });
        };
        var getValidLengthVarFiles = varFiles => {
          var limit = Math.min(varFiles.length, toNumber(maxlength) - modelValue.length);
          return varFiles.slice(0, limit);
        };

        // limit
        var files = getFiles(event);
        var varFiles = files.map(createVarFile);
        varFiles = maxsize != null ? getValidSizeVarFile(varFiles) : varFiles;
        varFiles = maxlength != null ? getValidLengthVarFiles(varFiles) : varFiles;

        // pre resolve
        var resolvedVarFiles = yield Promise.all(getResolvers(varFiles));
        var validationVarFiles = yield Promise.all(getBeforeReaders(resolvedVarFiles));
        var validVarFiles = validationVarFiles.filter(_ref2 => {
          var {
            valid
          } = _ref2;
          return valid;
        }).map(_ref3 => {
          var {
            varFile
          } = _ref3;
          return varFile;
        });
        call(props['onUpdate:modelValue'], [...modelValue, ...validVarFiles]);
        event.target.value = '';
        validVarFiles.forEach(varFile => call(onAfterRead, reactive(varFile)));
      });
      return function handleChange(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    var handleRemove = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* (removedVarFile) {
        var {
          disabled,
          readonly,
          modelValue,
          onBeforeRemove,
          onRemove
        } = props;
        if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
          return;
        }
        if (onBeforeRemove) {
          var results = call(onBeforeRemove, reactive(removedVarFile));
          results = isArray(results) ? results : [results];
          if ((yield Promise.all(results)).some(result => !result)) {
            return;
          }
        }
        var expectedFiles = modelValue.filter(varFile => varFile !== removedVarFile);
        call(onRemove, reactive(removedVarFile));
        validateWithTrigger('onRemove');
        call(props['onUpdate:modelValue'], expectedFiles);
      });
      return function handleRemove(_x2) {
        return _ref4.apply(this, arguments);
      };
    }();

    // expose
    var getSuccess = () => props.modelValue.filter(varFile => varFile.state === 'success');

    // expose
    var getError = () => props.modelValue.filter(varFile => varFile.state === 'error');

    // expose
    var getLoading = () => props.modelValue.filter(varFile => varFile.state === 'loading');

    // expose
    var chooseFile = () => {
      input.value.click();
    };

    // expose
    var closePreview = () => {
      currentPreview.value = null;
      showPreview.value = false;
      ImagePreview.close();
    };
    var varFileUtils = {
      getSuccess,
      getError,
      getLoading
    };
    var validateWithTrigger = trigger => {
      nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props;
        vt(validateTrigger, trigger, rules, modelValue, varFileUtils);
      });
    };
    var callReset = false;

    // expose
    var validate = () => v(props.rules, props.modelValue, varFileUtils);

    // expose
    var reset = () => {
      callReset = true;
      call(props['onUpdate:modelValue'], []);
      resetValidation();
    };
    var uploaderProvider = {
      validate,
      resetValidation,
      reset
    };
    call(bindForm, uploaderProvider);
    watch(() => props.modelValue, () => {
      !callReset && validateWithTrigger('onChange');
      callReset = false;
    }, {
      deep: true
    });
    return {
      n,
      classes,
      formatElevation,
      input,
      files,
      showPreview,
      currentPreview,
      errorMessage,
      maxlengthText,
      hovering,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      handleHovering,
      isHTMLSupportVideo,
      isHTMLSupportImage,
      preview,
      handleChange,
      handleRemove,
      getSuccess,
      getError,
      getLoading,
      validate,
      resetValidation,
      reset,
      chooseFile,
      closePreview
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;