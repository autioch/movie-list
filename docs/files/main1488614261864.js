/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar delve = __webpack_require__(1);\n\n/* \"Logger\" for errors. */\nvar errorsEl = delve(document, 'errors');\n\n/* Setup error handler as soon as possible. */\nwindow.addEventListener('error', function (err) {\n  errorsEl.textContent = err.message;\n}, false);\n\n/* This should hide browser address bar. */\nwindow.addEventListener('load', function () {\n  return setTimeout(function () {\n    return window.scrollTo(0, 1);\n  }, 0);\n});\n\n/* Main application model. */\nvar appModelFactory = __webpack_require__(2);\n\n/* Main application view. */\nvar appViewFactory = __webpack_require__(12);\n\n/* Simplest polyfill for window fetch only for jsons. */\nvar fetchJson = __webpack_require__(57);\n\n/* Application icon. */\n__webpack_require__(58);\n__webpack_require__(59);\n__webpack_require__(60);\n\n/* Fetch items and application schema. */\nPromise.all([fetchJson('/data/schema.json'), fetchJson('/data/items.json')])\n\n/* Setup app model and view. */\n.then(function (schemaAndItems) {\n  var appModel = appModelFactory.apply(undefined, schemaAndItems);\n\n  requestAnimationFrame(function () {\n    return appViewFactory(appModel);\n  });\n})\n\n/* If data can't be fetched, just die. */\n.catch(function (err) {\n  errorsEl.textContent = err;\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nmodule.exports = function delve(el, selector) {\n  return el.querySelector(\".js-\" + selector);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/delve.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/delve.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dictionary = __webpack_require__(3);\nvar sortsModelFactory = __webpack_require__(4);\nvar fieldModelFactory = __webpack_require__(5);\n\nmodule.exports = function appModelFactory(schema, totalItems) {\n  var totalCount = totalItems.length;\n  var sorts = sortsModelFactory();\n  var api = {\n    syncItems: syncItems,\n    addSort: addSort,\n    removeSort: removeSort,\n    query: query,\n    onChange: onChange\n  };\n\n  var fields = schema.fields.map(function (field) {\n    return fieldModelFactory(field, api);\n  });\n\n  var callbackFn = function callbackFn() {};\n  var currentItems = totalItems.slice(0);\n  var currentCount = currentItems.length;\n\n  function syncItems() {\n    currentItems = sorts.applySorts(filterItems(totalItems.slice(0)));\n    currentCount = currentItems.length;\n    generateStats();\n    callbackFn();\n  }\n\n  function filterItems(items) {\n    return fields.filter(function (field) {\n      return field.hasValue();\n    }).reduce(function (filteredItems, level) {\n      return filteredItems.filter(function (item) {\n        return level.test(item);\n      });\n    }, items);\n  }\n\n  function generateStats() {\n    fields.forEach(function (field) {\n      return field.stat && field.getStats(currentItems);\n    });\n  }\n\n  function addSort(newSort) {\n    sorts.addSort(newSort);\n    syncItems();\n  }\n\n  function removeSort(key) {\n    sorts.removeSort(key);\n    syncItems();\n  }\n\n  function onChange(newCallbackFn) {\n    callbackFn = newCallbackFn;\n  }\n\n  function query() {\n    return {\n      totalCount: totalCount,\n      count: currentCount,\n      items: currentItems,\n      fields: fields,\n      schema: schema\n    };\n  }\n\n  dictionary(fields, totalItems);\n  generateStats();\n\n  return api;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/app/model.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/app/model.js?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar DICT_TYPE = 3;\n\nfunction uniq(array) {\n  var seen = {\n    'undefined': true,\n    'null': true,\n    'N/A': true\n  };\n  var items = [];\n\n  for (var i = 0; i < array.length; i++) {\n    var item = array[i];\n\n    if (!seen[item]) {\n      seen[item] = true;\n      items.push(item);\n    }\n  }\n\n  return items;\n}\n\nmodule.exports = function dictionary(fields, items) {\n  var dict = fields.filter(function (field) {\n    return field.type === DICT_TYPE;\n  }).map(function (field) {\n    return {\n      key: field.key,\n      values: [],\n      field: field\n    };\n  });\n\n  items.forEach(function (item) {\n    dict.forEach(function (key) {\n      key.values = key.values.concat(item[key.key]);\n    });\n  });\n\n  dict.forEach(function (key) {\n    key.field.setOptions(uniq(key.values).sort());\n    key.field = key.key = key.values = null;\n  });\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/app/dictionary.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/app/dictionary.js?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nvar EQUAL = 0;\nvar ITEM_1_LATER = 1;\nvar ITEM_2_LATER = -1;\n\nmodule.exports = function sortsModelFactory() {\n  var sorts = [];\n\n  function addSort(newSort) {\n    var existing = sorts.find(function (sort) {\n      return sort.key === newSort.key;\n    });\n\n    if (existing) {\n      existing.order = newSort.order;\n      existing.orderInverse = newSort.orderInverse;\n    } else {\n      sorts.push(newSort);\n    }\n  }\n\n  function removeSort(key) {\n    sorts = sorts.filter(function (sort) {\n      return sort.key !== key;\n    });\n  }\n\n  function applySorts(items) {\n    if (!sorts.length) {\n      return items;\n    }\n\n    return items.sort(function (item1, item2) {\n      for (var index = 0; index < sorts.length; index++) {\n        var field = sorts[index];\n        var prop1 = item1[field.key];\n        var prop2 = item2[field.key];\n\n        if (!prop1 && !prop2) {\n          return EQUAL;\n        }\n        if (!prop1) {\n          return ITEM_1_LATER;\n        }\n        if (!prop2) {\n          return ITEM_2_LATER;\n        }\n        if (prop1 < prop2) {\n          return field.order;\n        }\n        if (prop1 > prop2) {\n          return field.orderInverse;\n        }\n      }\n\n      return EQUAL;\n    });\n  }\n\n  return {\n    addSort: addSort,\n    removeSort: removeSort,\n    applySorts: applySorts\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/app/sorts.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/app/sorts.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar factories = {\n  '1': __webpack_require__(6),\n  '2': __webpack_require__(8),\n  '3': __webpack_require__(10),\n  '4': __webpack_require__(11)\n};\n\nmodule.exports = function fieldModelFactory(field, appModel) {\n  return factories[field.type](field, appModel);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/model.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/model.js?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseModelFactory = __webpack_require__(7);\n\nmodule.exports = function textModelFactory(attributes, appModel) {\n  var _baseModelFactory = baseModelFactory(attributes, appModel),\n      config = _baseModelFactory.config,\n      hasSort = _baseModelFactory.hasSort,\n      makeSort = _baseModelFactory.makeSort,\n      label = _baseModelFactory.label;\n\n  var value = attributes.value || '';\n  var regex = new RegExp('', 'i');\n  var testFunction = testRegex;\n\n  function hasValue() {\n    return value.length > 0;\n  }\n\n  function resetValue() {\n    value = '';\n    appModel.syncItems();\n  }\n\n  function testRegex(text) {\n    return regex.test(text);\n  }\n\n  function testString(text) {\n    return text.indexOf(value) > -1;\n  }\n\n  function test(item) {\n    return testFunction(item[config.key]);\n  }\n\n  function setValue(newValue) {\n    value = newValue;\n    try {\n      regex = new RegExp(value.replace(/ /g, '.?'), 'i');\n      testFunction = testRegex;\n    } catch (err) {\n      testFunction = testString;\n    }\n    appModel.syncItems();\n  }\n\n  function query() {\n    return {\n      label: label,\n      order: config.order,\n      value: value\n    };\n  }\n\n  return {\n    setValue: setValue,\n    resetValue: resetValue,\n    hasSort: hasSort,\n    makeSort: makeSort,\n    hasValue: hasValue,\n    test: test,\n    query: query,\n    label: label,\n    config: config,\n    type: config.type,\n    key: config.key\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/text/model.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/text/model.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar _ORDER_INVERSION;\n\nvar ORDER = {\n  NONE: 0,\n  DESC: 1,\n  ASC: -1\n};\n\nvar ORDER_INVERSION = (_ORDER_INVERSION = {}, _ORDER_INVERSION[ORDER.NONE] = ORDER.DESC, _ORDER_INVERSION[ORDER.DESC] = ORDER.ASC, _ORDER_INVERSION[ORDER.ASC] = ORDER.DESC, _ORDER_INVERSION);\n\nvar DEFAULTS = {\n  key: '',\n  type: 1,\n  order: ORDER.NONE\n};\n\nfunction getLabel(key) {\n  var label = key.replace(/\\.?([A-Z]+)/g, function (x, y) {\n    return ' ' + y;\n  });\n\n  return label[0].toUpperCase() + label.slice(1);\n}\n\nmodule.exports = function baseModelFactory(attributes, appModel) {\n  var config = Object.assign({}, DEFAULTS, attributes);\n  var label = getLabel(config.key);\n\n  function hasSort() {\n    return config.order !== ORDER.NONE;\n  }\n\n  function makeSort() {\n    if (config.order === ORDER.ASC) {\n      return resetSort();\n    }\n    invertSort();\n  }\n\n  function resetSort() {\n    config.order = ORDER.NONE;\n    appModel.removeSort(config.key);\n  }\n\n  function invertSort() {\n    config.order = ORDER_INVERSION[config.order];\n    appModel.addSort({\n      key: config.key,\n      order: config.order,\n      orderInverse: ORDER_INVERSION[config.order],\n      label: label\n    });\n  }\n\n  return {\n    config: config,\n    hasSort: hasSort,\n    makeSort: makeSort,\n    label: label\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/base/model.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/base/model.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseModelFactory = __webpack_require__(7);\nvar generateStats = __webpack_require__(9);\n\nmodule.exports = function rangeModelFactory(attributes, appModel) {\n  var _baseModelFactory = baseModelFactory(attributes, appModel),\n      config = _baseModelFactory.config,\n      hasSort = _baseModelFactory.hasSort,\n      makeSort = _baseModelFactory.makeSort,\n      label = _baseModelFactory.label;\n\n  var stats = [];\n\n  var fromValue = -Infinity;\n  var toValue = Infinity;\n\n  function hasValue() {\n    return fromValue !== -Infinity || toValue !== Infinity;\n  }\n\n  function resetValue() {\n    fromValue = -Infinity;\n    toValue = Infinity;\n    appModel.syncItems();\n  }\n\n  function test(item) {\n    var value = item[config.key];\n\n    return value >= fromValue && value <= toValue;\n  }\n\n  function setFromValue(value) {\n    if (value === null || value === '') {\n      fromValue = -Infinity;\n    } else {\n      fromValue = value;\n    }\n    appModel.syncItems();\n  }\n\n  function setToValue(value) {\n    if (value === null || value === '') {\n      toValue = Infinity;\n    } else {\n      toValue = value;\n    }\n    appModel.syncItems();\n  }\n\n  function getStats(items) {\n    stats = generateStats(items.map(function (item) {\n      return item[config.key];\n    }));\n  }\n\n  function query() {\n    return {\n      label: label,\n      order: config.order,\n      fromValue: fromValue === -Infinity ? '' : fromValue,\n      toValue: toValue === Infinity ? '' : toValue,\n      stats: stats\n    };\n  }\n\n  return {\n    setFromValue: setFromValue,\n    setToValue: setToValue,\n    resetValue: resetValue,\n    hasSort: hasSort,\n    makeSort: makeSort,\n    hasValue: hasValue,\n    test: test,\n    getStats: getStats,\n    stat: config.stat,\n    query: query,\n    label: label,\n    config: config,\n    type: config.type,\n    key: config.key\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/range/model.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/range/model.js?");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("'use strict';\n\nfunction sortFloat(value1, value2) {\n  var floatA = parseFloat(value1);\n  var floatB = parseFloat(value2);\n\n  if (floatA > floatB) {\n    return 1;\n  }\n\n  return floatB > floatA ? -1 : 0;\n}\n\nfunction updateDict(dict, item) {\n  if (dict.hasOwnProperty(item)) {\n    dict[item]++;\n  } else {\n    dict[item] = 1;\n  }\n}\n\nvar ROUND_AMOUNT = 1000;\nvar ROUND_VALUE = 1000000;\n\nmodule.exports = function generateStats(values) {\n  var dict = {};\n  var dividend = 0;\n  var divider = 0;\n  var keysSum = 0;\n  var min = values[0];\n  var max = 0;\n  var sum = 0;\n\n  values.sort(sortFloat).forEach(function (value) {\n    var num = parseFloat(value, 10);\n\n    if (!isNaN(num) && num !== null) {\n      if (min > num) {\n        min = num;\n      }\n      if (max < num) {\n        max = num;\n      }\n      sum += num;\n    }\n    updateDict(dict, value === null || value === undefined ? 'null' : value.toString());\n  });\n\n  var keys = Object.keys(dict);\n\n  keys.forEach(function (key) {\n    var parsed = parseFloat(key, 10);\n\n    if (!isNaN(parsed)) {\n      keysSum += parsed;\n      dividend += parsed * dict[key];\n    }\n    divider += dict[key];\n  });\n\n  var count = keys.length;\n\n  var items = [{\n    key: 'Average',\n    value: count ? Math.round(keysSum / count) : 'N/A'\n  }, {\n    key: 'Sum',\n    value: sum\n  }, {\n    key: 'Weighted',\n    value: divider ? Math.round(dividend / divider) : 'N/A'\n  }, {\n    key: 'Max',\n    value: max\n  }, {\n    key: 'Variety',\n    value: count\n  }, {\n    key: 'Min',\n    value: min || 0\n  }];\n\n  items.forEach(function (item) {\n    if (item.value > ROUND_VALUE) {\n      item.value = Math.ceil(item.value / ROUND_AMOUNT);\n      item.rounded = true;\n    }\n  });\n\n  return items;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/range/generateStats.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/range/generateStats.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseModelFactory = __webpack_require__(7);\n\nmodule.exports = function textModelFactory(attributes, appModel) {\n  var _baseModelFactory = baseModelFactory(attributes, appModel),\n      config = _baseModelFactory.config,\n      hasSort = _baseModelFactory.hasSort,\n      makeSort = _baseModelFactory.makeSort,\n      label = _baseModelFactory.label;\n\n  var selected = [];\n  var options = [];\n\n  function hasValue() {\n    return selected.length > 0;\n  }\n\n  function resetValue() {\n    selected = [];\n    appModel.syncItems();\n  }\n\n  function test(item) {\n    var value = item[config.key];\n\n    if (typeof value === 'string') {\n      return selected.indexOf(value) > -1;\n    }\n    if (Array.isArray(value)) {\n      return selected.find(function (sel) {\n        return value.indexOf(sel) > -1;\n      });\n    }\n  }\n\n  function selectValue(value) {\n    if (value === '') {\n      return resetValue();\n    }\n    selected = [value];\n    appModel.syncItems();\n  }\n\n  function query() {\n    return {\n      label: label,\n      order: config.order,\n      selected: selected,\n      options: options\n    };\n  }\n\n  function setOptions(newOptions) {\n    options = newOptions;\n    selected = [];\n  }\n\n  return {\n    selectValue: selectValue,\n    resetValue: resetValue,\n    hasSort: hasSort,\n    makeSort: makeSort,\n    hasValue: hasValue,\n    setOptions: setOptions,\n    test: test,\n    query: query,\n    label: label,\n    config: config,\n    type: config.type,\n    key: config.key\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/dictionary/model.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/dictionary/model.js?");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseModelFactory = __webpack_require__(7);\nvar EMPTY = undefined;\n\nmodule.exports = function dateModelFactory(attributes, appModel) {\n  var _baseModelFactory = baseModelFactory(attributes, appModel),\n      config = _baseModelFactory.config,\n      hasSort = _baseModelFactory.hasSort,\n      makeSort = _baseModelFactory.makeSort,\n      label = _baseModelFactory.label;\n\n  var fromDate = EMPTY;\n  var toDate = EMPTY;\n  var testFunction = function testFunction() {\n    return true;\n  };\n\n  function hasValue() {\n    return fromDate !== EMPTY || toDate !== EMPTY;\n  }\n\n  function resetValue() {\n    fromDate = EMPTY;\n    toDate = EMPTY;\n    appModel.syncItems();\n  }\n\n  function testFromDate(value) {\n    return value >= fromDate;\n  }\n\n  function testToDate(value) {\n    return value <= toDate;\n  }\n\n  function testFromAndTo(value) {\n    return value >= fromDate && value <= toDate;\n  }\n\n  function test(item) {\n    return testFunction(item[config.key]);\n  }\n\n  function setTestFunction() {\n    if (fromDate !== EMPTY && toDate !== EMPTY) {\n      testFunction = testFromAndTo;\n    } else if (fromDate !== EMPTY) {\n      testFunction = testFromDate;\n    } else if (toDate !== EMPTY) {\n      // eslint-disable-line no-negated-condition\n      testFunction = testToDate;\n    } else {\n      testFunction = function testFunction() {\n        return true;\n      };\n    }\n  }\n\n  function setFromValue(value) {\n    fromDate = new Date(value);\n    if (isNaN(fromDate.getTime())) {\n      fromDate = EMPTY;\n    } else {\n      fromDate = fromDate.toISOString();\n    }\n    setTestFunction();\n    appModel.syncItems();\n  }\n\n  function setToValue(value) {\n    toDate = new Date(value);\n    if (isNaN(toDate.getTime())) {\n      toDate = EMPTY;\n    } else {\n      toDate = fromDate.toISOString();\n    }\n    setTestFunction();\n    appModel.syncItems();\n  }\n\n  function query() {\n    return {\n      label: label,\n      order: config.order,\n      fromDate: fromDate === EMPTY ? '' : fromDate,\n      toDate: toDate === EMPTY ? '' : toDate\n    };\n  }\n\n  return {\n    setFromValue: setFromValue,\n    setToValue: setToValue,\n    resetValue: resetValue,\n    hasSort: hasSort,\n    makeSort: makeSort,\n    hasValue: hasValue,\n    test: test,\n    stat: config.stat,\n    query: query,\n    label: label,\n    config: config,\n    type: config.type,\n    key: config.key\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/date/model.js\n// module id = 11\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/date/model.js?");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar fieldsViewFactory = __webpack_require__(13);\nvar countViewFactory = __webpack_require__(40);\nvar listViewFactory = __webpack_require__(43);\nvar legendViewFactory = __webpack_require__(48);\nvar statsViewFactory = __webpack_require__(51);\nvar delve = __webpack_require__(1);\n\n__webpack_require__(55);\n\n/**\r\n * Application view. Consists of smaller views.\r\n *\r\n * @param  {Object}    appModel Application  model.\r\n * @return {undefined}          Nothing.\r\n */\nmodule.exports = function viewFactory(appModel) {\n  var bodyEl = document.body;\n  var leftPanelEl = delve(bodyEl, 'left');\n  var centerPanelEl = delve(bodyEl, 'center');\n  var rightPanelEl = delve(bodyEl, 'right');\n\n  var countView = countViewFactory(appModel);\n  var statsView = statsViewFactory(appModel);\n  var fieldsView = fieldsViewFactory(appModel);\n  var legendView = legendViewFactory(appModel);\n  var listView = listViewFactory(appModel, centerPanelEl);\n\n  leftPanelEl.appendChild(fieldsView.el);\n  rightPanelEl.appendChild(countView.el);\n  rightPanelEl.appendChild(statsView.el);\n  rightPanelEl.appendChild(legendView.el);\n\n  appModel.onChange(function () {\n    countView.update();\n    listView.update();\n    statsView.update();\n    fieldsView.update();\n  });\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/app/view.js\n// module id = 12\n// module chunks = 0\n//# sourceURL=webpack:///./src/app/view.js?");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dom = __webpack_require__(14);\nvar fieldViewFactory = __webpack_require__(15);\n\n__webpack_require__(38);\n\nmodule.exports = function fieldsViewFactory(appModel) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('div', 'field-list');\n\n  var fieldViews = appModel.query().fields.filter(function (field) {\n    return !field.config.hidden;\n  }).map(function (field) {\n    return fieldViewFactory(field);\n  });\n\n  fieldViews.forEach(function (fieldView) {\n    return el.appendChild(fieldView.el);\n  });\n\n  function update() {\n    fieldViews.forEach(function (fieldView) {\n      return fieldView.update();\n    });\n  }\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/view.js\n// module id = 13\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/view.js?");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\n/**\r\n * Creates new HTMLElement and return it.\r\n * @param  {String} tagName   Name of the tag to create.\r\n * @param  {String} className Classes to be set on the element.\r\n * @param  {mixed} children   Array of children nodes, single node or textContent.\r\n * @return {HTMLElement}      Created HTMLElement.\r\n */\nmodule.exports = function dom(tagName, className, children) {\n  var el = document.createElement(tagName);\n\n  if (className) {\n    el.className = className;\n  }\n\n  if (children === undefined) {\n    return el;\n  }\n\n  if (Array.isArray(children)) {\n    /* For large amount of children instead of just appending, fragment could be used. */\n    for (var i = 0; i < children.length; i++) {\n      el.appendChild(children[i]);\n    }\n  } else if (children instanceof Node) {\n    el.appendChild(children);\n  } else {\n    el.textContent = children;\n  }\n\n  return el;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/dom.js\n// module id = 14\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/dom.js?");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar factories = {\n  '1': __webpack_require__(16),\n  '2': __webpack_require__(27),\n  '3': __webpack_require__(30),\n  '4': __webpack_require__(35)\n};\n\nmodule.exports = function fieldViewFactory(field, appModel) {\n  return factories[field.type](field, appModel);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/view.js\n// module id = 15\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/view.js?");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseViewFactory = __webpack_require__(17);\nvar events = __webpack_require__(18);\nvar dom = __webpack_require__(14);\nvar prop = __webpack_require__(19);\nvar debounce = __webpack_require__(24);\n\n__webpack_require__(25);\n\nmodule.exports = function textViewFactory(field) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'field');\n\n  var _baseViewFactory = baseViewFactory(field, el),\n      syncFilter = _baseViewFactory.syncFilter;\n\n  var inputEl = dom('input', 'field-text__input t-input');\n  var resetEl = dom('span', 'field__filter-reset t-btn');\n\n  prop(inputEl, ['type', 'text', 'value', field.query().value, 'title', 'Filter by ' + field.label]);\n  prop(resetEl, ['title', 'Reset ' + field.label + ' filter']);\n\n  el.appendChild(dom('div', 'field__filter', [events(inputEl, { keyup: debounce(setFilter) }), events(resetEl, { click: resetFilter })]));\n\n  function setFilter() {\n    field.setValue(inputEl.value);\n    syncFilter();\n  }\n\n  function resetFilter() {\n    field.resetValue();\n    inputEl.value = '';\n    syncFilter();\n  }\n\n  function update() {}\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/text/view.js\n// module id = 16\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/text/view.js?");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar events = __webpack_require__(18);\nvar dom = __webpack_require__(14);\nvar prop = __webpack_require__(19);\n\n__webpack_require__(20);\n\nmodule.exports = function baseViewFactory(field) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'field');\n\n  var markerEl = dom('span', 'field__sort-icon t-btn is-' + field.config.order);\n  var sortEl = dom('div', 'field__sort t-label', [dom('span', 'field__sort-text', field.label), markerEl]);\n\n  events(sortEl, { click: setSort });\n  prop(sortEl, ['title', 'Sort by ' + field.label]);\n\n  el.appendChild(sortEl);\n\n  function setSort() {\n    field.makeSort();\n    el.classList.remove('is-sort-1');\n    el.classList.remove('is-sort--1');\n    if (field.hasSort()) {\n      el.classList.add('is-sort-' + field.query().order);\n    }\n  }\n\n  function syncFilter() {\n    if (field.hasValue()) {\n      el.classList.add('is-filter-active');\n    } else {\n      el.classList.remove('is-filter-active');\n    }\n  }\n\n  return {\n    el: el,\n    syncFilter: syncFilter\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/base/view.js\n// module id = 17\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/base/view.js?");

/***/ },
/* 18 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\n/**\r\n * Binds events to the element. No delegation. The same hash can be used unbind these events.\r\n * No events are unbound in the application, so there's no function that does this.\r\n * @param  {HTMLElement} el        Element to add listeners.\r\n * @param  {Object} eventHash      Object where keys are event names, and values are handlers.\r\n * @return {HTMLElement}           Element paased as an argument.\r\n */\nmodule.exports = function events(el, eventHash) {\n  Object.keys(eventHash).forEach(function (eventName) {\n    return el.addEventListener(eventName, eventHash[eventName]);\n  });\n\n  return el;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/events.js\n// module id = 18\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/events.js?");

/***/ },
/* 19 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nvar PAIR = 2;\n\n/**\r\n * Sets properties (not attributes) on the given el.\r\n * @param  {HTMLElement} el    Element to recieve properties.\r\n * @param  {Array} pairs       Even length array, where odd position contain keys, and even position contain their values.\r\n * @return {HTMLElement}       Element paased as an argument.\r\n */\nmodule.exports = function prop(el, pairs) {\n  for (var i = 0; i < pairs.length; i += PAIR) {\n    /* If this crashes, most probably odd length of pairs array. */\n    el[pairs[i]] = pairs[i + 1];\n  }\n\n  return el;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/prop.js\n// module id = 19\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/prop.js?");

/***/ },
/* 20 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/base/style/index.scss\n// module id = 20\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/base/style/index.scss?");

/***/ },
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nvar defaultDebounce = 250;\n\n/**\r\n * Delays execution of a function untill specified time passed since last call.\r\n * Since there is no `this` or some specific context in application, no context support is required.\r\n * @param  {Function} debouncedFn Function to be debeounced.\r\n * @param  {number} [msToWait=250]      Duration in miliseconds to wait. Default 250ms;\r\n * @return {Function}             Exposed function that when called, resets time to next call of debeounced function.\r\n */\nmodule.exports = function debounce(debouncedFn) {\n  var msToWait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDebounce;\n\n  var timeout = void 0;\n  var args = void 0;\n\n  /**\r\n   * Calls debounced function with last passed arguments.\r\n   * @return {mixed} Result of the debounced function.\r\n   */\n  function later() {\n    timeout = null;\n\n    return debouncedFn(args);\n  }\n\n  /**\r\n   * Exposed function to start and reset debounce timeout.\r\n   * @return {undefined} Nothing.\r\n   */\n  return function exposed() {\n    args = arguments;\n\n    clearTimeout(timeout);\n    timeout = setTimeout(later, msToWait);\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/debounce.js\n// module id = 24\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/debounce.js?");

/***/ },
/* 25 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/text/style.scss\n// module id = 25\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/text/style.scss?");

/***/ },
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseViewFactory = __webpack_require__(17);\nvar events = __webpack_require__(18);\nvar dom = __webpack_require__(14);\nvar prop = __webpack_require__(19);\nvar debounce = __webpack_require__(24);\n\n__webpack_require__(28);\n\nmodule.exports = function textViewFactory(field) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'field');\n\n  var _baseViewFactory = baseViewFactory(field, el),\n      syncFilter = _baseViewFactory.syncFilter;\n\n  var _field$query = field.query(),\n      label = _field$query.label,\n      fromValue = _field$query.fromValue,\n      toValue = _field$query.toValue;\n\n  var fromEl = dom('input', 'field-range__input t-input');\n  var toEl = dom('input', 'field-range__input t-input');\n  var resetEl = dom('span', 'field__filter-reset t-btn');\n\n  el.appendChild(dom('div', 'field__filter', [dom('span', 'field-range__text t-hint', 'From'), prop(fromEl, ['type', 'text', 'value', fromValue, 'title', 'Set minimum ' + label]), dom('span', 'field-range__text t-hint', 'To'), prop(toEl, ['type', 'text', 'value', toValue, 'title', 'Set maximum ' + label]), prop(resetEl, ['title', 'Reset ' + label + ' filter'])]));\n\n  function setFromValue() {\n    field.setFromValue(fromEl.value);\n    syncFilter();\n  }\n\n  function setToValue() {\n    field.setToValue(toEl.value);\n    syncFilter();\n  }\n\n  function resetFilter() {\n    field.resetValue();\n    fromEl.value = '';\n    toEl.value = '';\n    syncFilter();\n  }\n\n  events(fromEl, { keyup: debounce(setFromValue) });\n  events(toEl, { keyup: debounce(setToValue) });\n  events(resetEl, { click: resetFilter });\n\n  function update() {\n    var _field$query2 = field.query(),\n        stats = _field$query2.stats;\n\n    fromEl.placeholder = stats[5].value;\n    toEl.placeholder = stats[3].value;\n  }\n\n  update();\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/range/view.js\n// module id = 27\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/range/view.js?");

/***/ },
/* 28 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/range/style.scss\n// module id = 28\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/range/style.scss?");

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseViewFactory = __webpack_require__(17);\nvar prop = __webpack_require__(19);\nvar events = __webpack_require__(18);\nvar dom = __webpack_require__(14);\nvar selectViewFactory = __webpack_require__(31);\n\n__webpack_require__(33);\n\nmodule.exports = function textViewFactory(field) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'field');\n\n  var _baseViewFactory = baseViewFactory(field, el),\n      syncFilter = _baseViewFactory.syncFilter;\n\n  var selectView = selectViewFactory(field);\n  var resetEl = dom('span', 'field__filter-reset t-btn');\n\n  prop(resetEl, ['title', 'Reset ' + field.label + ' filter']);\n  events(resetEl, { click: resetFilter });\n  events(selectView.el, { change: setFilterValue });\n\n  el.appendChild(dom('div', 'field__filter', [selectView.el, resetEl]));\n\n  function setFilterValue() {\n    field.selectValue(selectView.el.value);\n    syncFilter();\n  }\n\n  function resetFilter() {\n    field.resetValue();\n    selectView.reset();\n    syncFilter();\n  }\n\n  function update() {}\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/dictionary/view.js\n// module id = 30\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/dictionary/view.js?");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dom = __webpack_require__(14);\nvar prop = __webpack_require__(19);\nvar fragment = __webpack_require__(32);\n\nmodule.exports = function selectViewFactory(field) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('select', 'field-dictionary__select t-input');\n\n  prop(el, ['title', 'Filter by ' + field.label]);\n\n  var _field$query = field.query(),\n      options = _field$query.options,\n      selected = _field$query.selected;\n\n  var frag = fragment();\n  var optionsEls = [''].concat(options).map(function (option) {\n    var optionEl = dom('option', '', option);\n\n    if (selected.indexOf(option) > -1) {\n      prop(optionEl, [option.selected, true]);\n    }\n    frag.appendChild(optionEl);\n\n    return optionEl;\n  });\n\n  el.appendChild(frag);\n\n  function reset() {\n    optionsEls.forEach(function (optionEl) {\n      optionEl.selected = false;\n    });\n  }\n\n  return {\n    reset: reset,\n    el: el\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/dictionary/selectView.js\n// module id = 31\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/dictionary/selectView.js?");

/***/ },
/* 32 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\n/**\r\n * Creates new document fragment.\r\n * @return {DocumentFragment} Created documentFragment;\r\n */\nmodule.exports = function fragment() {\n  return document.createDocumentFragment();\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/fragment.js\n// module id = 32\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/fragment.js?");

/***/ },
/* 33 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/dictionary/style.scss\n// module id = 33\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/dictionary/style.scss?");

/***/ },
/* 34 */,
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar baseViewFactory = __webpack_require__(17);\nvar events = __webpack_require__(18);\nvar dom = __webpack_require__(14);\nvar prop = __webpack_require__(19);\nvar debounce = __webpack_require__(24);\n\n__webpack_require__(36);\n\nmodule.exports = function dateViewFactory(field) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'field');\n\n  var _baseViewFactory = baseViewFactory(field, el),\n      syncFilter = _baseViewFactory.syncFilter;\n\n  var _field$query = field.query(),\n      label = _field$query.label,\n      fromDate = _field$query.fromDate,\n      toDate = _field$query.toDate;\n\n  var fromEl = dom('input', 'field-date__input t-input');\n  var toEl = dom('input', 'field-date__input t-input');\n  var resetEl = dom('span', 'field__filter-reset t-btn');\n\n  el.appendChild(dom('div', 'field__filter', [dom('span', 'field-date__text t-hint', 'From'), prop(fromEl, ['type', 'text', 'value', fromDate, 'title', 'Set minimum ' + label, 'placeholder', '2016-12-31']), dom('span', 'field-date__text t-hint', 'To'), prop(toEl, ['type', 'text', 'value', toDate, 'title', 'Set maximum ' + label, 'placeholder', '2016-12-31']), prop(resetEl, ['title', 'Reset ' + label + ' filter'])]));\n\n  function setFromValue() {\n    field.setFromValue(fromEl.value);\n    syncFilter();\n  }\n\n  function setToValue() {\n    field.setToValue(toEl.value);\n    syncFilter();\n  }\n\n  function resetFilter() {\n    field.resetValue();\n    fromEl.value = '';\n    toEl.value = '';\n    syncFilter();\n  }\n\n  events(fromEl, { keyup: debounce(setFromValue) });\n  events(toEl, { keyup: debounce(setToValue) });\n  events(resetEl, { click: resetFilter });\n\n  function update() {\n    // const { stats } = field.query();\n\n    // fromEl.placeholder = stats[5].value;\n    // toEl.placeholder = stats[3].value;\n  }\n\n  update();\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/date/view.js\n// module id = 35\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/date/view.js?");

/***/ },
/* 36 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/types/date/style.scss\n// module id = 36\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/types/date/style.scss?");

/***/ },
/* 37 */,
/* 38 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/fields/style.scss\n// module id = 38\n// module chunks = 0\n//# sourceURL=webpack:///./src/fields/style.scss?");

/***/ },
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dom = __webpack_require__(14);\n\n__webpack_require__(41);\n\nmodule.exports = function countViewFactory(appModel) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'count');\n\n  var visible = dom('header', 'count__visible t-value');\n  var filtered = dom('footer', 'count__filtered t-hint');\n\n  el.appendChild(visible);\n  el.appendChild(filtered);\n\n  function update() {\n    var _appModel$query = appModel.query(),\n        count = _appModel$query.count,\n        totalCount = _appModel$query.totalCount;\n\n    visible.textContent = count + ' items';\n    filtered.textContent = totalCount - count + ' filtered out';\n  }\n\n  update();\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/count/view.js\n// module id = 40\n// module chunks = 0\n//# sourceURL=webpack:///./src/count/view.js?");

