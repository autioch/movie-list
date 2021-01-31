import { Switch, Route } from 'react-router-dom';

import About from '../components/about';
import FilterList from '../components/filterList';
import ItemList from '../components/itemList';
import Menu from '../components/menu';
import Settings from '../components/settings';
import StatList from '../components/statList';
import Header from '../components/header';

import { useStore } from '../store';
import { ROUTES } from '../consts';

export default function App() {
  const [state] = useStore();
  const { isLoading, items, schema, hiddenFields } = state;

  return (
    <div className="app-mobile">
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
    </div>
  );
}
