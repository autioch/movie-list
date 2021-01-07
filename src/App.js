import './App.scss';
import { useEffect } from 'react';
import fetchJson from './fetchJson';
import 'antd/dist/antd.css';
import './themes/light.scss';
import FilterList from './filterList';
import ItemList from './itemList';
import StatList from './statList';
import About from './about';
import Settings from './settings';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './menu';
import { useStore } from './store';
import { actionLoading, actionItemsSet, actionSchemaSet } from './reducer';
import { homepage } from '../package.json';

export default function App() {
  const [state, dispatch] = useStore();
  const { isLoading, items, schema, hiddenFields } = state;

  useEffect(() => {
    dispatch(actionLoading(true));

    const schemaPromise = fetchJson(`data/schema.json`).then((newSchema) => dispatch(actionSchemaSet(newSchema)));
    const dataPromise = fetchJson(`data/items.json`).then((allItems) => dispatch(actionItemsSet(allItems)));

    Promise.all([schemaPromise, dataPromise]).then(() => dispatch(actionLoading(false)));

    // empty array to make this effect run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router basename={homepage}>
      <div className="app">
        <Menu />
        <div className="app-content">
          <Switch>
            <Route path="/filterList">
              <FilterList />
            </Route>
            <Route path="/statList">
              <StatList/>
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/settings">
              <Settings/>
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
