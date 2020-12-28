import Item from './item';
import './style.scss';

export default function List({ appModel, el }) {
  const { isLoading, items, schema } = appModel.query();

  return (
    <main className="item-list js-center">
    {isLoading ? <div className="item-list__message">Loading movies...</div> : ''}
    {!items.length ? <div className="item-list__message">No items match filters.</div> : ''}
    { items.map((item, index) => <Item schema={schema} item={item} key={index} />) }
    </main>
  );
};
