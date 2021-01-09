import './index.scss';
import { Typography, Checkbox } from 'antd';
import { getLabel } from '../utils';
import { useStore } from '../store';
import { actionFieldToggleVisibility, actionFieldSetVisibility } from '../reducer';

const { Title } = Typography;

function Section({ label, fields = [], hiddenFields, dispatch }) {
  const checkedCount = fields.filter(({ key }) => !hiddenFields[key]).length;
  const isChecked = checkedCount === fields.length;
  const isIndeterminate = checkedCount > 0 && !isChecked;

  return (
    <section className="settings-section">
      <Checkbox
        className="settings-header"
        checked={isChecked}
        indeterminate={isIndeterminate}
        onChange={() => dispatch(actionFieldSetVisibility(fields.map(({ key }) => key), !!isChecked))}
      >
        {getLabel(label)}
      </Checkbox>
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
      <Title level={4}>Item details</Title>
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