/***/ },
/* 41 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/count/style.scss\n// module id = 41\n// module chunks = 0\n//# sourceURL=webpack:///./src/count/style.scss?");

/***/ },
/* 42 */,
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar getItem = __webpack_require__(44);\nvar dom = __webpack_require__(14);\nvar empty = __webpack_require__(45);\nvar fragment = __webpack_require__(32);\n\n__webpack_require__(46);\n\nmodule.exports = function listViewFactory(appModel) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('main', 'item-list');\n\n  var noMatchEl = dom('div', 'item-list__message', 'No items match filters.');\n\n  function update() {\n    var _appModel$query = appModel.query(),\n        items = _appModel$query.items,\n        schema = _appModel$query.schema;\n\n    empty(el);\n    if (items.length) {\n      (function () {\n        var frag = fragment();\n\n        items.forEach(function (item) {\n          return frag.appendChild(getItem(item, schema));\n        });\n\n        el.appendChild(frag);\n      })();\n    } else {\n      el.appendChild(noMatchEl);\n    }\n\n    return el;\n  }\n\n  update();\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/list/view.js\n// module id = 43\n// module chunks = 0\n//# sourceURL=webpack:///./src/list/view.js?");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dom = __webpack_require__(14);\nvar prop = __webpack_require__(19);\nvar fragment = __webpack_require__(32);\n\nvar getters = {\n  header: function header(def, item) {\n    return dom('span', 'item__title t-header', item[def.key]);\n  },\n  warning: function warning(def, item) {\n    var value = item[def.key];\n    var frag = fragment();\n\n    /* Use fragment to avoid the need for flattening the arrays. */\n    value.forEach(function (val) {\n      return frag.appendChild(dom('li', 'item-warning__item', val));\n    });\n\n    return frag;\n  },\n\n  content: function content(def, item) {\n    return dom('p', 'item__content', item[def.key]);\n  },\n  details: function details(def, item) {\n    var value = item[def.key];\n\n    return dom('section', 'item-detail t-hint', [dom('header', 'item-detail__header', def.label), dom('ul', 'item-detail__list', value.map(function (detail) {\n      return dom('li', 'item-detail__list-item', detail);\n    }))]);\n  },\n  summary: function summary(def, item) {\n    var content = def.template.replace(/#\\{([^}]+)\\}/g, function (match, key) {\n      return item[key];\n    });\n\n    return dom('li', def.ranked ? 'item-summary__list-item t-rank__text--' + item[def.key + 'Level'] : 'item-summary__list-item', content);\n  }\n};\n\nfunction check(def, item) {\n  if (def.hidden) {\n    return false;\n  }\n  var value = item[def.key];\n\n  return value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length);\n}\n\nvar getterKeys = Object.keys(getters);\n\nfunction domWarning(warning) {\n  if (!warning.length) {\n    return [];\n  }\n\n  return dom('span', 'item-warning', [dom('span', 'item-warning__icon t-warn', '?'), dom('ul', 'item-warning__list t-box', [dom('li', '', 'Info might be incorrect. Reasons:')].concat(warning))]);\n}\n\nfunction getLink(def, item) {\n  var url = def.template.replace(/#\\{([^}]+)\\}/g, function (match, key) {\n    return item[key];\n  });\n  var anchor = dom('a', 'item__link', prop(dom('img'), ['src', '/data/' + def.key + '.png']));\n\n  return prop(anchor, ['target', '_blank', 'title', 'Search in ' + def.label, 'href', url]);\n}\n\nmodule.exports = function getItem(item, schema) {\n  var el = item.__el;\n\n  if (el) {\n    return el;\n  }\n\n  var _getterKeys$reduce = getterKeys.reduce(function (acc, key) {\n    acc[key] = schema[key].filter(function (def) {\n      return check(def, item);\n    }).map(function (def) {\n      return getters[key](def, item);\n    });\n\n    return acc;\n  }, {}),\n      header = _getterKeys$reduce.header,\n      warning = _getterKeys$reduce.warning,\n      content = _getterKeys$reduce.content,\n      details = _getterKeys$reduce.details,\n      summary = _getterKeys$reduce.summary;\n\n  var headerContent = dom('header', 'item__header', header.concat(domWarning(warning)));\n  var links = schema.links.filter(function (def) {\n    return !def.hidden;\n  }).map(function (def) {\n    return getLink(def, item);\n  });\n\n  item.__el = dom('section', 'item t-box', [dom('article', 'item__description', [headerContent].concat(content, details)), dom('aside', 'item-summary', dom('ul', 'item-summary__list', [dom('li', 'item-summary__list-item', links)].concat(summary)))]);\n\n  return item.__el;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/list/getItem.js\n// module id = 44\n// module chunks = 0\n//# sourceURL=webpack:///./src/list/getItem.js?");

