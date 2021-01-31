import { PureComponent, createRef } from 'react';
import { CellMeasurer, CellMeasurerCache, AutoSizer, List } from 'react-virtualized';
import Item from './item';
import throttle from 'lodash.throttle';
import Empty from './empty';
import './index.scss';

export default class MacroList extends PureComponent {
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);
    this.resetCache = throttle(this.resetCache.bind(this), 100); // eslint-disable-line no-magic-numbers
    this.cache = new CellMeasurerCache({
      fixedWidth: true
    });
    this.list = createRef();
  }

  resetCache() {
    this.cache.clearAll();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resetCache);
  }
  componentDidUpdate() {
    this.resetCache();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resetCache);

    this.resetCache.cancel();
  }

  rowRenderer({ index, key, parent, style }) { // eslint-disable-line no-shadow
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        <Item style={style} item={this.props.items[index]} schema={this.props.schema} hiddenFields={this.props.hiddenFields}/>
      </CellMeasurer>
    );
  }
  render() {
    const { cache, props: { items } } = this;

    return (
      <div className="item-list">
        {items.length ? <AutoSizer>
          {({ height, width }) => (
            <List
              deferredMeasurementCache={cache}
              height={height}
              rowCount={items.length}
              rowHeight={cache.rowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
              ref={this.list}
            />
          )}
        </AutoSizer> : <Empty/>}
      </div>
    );
  }
}
