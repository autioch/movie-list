const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

const ORDER_INVERSION = {
  [ORDER.NONE]: ORDER.DESC,
  [ORDER.DESC]: ORDER.ASC,
  [ORDER.ASC]: ORDER.DESC
};

function Model(attributes, app) {
  Object.assign(this, this.defaults(), attributes);
  this.app = app;
  this.label = this.key.replace(/\.?([A-Z]+)/g, (x, y) => ` ${y}`);
  this.label = this.label[0].toUpperCase() + this.label.slice(1);
  this.initialize.apply(this, arguments);
}

Model.prototype = {
  constructor: Model,
  defaults() {
    return {
      key: '',
      type: 1,
      order: ORDER.NONE
    };
  },
  initialize() {},
  hasSort() {
    return this.order !== ORDER.NONE;
  },
  makeSort() {
    if (this.order === ORDER.ASC) {
      return this.resetSort();
    }
    this.invertSort();
  },
  resetSort() {
    this.order = ORDER.NONE;
    this.app.removeSort(this.key);
  },
  invertSort() {
    this.order = ORDER_INVERSION[this.order];
    this.app.addSort({
      key: this.key,
      order: this.order,
      orderInverse: ORDER_INVERSION[this.order],
      label: this.label
    });
  },
  hasValue() {
    return false;
  },
  resetValue() {
    this.app.syncItems();
  },
  test() {
    return true;
  },
  getStats() {
    return [];
  }
};

Model.extend = function extend(childMethods) {
  const ParentModel = this;
  const parentMethods = ParentModel.prototype;
  let ChildModel;

  if (childMethods.hasOwnProperty('constructor')) {
    ChildModel = childMethods.constructor;
  } else {
    ChildModel = function() {
      return ParentModel.apply(this, arguments);
    };
  }

  ChildModel.prototype = Object.assign({}, parentMethods, childMethods);
  ChildModel.prototype.contructor = ChildModel;

  if (childMethods.defaults) {
    ChildModel.prototype.defaults = function defaults() {
      return Object.assign({}, parentMethods.defaults(), childMethods.defaults());
    };
  }

  ChildModel.extend = ParentModel.extend;

  return ChildModel;
};

module.exports = Model;