/***/ },
/* 45 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\n/**\r\n * Deeply dispatches whole element tree inside element.\r\n * @param  {HTMLElement} el Element to be fully cleared.\r\n * @return {HTMLElement}    Element paased as an argument.\r\n */\nfunction teardown(el) {\n  while (el.firstChild) {\n    teardown(el.removeChild(el.firstChild));\n  }\n\n  return el;\n}\n\n/**\r\n * Removes immediate children of the node.\r\n * @param  {HTMLElement}  el           Element to be cleared.\r\n * @param  {Boolean} [deeply=false]    Should remove all children of all children.\r\n * @return {HTMLElement}                Element paased as an argument.\r\n */\nmodule.exports = function empty(el) {\n  var deeply = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n  if (deeply) {\n    return teardown(el);\n  }\n  while (el.firstChild) {\n    el.removeChild(el.firstChild);\n  }\n\n  return el;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/empty.js\n// module id = 45\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/empty.js?");

/***/ },
/* 46 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/list/style/index.scss\n// module id = 46\n// module chunks = 0\n//# sourceURL=webpack:///./src/list/style/index.scss?");

/***/ },
/* 47 */,
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dom = __webpack_require__(14);\n\n__webpack_require__(49);\n\nvar levelCount = 5;\n\nmodule.exports = function legendViewFactory(appModel) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'legend');\n\n  var levels = [];\n\n  for (var i = levelCount; i > -1; i--) {\n    levels.push(dom('li', 'legend__item t-rank__bg--' + i + ' t-hint'));\n  }\n\n  var header = dom('header', 'legend__header t-header', 'Ranking');\n  var list = dom('ul', 'legend__list', levels);\n\n  el.appendChild(header);\n  el.appendChild(list);\n\n  return { el: el };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/legend/view.js\n// module id = 48\n// module chunks = 0\n//# sourceURL=webpack:///./src/legend/view.js?");

