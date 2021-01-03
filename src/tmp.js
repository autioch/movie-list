import FilterList from './filterList';
import ItemList from './itemList';
import StatList from './statList';
import About from './about';

import './App.scss';
import './themes/light.scss';
import Menu from './menu';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function tmp({ count, filters, isLoading, items, schema, resetFilter, setFilterValue, setSort }) {
  return (
    <Router>
      <div className="app">
        <Menu
          filtersApplied={filters.some((filter) => filter.isApplied)}
          count={count}
        />
        <div className="app-content">
          <Switch>
            <Route path="/filterList">
              <FilterList filters={filters} resetFilter={resetFilter} setFilterValue={setFilterValue} setSort={setSort} />
            </Route>
            <Route path="/statList">
              <StatList filters={filters} items={items} />
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
