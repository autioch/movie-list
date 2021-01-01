import Filters from './filters';
import Count from './count';
import Item from './item';
import Legend from './legend';
import Stat from './stat';
import './App.scss';
import { Component } from 'react';
import fetchJson from './fetchJson';
import sortsModelFactory from './model/sorts';
import './themes/light.scss';
import { HAS_VALUE, RESET_VALUE, PREPARE_TEST, SET_VALUE, STATS, EXTRAS } from './model/actions';
import { ORDER } from './model/consts';

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

  render() {
    const { totalCount, count, stats, filters, isLoading, items, schema } = this.state;

    return (
      <>
        <aside className="panel panel--left t-box">
          <div className="header">
            <h1 className="header__title t-header">Movie list</h1>
            <h2 className="header__description t-header">
                List of movies that I have watched. For various reasons I can suggest these movies to other people.
            </h2>
            <div className="js-errors t-warn"></div>
          </div>
          <Filters
            filters={filters}
            resetFilter={this.resetFilter}
            setFilterValue={this.setFilterValue}
            setSort={this.setSort}
          />
        </aside>
        <main className="item-list">
          {isLoading ? <div className="item-list__message">Loading movies...</div> : ''}
          {items.length ? '' : <div className="item-list__message">No items match filters.</div>}
          {items.map((item, index) => <Item schema={schema} item={item} key={index} />) }
        </main>
        <aside className="panel panel--right t-box">
          <Count count={count} totalCount={totalCount}/>
          <section className="stat-list">
            {stats.map((field, index) => <Stat field={field} key={index}/>)}
          </section>
          <Legend />
        </aside>
      </>
    );
  }
}

export default App;