/***/ },
/* 49 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/legend/style.scss\n// module id = 49\n// module chunks = 0\n//# sourceURL=webpack:///./src/legend/style.scss?");

/***/ },
/* 50 */,
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dom = __webpack_require__(14);\nvar statViewFactory = __webpack_require__(52);\n\n__webpack_require__(53);\n\nmodule.exports = function statsViewFactory(appModel) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'stat-list');\n\n  var statViews = appModel.query().fields.filter(function (field) {\n    return field.stat;\n  }).map(function (field) {\n    return statViewFactory(field);\n  });\n\n  statViews.forEach(function (statView) {\n    return el.appendChild(statView.el);\n  });\n\n  function update() {\n    statViews.forEach(function (statView) {\n      return statView.update();\n    });\n  }\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/stats/view.js\n// module id = 51\n// module chunks = 0\n//# sourceURL=webpack:///./src/stats/view.js?");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar dom = __webpack_require__(14);\nvar empty = __webpack_require__(45);\n\nmodule.exports = function statViewFactory(field) {\n  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dom('section', 'stat');\n\n  var ulEl = dom('ul', 'stat__item-list', field.query().stats.map(domStatItem));\n\n  function domStatItem(item) {\n    return dom('li', 'stat__item', [dom('span', 'stat-item__value t-value ' + (item.rounded ? 'is-rounded' : ''), item.value), dom('span', 'stat-item__label t-hint', item.key)]);\n  }\n\n  el.appendChild(dom('header', 'stat__header t-header', field.label));\n  el.appendChild(ulEl);\n\n  function update() {\n    empty(ulEl);\n    field.query().stats.map(domStatItem).forEach(function (li) {\n      return ulEl.appendChild(li);\n    });\n  }\n\n  return {\n    el: el,\n    update: update\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/stats/statView.js\n// module id = 52\n// module chunks = 0\n//# sourceURL=webpack:///./src/stats/statView.js?");

