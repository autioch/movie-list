import fieldViewFactory from 'fields/types/view';
import './style.scss';


export default function Fields({ appModel }) {
  return (
    <div className="field-list">
   {appModel
     .query()
     .fields
     .filter((field) => !field.config.hidden)
     .map((field) => fieldViewFactory(field))}
    </div>
  )
};
