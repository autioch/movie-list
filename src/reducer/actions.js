import {
  FIELD_RESET_VISIBILITY,
  FIELD_TOGGLE_VISIBILITY,
  FIELD_SET_VISIBILITY,

  FILTER_RESET_VISIBILITY,
  FILTER_SET_SORT,
  FILTER_SET_VALUE,
  FILTER_SET_VISIBILITY,

  STATISTICS_WITH_FILTERS,

  ITEMS_SET,
  SCHEMA_SET,
  LOADING
} from './actionTypes';

export function actionStatisticsWithFilters(applyFiltersToStatistics) {
  return {
    type: STATISTICS_WITH_FILTERS,
    payload: {
      applyFiltersToStatistics
    }
  };
}

export function actionFieldResetVisibility() {
  return {
    type: FIELD_RESET_VISIBILITY
  };
}

export function actionFilterResetVisibility() {
  return {
    type: FILTER_RESET_VISIBILITY
  };
}

export function actionFilterSetVisibility(key, hidden) {
  return {
    type: FILTER_SET_VISIBILITY,
    payload: {
      key,
      hidden
    }
  };
}

export function actionLoading(isLoading) {
  return {
    type: LOADING,
    payload: {
      isLoading
    }
  };
}

export function actionItemsSet(allItems) {
  return {
    type: ITEMS_SET,
    payload: {
      allItems
    }
  };
}

export function actionSchemaSet(schema) {
  return {
    type: SCHEMA_SET,
    payload: {
      schema
    }
  };
}

export function actionFieldToggleVisibility(key) {
  return {
    type: FIELD_TOGGLE_VISIBILITY,
    payload: {
      key
    }
  };
}

export function actionFieldSetVisibility(key, isHidden) {
  return {
    type: FIELD_SET_VISIBILITY,
    payload: {
      key,
      isHidden
    }
  };
}

export function actionFilterSetSort(key) {
  return {
    type: FILTER_SET_SORT,
    payload: {
      key
    }
  };
}

export function actionFilterSetValue(key, value) {
  return {
    type: FILTER_SET_VALUE,
    payload: {
      key,
      value
    }
  };
}
