import './App.scss';
import { Component } from 'react';
import fetchJson from './fetchJson';
import 'antd/dist/antd.css';
import './themes/light.scss';
import { ORDER_NEXT } from './consts';
import getItems from './getItems';
import FilterList from './filterList';
import ItemList from './itemList';
import StatList from './statList';
import About from './about';
import Settings from './settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './menu';
import { getHiddenFields } from './utils';

class App extends Component {
  state = {
    filterValues: {},
    isLoading: true,
    items: [],
    schema: {},
    sortOrders: {},
    hiddenFields: {},
    sortKeys: [],
    allItems: []
  }

  constructor(props) {
    super(props);
    this.toggleFieldVisibility = this.toggleFieldVisibility.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({
      isLoading: true
    }));

    const schemaPromise = fetchJson('/data/schema.json').then((schema) => {
      this.setState({
        schema,
        hiddenFields: getHiddenFields(schema)
      });
      this.syncItems();
    });

    const dataPromise = fetchJson('/data/items.json').then((allItems) => {
      this.setState({
        allItems
      });
      this.syncItems();
    });

    Promise
      .all([schemaPromise, dataPromise])
      .then(() => this.setState({
        isLoading: false
      }));
  }

  syncItems() {
    this.setState(({ allItems, schema, sortKeys, sortOrders, filterValues }) => ({
      items: getItems(allItems, schema, sortKeys, sortOrders, filterValues)
    }));
  }

  setFilterValue(filterId, newValue) {
    this.setState({
      filterValues: {
        ...this.state.filterValues,
        [filterId]: newValue
      }
    });

    this.syncItems();
  }

  setSort(filterId) {
    const { sortKeys, sortOrders } = this.state;

    this.setState({
      sortKeys: [...sortKeys.filter((sortKey) => sortKey !== filterId), filterId],
      sortOrders: {
        ...sortOrders,
        [filterId]: ORDER_NEXT[sortOrders[filterId]]
      }
    });

    this.syncItems();
  }

  toggleFieldVisibility(key) {
    const { hiddenFields } = this.state;

    this.setState({
      hiddenFields: {
        ...hiddenFields,
        [key]: !hiddenFields[key]
      }
    });
  }

  render() {
    const { isLoading, items, schema, sortOrders, filterValues, hiddenFields } = this.state;

    return (
      <Router>
        <div className="app">
          <Menu
            filtersApplied={Object.values(filterValues).some((value) => value !== undefined)}
            items={items}
          />
          <div className="app-content">
            <Switch>
              <Route path="/filterList">
                <FilterList
                  schema={schema}
                  setFilterValue={this.setFilterValue}
                  setSort={this.setSort}
                  sortOrders={sortOrders}
                  filterValues={filterValues}
                  items={items}
                />
              </Route>
              <Route path="/statList">
                <StatList schema={schema} items={items} />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/settings">
                <Settings
                  schema={schema}
                  hiddenFields={hiddenFields}
                  toggleFieldVisibility={this.toggleFieldVisibility}
                />
              </Route>
              <Route path="/">
                <ItemList
                  isLoading={isLoading}
                  schema={schema}
                  items={items}
                  hiddenFields={hiddenFields}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
