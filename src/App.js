import './App.scss';
import { Component } from 'react';
import fetchJson from './fetchJson';
import sortsModelFactory from './model/sorts';
import './themes/light.scss';
import { HAS_VALUE, RESET_VALUE, PREPARE_TEST, SET_VALUE, EXTRAS } from './model/actions';
import { ORDER } from './model/consts';
import 'antd/dist/antd.css';
import Tmp from './tmp';

function getLabel(key) {
  const label = key.replace(/\.?([A-Z]+)/g, (match, word) => ` ${word}`);

  return label[0].toUpperCase() + label.slice(1);
}

class App extends Component {
  state = {
    totalCount: 0,
    count: 0,
    filters: [],
    isLoading: true,
    items: [],
    schema: {},

    allItems: []
  }

  constructor(props) {
    super(props);
    this.resetFilter = this.resetFilter.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
    this.setSort = this.setSort.bind(this);
    this.sorts = sortsModelFactory();
  }

  componentDidMount() {
    this.setState(() => ({
      isLoading: true
    }));

    const schemaPromise = fetchJson('/data/schema.json').then((schema) => {
      this.setState({
        schema,
        filters: schema.fields.filter((field) => !field.hidden).map(({ type, stat, key }) => ({
          id: key,
          key,
          type,
          stat,
          label: getLabel(key),
          order: ORDER.NONE
        }))
      });
    });
    const dataPromise = fetchJson('/data/items.json').then((items) => this.setState({
      allItems: items
    }));

    Promise
      .all([schemaPromise, dataPromise])
      .then(() => {
        this.setState({
          isLoading: false
        });
        this.syncFilters();
      });
  }

  syncFilters(filters = this.state.filters) {
    const { allItems } = this.state;
    const items = allItems.slice(0);
    const filtered = filters
      .filter((field) => HAS_VALUE[field.type](field))
      .map((field) => PREPARE_TEST[field.type](field))
      .reduce((filteredItems, testFn) => filteredItems.filter(testFn), items);

    const currentItems = this.sorts.applySorts(filtered);

    this.setState({
      count: currentItems.length,
      filters: filters.map((filter) => EXTRAS[filter.type](filter, currentItems)),
      isLoading: false,
      items: currentItems
    });
  }

  resetFilter(filterId) {
    const filters = this.state.filters.map((filter) => {
      if (filter.id === filterId) {
        return RESET_VALUE[filter.type](filter);
      }

      return filter;
    });

    this.syncFilters(filters);
  }

  setFilterValue(filterId, newValue) {
    const filters = this.state.filters.map((filter) => {
      if (filter.id === filterId) {
        return SET_VALUE[filter.type](filter, newValue);
      }

      return filter;
    });

    this.syncFilters(filters);
  }

  setSort(filterId) {
    const filters = this.state.filters.map((filter) => {
      if (filter.id === filterId) {
        return {
          ...filter,
          order: this.sorts.setSort(filterId)
        };
      }

      return filter;
    });

    this.syncFilters(filters);
  }

  render() {
    const { count, filters, isLoading, items, schema } = this.state;

    return (
      <Tmp
        count={count}
        filters={filters}
        isLoading={isLoading}
        items={items}
        schema={schema}
        resetFilter={this.resetFilter}
        setFilterValue={this.setFilterValue}
        setSort={this.setSort}
      />
    );
  }
}

export default App;
