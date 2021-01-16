import { ORDER_NEXT } from './consts';
import getItems from './getItems';
import { getHiddenFields } from './utils';

export const FIELD_TOGGLE_VISIBILITY = 'FIELD_TOGGLE_VISIBILITY';
export const FIELD_SET_VISIBILITY = 'FIELD_SET_VISIBILITY';
export const FILTER_SET_SORT = 'FILTER_SET_SORT';
export const FILTER_SET_VALUE = 'FILTER_SET_VALUE';

// export const ITEMS_LOAD = 'ITEMS_LOAD';
export const ITEMS_SET = 'ITEMS_SET';

// export const SCHEMA_LOAD = 'SCHEMA_LOAD';
export const SCHEMA_SET = 'SCHEMA_SET';
export const LOADING = 'LOADING';

export const initialState = {
  filterValues: {},
  filterCount: 0,
  isLoading: true,
  items: [],
  schema: {},
  sortOrders: {},
  hiddenFields: {},
  sortKeys: [],
  allItems: []
};

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

export function reducer(state, action) { // eslint-disable-line max-statements
  const { type, payload } = action;

  switch (type) {
    case LOADING: {
      const { isLoading } = payload;

      return {
        ...state,
        isLoading
      };
    }

    case ITEMS_SET: {
      const { allItems } = payload;
      const { sortKeys, sortOrders, schema, filterValues } = state;

      return {
        ...state,
        allItems,
        items: getItems(allItems, schema, sortKeys, sortOrders, filterValues)
      };
    }

    case SCHEMA_SET: {
      const { schema } = payload;
      const { sortKeys, sortOrders, allItems, filterValues } = state;

      return {
        ...state,
        schema,
        hiddenFields: getHiddenFields(schema),
        items: getItems(allItems, schema, sortKeys, sortOrders, filterValues)
      };
    }

    case FIELD_TOGGLE_VISIBILITY: {
      const { key } = payload;
      const { hiddenFields } = state;
      const changed = Object.fromEntries((Array.isArray(key) ? key : [key]).map((key2) => [key2, !hiddenFields[key2]]));

      return {
        ...state,
        hiddenFields: {
          ...hiddenFields,
          ...changed
        }
      };
    }

    case FIELD_SET_VISIBILITY: {
      const { key, isHidden } = payload;
      const { hiddenFields } = state;
      const changed = Object.fromEntries((Array.isArray(key) ? key : [key]).map((key2) => [key2, !!isHidden]));

      return {
        ...state,
        hiddenFields: {
          ...hiddenFields,
          ...changed
        }
      };
    }

    case FILTER_SET_SORT: {
      const { key } = payload;
      const { sortKeys, sortOrders, allItems, schema, filterValues } = state;

      const newSortKeys = [...sortKeys.filter((sortKey) => sortKey !== key), key];
      const newSortOrders = {
        ...sortOrders,
        [key]: ORDER_NEXT[sortOrders[key]]
      };

      return {
        ...state,
        sortKeys: newSortKeys,
        sortOrders: newSortOrders,
        items: getItems(allItems, schema, newSortKeys, newSortOrders, filterValues)
      };
    }

    case FILTER_SET_VALUE: {
      const { key, value } = payload;
      const { sortKeys, sortOrders, allItems, schema, filterValues } = state;

      const newFilterValues = {
        ...filterValues,
        [key]: value
      };

      return {
        ...state,
        filterValues: newFilterValues,
        filterCount: Object.values(newFilterValues).filter((val) => val !== undefined).length,
        items: getItems(allItems, schema, sortKeys, sortOrders, newFilterValues)
      };
    }

    default:
      return state;
  }
}
