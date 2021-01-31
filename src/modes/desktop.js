import { Collapse } from 'antd';

import About from '../components/about';
import FilterList from '../components/filterList';
import ItemList from '../components/itemList';
import Settings from '../components/settings';
import StatList from '../components/statList';

import { useStore } from '../store';
import './desktop.scss';

const { Panel } = Collapse;

export default function App() {
  const [state] = useStore();
  const { isLoading, items, schema, hiddenFields } = state;

  return (
    <div className="app-desktop">
      <FilterList />
      <ItemList
        isLoading={isLoading}
        schema={schema}
        items={items}
        hiddenFields={hiddenFields}
      />
      <div className="app-sidebar">

        <Collapse defaultActiveKey={['1']} accordion={true}>
          <Panel header="Statistics" key="1">
            <StatList/>
          </Panel>
          <Panel header="Settings" key="2">
            <Settings/>
          </Panel>
          <Panel header="About" key="3">
            <About />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
