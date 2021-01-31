import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Loader from './components/loader';
import MobileMode from './modes/mobile';
import DesktopMode from './modes/desktop';
import { actionLoading, actionItemsSet, actionSchemaSet } from './reducer';
import { fetchJson } from './utils';
import { useStore } from './store';
import 'antd/dist/antd.css';
import './App.scss';

export default function App() {
  const [state, dispatch] = useStore();
  const { isLoading } = state;

  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1200px)'
  });

  useEffect(() => {
    dispatch(actionLoading(true));

    const schemaPromise = fetchJson(`data/schema.json`).then((newSchema) => dispatch(actionSchemaSet(newSchema)));
    const dataPromise = fetchJson(`data/items.json`).then((allItems) => dispatch(actionItemsSet(allItems)));

    Promise.all([schemaPromise, dataPromise]).then(() => dispatch(actionLoading(false)));

    // empty array to make this effect run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (<Loader/>);
  }

  return (
    isTabletOrMobile ? <MobileMode /> : <DesktopMode />
  );
}
