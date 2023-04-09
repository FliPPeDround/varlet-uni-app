import TimePicker from './TimePicker.mjs';
TimePicker.install = function (app) {
  app.component(TimePicker.name, TimePicker);
};
export { props as timePickerProps } from './props.mjs';
export var _TimePickerComponent = TimePicker;
export default TimePicker;