import { Typography, Checkbox, Button } from 'antd';
import { useStore } from '../store';
import { actionFieldToggleVisibility, actionFieldSetVisibility, actionFieldResetVisibility } from '../reducer';
import KeyLabel from '../components/keyLabel';
import './index.scss';

const { Title } = Typography;

function Section({ label, fields = [], hiddenFields, dispatch }) {
  const checkedCount = fields.filter(({ key }) => !hiddenFields[key]).length;
  const isChecked = checkedCount === fields.length;
  const isIndeterminate = checkedCount > 0 && !isChecked;

  return (
    <div>
      <Checkbox
        className="settings-header"
        checked={isChecked}
        indeterminate={isIndeterminate}
        onChange={() => dispatch(actionFieldSetVisibility(fields.map(({ key }) => key), !!isChecked))}
      >
        <KeyLabel text={label} />
      </Checkbox>
      <ul>
        {fields.map(({ key }) =>
          <Checkbox className="settings-item" key={key} checked={!hiddenFields[key]} onChange={() => dispatch(actionFieldToggleVisibility(key))}>
            <KeyLabel text={key} />
          </Checkbox>
        )}
      </ul>
    </div>
  );
}

export default function ItemDetails() {
  const [state, dispatch] = useStore();
  const { schema, hiddenFields } = state;

  return (
    <div className="settings-section">
      <Button onClick={() => dispatch(actionFieldResetVisibility())}>Reset all details</Button>
      <Title level={4}>{schema.labels.item} details</Title>
      <p>Control which details are visible for each {schema.labels.item}.</p>
      <div className="settings-cols">
        <div>
          <Section label="Header" fields={schema.header} hiddenFields={hiddenFields} dispatch={dispatch}/>
          <Section label="Content" fields={schema.content} hiddenFields={hiddenFields} dispatch={dispatch} />
          <Section label="Footnotes" fields={schema.footnotes} hiddenFields={hiddenFields} dispatch={dispatch} />
        </div>
        <div>
          <Section label="Links" fields={schema.links} hiddenFields={hiddenFields} dispatch={dispatch}/>
          <Section label="Sidenotes" fields={schema.sidenotes} hiddenFields={hiddenFields} dispatch={dispatch}/>
        </div>
      </div>
    </div>
  );
}
