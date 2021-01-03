import './App.scss';
import { Component } from 'react';
import fetchJson from './fetchJson';
import 'antd/dist/antd.css';
import './themes/light.scss';
import { ORDER_NEXT } from './consts';
import Tmp from './tmp';
import getItems from './getItems';

class App extends Component {
  state = {
    totalCount: 0,
    filters: [],
    filterValues: {},
    isLoading: true,
    items: [],
    schema: {},
    sortOrders: {},
    sortKeys: [],

    allItems: []
  }

  constructor(props) {
    super(props);
    this.resetFilter = this.resetFilter.bind(this);
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
        filters: schema.fields.filter((field) => !field.hidden).map((field) => ({
          id: field.key,
          ...field
        }))
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
    this.setState(({ allItems, filters, sortKeys, sortOrders, filterValues }) => ({
      items: getItems(allItems, filters, sortKeys, sortOrders, filterValues)
    }));
  }

  resetFilter(filterId) {
    this.setState({
      filterValues: {
        ...this.state.filterValues,
        [filterId]: undefined
      }
    });
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

  render() {
    const { filters, isLoading, items, schema, sortOrders, filterValues } = this.state;

    return (
      <Tmp
        filters={filters}
        isLoading={isLoading}
        items={items}
        schema={schema}
        sortOrders={sortOrders}
        filterValues={filterValues}
        resetFilter={this.resetFilter}
        setFilterValue={this.setFilterValue}
        setSort={this.setSort}
      />
    );
  }
}

export default App;
