import { useLocation } from 'react-router-dom';
import { ROUTES } from '../consts';
import { useStore } from '../store';
import './index.scss';

const suffix = (count, labels) => `${count} ${count === 1 ? labels.item : labels.items}`;

const HEADERS = {
  [ROUTES.FILTER_LIST]: 'Apply filters',
  [ROUTES.STAT_LIST]: 'Statistics',
  [ROUTES.ABOUT]: 'FAQ',
  [ROUTES.SETTINGS]: 'Settings',
  [ROUTES.ITEM_LIST]: 'Apply filters'
};

export default function Header() {
  const { pathname } = useLocation();
  const [state] = useStore();
  const { schema: { labels }, items } = state;

  return (
    <div className="app-box app-header">
      {HEADERS[pathname] || suffix(items.length, labels)}
    </div>
  );
}
