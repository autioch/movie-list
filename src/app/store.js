function Store(products = []) {
  this._cache = {};
  products.forEach((product) => this.addProduct(product));
}

const productDefaults = {
  key: null,
  isLoaded: false,
  loadingPromise: null,
  items: [],
  url: ''
};

function cloneItems(items) {
  return items.length ? items.slice(0) : items;
}

Store.prototype = {
  constructor: Store,
  addProduct(def) {
    if (this._cache.hasOwnProperty(def.key)) {
      throw Error(`Store already has product ${def.key}`);
    }
    this._cache[def.key] = Object.assign({}, productDefaults, def);

    return this.get(def.key);
  },
  get(key) {
    const cache = this._cache[key];

    if (cache.isLoaded) {
      return Promise.resolve(cloneItems(this._cache[key].items));
    }
    if (cache.loadingPromise) {
      return cache.loadingPromise;
    }

    return this.fetch(key);
  },
  fetch(key) {
    const cache = this._cache[key];

    /* For production config, data is separate file. For development, just the data. Avoids reloads on styles change. */
    if (typeof cache.url === 'string') {
      cache.loadingPromise = window
        .fetch(cache.url)
        .then((response) => response.json())
        .then((items) => this.set(key, items));

      return cache.loadingPromise;
    }

    return Promise.resolve(this.set(key, cache.url));
  },
  set(key, items) {
    const cache = this._cache[key];

    cache.isLoaded = true;
    cache.loadingPromise = null;
    cache.items = items;

    return cloneItems(cache.items);
  },
  allLoaded() {
    return !Object.keys(this._cache).find((key) => !this._cache[key].isLoaded);
  }
};

module.exports = Store;
