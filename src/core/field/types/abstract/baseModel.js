function Model(attributes) {
  Object.assign(this, this.defaults(), attributes);
  this.initialize.apply(this, arguments);
}

Model.prototype = {
  constructor: Model,
  defaults() {
    return {};
  },
  initialize() {},
  remove() {
    Object.getOwnPropertyNames(this).forEach((key) => {
      this[key] = null;
    });
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

  if (childMethods.remove) {
    ChildModel.prototype.remove = function remove() {
      childMethods.remove.apply(this, arguments);
      parentMethods.remove.apply(this, arguments);
    };
  }

  ChildModel.extend = ParentModel.extend;

  return ChildModel;
};

module.exports = Model;
