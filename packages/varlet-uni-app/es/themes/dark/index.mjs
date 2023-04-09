function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import actionSheet from './actionSheet.mjs';
import badge from './badge.mjs';
import button from './button.mjs';
import card from './card.mjs';
import cell from './cell.mjs';
import checkbox from './checkbox.mjs';
import chip from './chip.mjs';
import collapse from './collapse.mjs';
import datePicker from './datePicker.mjs';
import dialog from './dialog.mjs';
import divider from './divider.mjs';
import input from './input.mjs';
import pagination from './pagination.mjs';
import picker from './picker.mjs';
import popup from './popup.mjs';
import pullRefresh from './pullRefresh.mjs';
import radio from './radio.mjs';
import result from './result.mjs';
import select from './select.mjs';
import skeleton from './skeleton.mjs';
import steps from './steps.mjs';
import switchThemes from './switch.mjs';
import tab from './tab.mjs';
import table from './table.mjs';
import timePicker from './timePicker.mjs';
import uploader from './uploader.mjs';
import tabs from './tabs.mjs';
import appBar from './appBar.mjs';
import bottomNavigation from './bottomNavigation.mjs';
import bottomNavigationItem from './bottomNavigationItem.mjs';
import menu from './menu.mjs';
import breadcrumb from './breadcrumb.mjs';
import paper from './paper.mjs';
import avatar from './avatar.mjs';
export default _extends({
  // common
  '--color-body': '#1e1e1e',
  '--color-text': '#fff',
  '--color-primary': '#4a7afe',
  '--color-info': '#10afef',
  '--color-success': '#10c48f',
  '--color-warning': '#ff8800',
  '--color-danger': '#ef5350',
  '--color-disabled': '#404040',
  '--color-text-disabled': '#757575'
}, button, cell, card, timePicker, datePicker, skeleton, tabs, tab, popup, dialog, actionSheet, chip, badge, uploader, collapse, pullRefresh, switchThemes, steps, pagination, table, input, select, radio, checkbox, divider, picker, appBar, bottomNavigation, bottomNavigationItem, menu, result, breadcrumb, paper, avatar);