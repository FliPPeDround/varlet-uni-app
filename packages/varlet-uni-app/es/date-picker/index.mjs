import DatePicker from './DatePicker.mjs';
DatePicker.install = function (app) {
  app.component(DatePicker.name, DatePicker);
};
export { props as datePickerProps } from './props.mjs';
export var _DatePickerComponent = DatePicker;
export default DatePicker;