module.exports = function check(def, item) {
  if (def.hidden) {
    return false;
  }
  const value = item[def.key];

  return value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length);
};
