import './index.scss';
import { Typography, Checkbox } from 'antd';
import { getLabel } from '../utils';
import { useStore } from '../store';
import { actionFieldToggleVisibility } from '../reducer';

const { Title } = Typography;

function Section({ label, fields = [], hiddenFields, dispatch }) {
  return (
    <section className="settings-section">
      <Title level={5}>{getLabel(label)}</Title>
      <ul>
        {fields.map(({ key }) =>
          <Checkbox className="settings-item" key={key} checked={!hiddenFields[key]} onChange={() => dispatch(actionFieldToggleVisibility(key))}>
            {getLabel(key)}
          </Checkbox>
        )}
      </ul>
    </section>
  );
}

export default function StatList() {
  const [state, dispatch] = useStore();
  const { schema, hiddenFields } = state;

  return (
    <div className="settings">
      <Title level={3}>Settings</Title>
      <Title level={4}>Visibility</Title>
      <div className="cols">
        <div className="col-left">
          <Section label="Header" fields={schema.header} hiddenFields={hiddenFields} dispatch={dispatch}/>
          <Section label="Content" fields={schema.content} hiddenFields={hiddenFields} dispatch={dispatch} />
          <Section label="Footnotes" fields={schema.footnotes} hiddenFields={hiddenFields} dispatch={dispatch} />
        </div>
        <div className="col-right">
          <Section label="Links" fields={schema.links} hiddenFields={hiddenFields} dispatch={dispatch}/>
          <Section label="Sidenotes" fields={schema.sidenotes} hiddenFields={hiddenFields} dispatch={dispatch}/>
        </div>
      </div>
    </div>
  );
}
