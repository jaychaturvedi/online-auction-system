import _ from "lodash";

// Using _.debounce() method with its parameters
const debounce = (func: Function, delay?: number) =>
  _.debounce(func, delay || 1000);
export default debounce;