/***/ },
/* 53 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/stats/style.scss\n// module id = 53\n// module chunks = 0\n//# sourceURL=webpack:///./src/stats/style.scss?");

/***/ },
/* 54 */,
/* 55 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/app/style.scss\n// module id = 55\n// module chunks = 0\n//# sourceURL=webpack:///./src/app/style.scss?");

/***/ },
/* 56 */,
/* 57 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar HTTP_OK = 200;\nvar HTTP_ERROR = 400;\n\n/**\r\n * Fetches and parsed Json from given url. Window.fetch is not supported in some browsers.\r\n * @param  {String} url Address to query for data.\r\n * @return {Promise}    Promise resolving to parsed data recieved in the request.\r\n */\n\nmodule.exports = function fetchJson(url) {\n  return new Promise(function (resolve, reject) {\n    var request = new XMLHttpRequest();\n\n    request.onload = function () {\n      if (request.status >= HTTP_OK && request.status < HTTP_ERROR) {\n        resolve(JSON.parse(this.responseText));\n      } else {\n        reject(request.statusText);\n      }\n    };\n    request.onerror = reject;\n    request.open('GET', url, true);\n    request.send();\n  });\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/fetchJson.js\n// module id = 57\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/fetchJson.js?");

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"favicon.ico\";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/favicon.ico\n// module id = 58\n// module chunks = 0\n//# sourceURL=webpack:///./src/favicon.ico?");

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"themes/dark.css\";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/themes/dark.scss\n// module id = 59\n// module chunks = 0\n//# sourceURL=webpack:///./src/themes/dark.scss?");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"themes/light.css\";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/themes/light.scss\n// module id = 60\n// module chunks = 0\n//# sourceURL=webpack:///./src/themes/light.scss?");

/***/ }
/******/ ]);