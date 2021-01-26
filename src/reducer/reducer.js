import { ORDER_NEXT } from '../consts';
import getItems from './getItems';
import { getHiddenFields, getHiddenFilters } from './utils';
import localStorageWrapper from './localStorageWrapper';

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

const hiddenFiltersLS = localStorageWrapper('hiddenFilters');
const hiddenFieldsLS = localStorageWrapper('hiddenFields');

export const initialState = {
  allItems: [], // session
  filterCount: 0, // derived
  filterValues: {},
  hiddenFields: {}, // localStorage
  hiddenFilters: {}, // localStorage
  isLoading: true, // session
  applyFiltersToStatistics: true, // session
  items: [], // derived
  schema: {}, // session
  sortKeys: [],
  sortOrders: {}
};

const notUndefined = (val) => val !== undefined;

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
        hiddenFilters: getHiddenFilters(schema, hiddenFiltersLS.read()),
        hiddenFields: getHiddenFields(schema, hiddenFieldsLS.read()),
        items: getItems(allItems, schema, sortKeys, sortOrders, filterValues)
      };
    }

    case FIELD_TOGGLE_VISIBILITY: {
      const { key } = payload;
      const { hiddenFields } = state;
      const changed = Object.fromEntries((Array.isArray(key) ? key : [key]).map((key2) => [key2, !hiddenFields[key2]]));

      return {
        ...state,
        hiddenFields: hiddenFieldsLS.save({
          ...hiddenFields,
          ...changed
        })
      };
    }

    case FIELD_SET_VISIBILITY: {
      const { key, isHidden } = payload;
      const { hiddenFields } = state;
      const changed = Object.fromEntries((Array.isArray(key) ? key : [key]).map((key2) => [key2, !!isHidden]));

      return {
        ...state,
        hiddenFields: hiddenFieldsLS.save({
          ...hiddenFields,
          ...changed
        })
      };
    }

    case FIELD_RESET_VISIBILITY: {
      hiddenFieldsLS.clean();

      return {
        ...state,
        hiddenFields: getHiddenFields(state.schema, {})
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
        filterCount: Object.values(newFilterValues).filter(notUndefined).length,
        items: getItems(allItems, schema, sortKeys, sortOrders, newFilterValues)
      };
    }

    case FILTER_SET_VISIBILITY: {
      const { key, hidden } = payload;
      const { sortKeys, sortOrders, allItems, schema, filterValues, hiddenFilters } = state;

      const newFilterValues = {
        ...filterValues,
        [key]: undefined
      };

      const newSortKeys = sortKeys.filter((sortKey) => sortKey !== key);

      return {
        ...state,
        hiddenFilters: hiddenFiltersLS.save({
          ...hiddenFilters,
          [key]: !!hidden
        }),
        filterValues: newFilterValues,
        sortKeys: newSortKeys,
        filterCount: Object.values(newFilterValues).filter(notUndefined).length,
        items: getItems(allItems, schema, newSortKeys, sortOrders, newFilterValues)
      };
    }

    case FILTER_RESET_VISIBILITY: {
      hiddenFiltersLS.clean();
      const { allItems, schema } = state;

      return {
        ...state,
        hiddenFilters: getHiddenFilters(schema, hiddenFieldsLS.read()),
        filterValues: {},
        filterCount: 0,
        items: getItems(allItems, schema, [], {}, {}),
        sortKeys: [],
        sortOrders: {}
      };
    }

    case STATISTICS_WITH_FILTERS: {
      const { applyFiltersToStatistics } = payload;

      return {
        ...state,
        applyFiltersToStatistics
      };
    }

    default:
      return state;
  }
}
