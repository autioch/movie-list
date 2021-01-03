import FilterList from './filterList';
import ItemList from './itemList';
import StatList from './statList';
import About from './about';

import './App.scss';
import './themes/light.scss';
import Menu from './menu';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function tmp({ filters, isLoading, items, schema, resetFilter, setFilterValue, setSort, sortOrders, filterValues }) {
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
                filters={filters}
                resetFilter={resetFilter}
                setFilterValue={setFilterValue}
                setSort={setSort}
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
            <Route path="/">
              <ItemList isLoading={isLoading} schema={schema} items={items} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
