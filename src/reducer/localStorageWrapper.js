export default function localStorageWrapper(key) {
  function save(value) {
    localStorage.setItem(key, JSON.stringify(value));

    return value;
  }

  function clean() {
    localStorage.removeItem(key);
  }

  function read() {
    const serialized = localStorage.getItem(key);

    if (serialized) {
      return JSON.parse(serialized);
    }

    return {};
  }

  return {
    save,
    read,
    clean
  };
}
