function saver(key) {
  return function save(value) {
    localStorage.setItem(key, JSON.stringify(value));

    return value;
  };
}

function cleaner(key) {
  return function clean() {
    localStorage.removeItem(key);
  };
}

function reader(key, defaultsFn) {
  return function read() {
    const serialized = localStorage.getItem(key);

    if (serialized) {
      return JSON.parse(serialized);
    }

    return defaultsFn();
  };
}

export const saveHiddenFilters = saver('hiddenFilters');
export const readHiddenFilters = reader('hiddenFilters', () => ({}));
export const cleanHiddenFilters = cleaner('hiddenFilters');

export const saveHiddenFields = saver('hiddenFields');
export const readHiddenFields = reader('hiddenFields', () => ({}));
export const cleanHiddenFields = cleaner('hiddenFields');
