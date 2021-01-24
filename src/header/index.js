import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '../consts';
import { useStore } from '../store';
import './index.scss';

const suffix = (count, labels) => `${count} ${count === 1 ? labels.item : labels.items}`;

export default function Header() {
  const [state] = useStore();
  const { schema: { labels }, items } = state;

  return (
    <div className="app-box app-header">
      <Switch>
        <Route path={ROUTES.FILTER_LIST}>
          Apply filters
        </Route>
        <Route path={ROUTES.STAT_LIST}>
          Statistics
        </Route>
        <Route path={ROUTES.ABOUT}>
          FAQ
        </Route>
        <Route path={ROUTES.SETTINGS}>
          Settings
        </Route>
        <Route path={ROUTES.ITEM_LIST}>
          {suffix(items.length, labels)}
        </Route>
      </Switch>
    </div>
  );
}
