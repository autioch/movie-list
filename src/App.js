import { useEffect } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';

import About from './about';
import FilterList from './filterList';
import ItemList from './itemList';
import Menu from './menu';
import Settings from './settings';
import StatList from './statList';
import Header from './header';

import { actionLoading, actionItemsSet, actionSchemaSet } from './reducer';
import { fetchJson } from './utils';
import { useStore } from './store';
import { ROUTES } from './consts';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.scss';

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

  if (isLoading) {
    return (
      <div className="loader">
        <Spin indicator={<LoadingOutlined style={{
          fontSize: 60 // eslint-disable-line no-magic-numbers
        }} spin />} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="app-content">
        <Switch>
          <Route path={ROUTES.FILTER_LIST}>
            <FilterList />
          </Route>
          <Route path={ROUTES.STAT_LIST}>
            <StatList/>
          </Route>
          <Route path={ROUTES.ABOUT}>
            <About />
          </Route>
          <Route path={ROUTES.SETTINGS}>
            <Settings/>
          </Route>
          <Route path={ROUTES.ITEM_LIST}>
            <ItemList
              isLoading={isLoading}
              schema={schema}
              items={items}
              hiddenFields={hiddenFields}
            />
          </Route>
        </Switch>
      </div>
      <Menu />
    </>
  );
}
