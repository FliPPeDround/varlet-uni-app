export function error(source, message) {
  throw Error("Varlet [" + source + "]: " + message);
}
export function warn(source, message) {
  console.warn("Varlet [" + source + "]: " + message);
}