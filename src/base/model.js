function Model(definition) {
  Object.assign(this, this.defaults(), definition);
  this.initialize();
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

  ChildModel.prototype = Object.create(Object.assign({}, parentMethods, childMethods));
  ChildModel.prototype.contructor = ChildModel;

  if (childMethods.remove) {
    ChildModel.prototype.remove = function() {
      childMethods.remove.apply(this, arguments);
      parentMethods.remove.apply(this, arguments);
    };
  }

  ChildModel.extend = ParentModel.extend;

  return ChildModel;
};

module.exports = Model;
