export function checkName(name) {
  if (name.length < 2 || typeof name !== "string") {
    return true;
  } else {
    return false;
  }
};