import { useEffect } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useLocation } from 'react-router-dom';

import About from './about';
import FilterList from './filterList';
import ItemList from './itemList';
import Menu from './menu';
import Settings from './settings';
import StatList from './statList';

import { actionLoading, actionItemsSet, actionSchemaSet } from './reducer';
import { fetchJson, suffix } from './utils';
import { useStore } from './store';
import { ROUTES, ROUTE_LABELS } from './consts';
import 'antd/dist/antd.css';

export default function App() {
  const [state, dispatch] = useStore();
  const { isLoading, items, schema, hiddenFields } = state;
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(actionLoading(true));

    const schemaPromise = fetchJson(`data/schema.json`).then((newSchema) => dispatch(actionSchemaSet(newSchema)));
    const dataPromise = fetchJson(`data/items.json`).then((allItems) => dispatch(actionItemsSet(allItems)));

    Promise.all([schemaPromise, dataPromise]).then(() => dispatch(actionLoading(false)));

    // empty array to make this effect run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <div>
        {ROUTE_LABELS[pathname] || suffix(items.length, schema.labels)}
      </div>
      <div>
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
