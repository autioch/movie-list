import FilterList from './filterList';
import ItemList from './itemList';
import StatList from './statList';

import './App.scss';
import { Component } from 'react';
import fetchJson from './fetchJson';
import sortsModelFactory from './model/sorts';
import './themes/light.scss';
import { HAS_VALUE, RESET_VALUE, PREPARE_TEST, SET_VALUE, STATS, EXTRAS } from './model/actions';
import { ORDER } from './model/consts';
import Menu from './menu';
import 'antd/dist/antd.css';

function getLabel(key) {
  const label = key.replace(/\.?([A-Z]+)/g, (match, word) => ` ${word}`);

  return label[0].toUpperCase() + label.slice(1);
}

class App extends Component {
  state = {
    totalCount: 0,
    count: 0,
    stats: [],
    filters: [],
    isLoading: true,
    items: [],
    schema: {},

    allItems: [],
    filtersVisible: false,
    statsVisible: false
  }

  constructor(props) {
    super(props);
    this.resetFilter = this.resetFilter.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.toggleStats = this.toggleStats.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
    this.setSort = this.setSort.bind(this);
    this.sorts = sortsModelFactory();
  }

  componentDidMount() {
    this.setState(() => ({
      isLoading: true
    }));
    Promise
      .all([fetchJson('/data/schema.json'), fetchJson('/data/items.json')])
      .then(this.setupAppModel.bind(this));
  }

  setupAppModel([schema, items]) {
    const filters = schema.fields.filter((field) => !field.hidden).map(({ type, stat, key }) => ({
      id: key,
      key,
      type,
      stat,
      label: getLabel(key),
      order: ORDER.NONE
    }));

    this.setState({
      isLoading: false,
      allItems: items,
      totalCount: items.length,
      schema
    });

    this.syncFilters(filters);
  }

  syncFilters(filters) {
    const { allItems } = this.state;
    const items = allItems.slice(0);
    const filtered = filters
      .filter((field) => HAS_VALUE[field.type](field))
      .map((field) => PREPARE_TEST[field.type](field))
      .reduce((filteredItems, testFn) => filteredItems.filter(testFn), items);

    const currentItems = this.sorts.applySorts(filtered);
    const stats = filters
      .filter((field) => field.stat)
      .map((field) => STATS[field.type](field, currentItems))
      .filter(Boolean);

    this.setState({
      count: currentItems.length,
      stats,
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

  toggleFilters() {
    this.setState({
      statsVisible: false,
      filtersVisible: !this.state.filtersVisible
    });
  }

  toggleStats() {
    this.setState({
      statsVisible: !this.state.statsVisible,
      filtersVisible: false
    });
  }

  render() {
    const { totalCount, count, stats, filters, isLoading, items, schema, filtersVisible, statsVisible } = this.state;

    return (
      <div className="app">
        <Menu
          toggleFilters={this.toggleFilters}
          filtersVisible={filtersVisible}
          filtersApplied={filters.some((filter) => filter.isApplied)}
          toggleStats={this.toggleStats}
          statsVisible={statsVisible}
        />
        <div className="app-content">
          {filtersVisible ? <FilterList filters={filters} resetFilter={this.resetFilter} setFilterValue={this.setFilterValue} setSort={this.setSort} /> : ''}
          {statsVisible || filtersVisible ? '' : <ItemList isLoading={isLoading} schema={schema} items={items} /> }
          {statsVisible ? <StatList count={count} totalCount={totalCount} stats={stats} /> : ''}
        </div>
      </div>
    );
  }
}

export default App;
