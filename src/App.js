import Filters from './filters';
import Count from './count';
import Item from './item';
import Legend from './legend';
import Stat from './stat';
import './App.scss';
import { Component } from 'react';
import fetchJson from './fetchJson';
import appModelFactory from './model';
import './themes/light.scss';

class App extends Component {
  state = {
    totalCount: 0,
    count: 0,
    stats: [],
    filters: [],
    isLoading: true,
    items: [],
    schema: {}
  }

  constructor(props) {
    super(props);
    this.resetFilter = this.resetFilter.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  componentDidMount() {
    Promise
      .all([fetchJson('/data/schema.json'), fetchJson('/data/items.json')])
      .then(this.setupAppModel.bind(this));
  }

  setupAppModel([schema, items]) {
    this.appModel = appModelFactory(schema, items);
    this.setState(this.appModel.toState());
    this.setState(() => ({
      isLoading: false
    }));
  }

  resetFilter(filterId) {
    this.appModel.resetFilter(filterId);
    this.setState(this.appModel.toState());
  }

  setFilterValue(filterId, filterValue) {
    this.appModel.setFilterValue(filterId, filterValue);
    this.setState(this.appModel.toState());
  }

  setSort(filterId) {
    this.appModel.setSort(filterId);
    this.setState(this.appModel.toState());
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
