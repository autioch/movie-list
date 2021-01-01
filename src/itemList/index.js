import React, { PureComponent } from 'react';
import { CellMeasurer, CellMeasurerCache, AutoSizer, List } from 'react-virtualized';
import Item from './item';

import throttle from 'lodash.throttle';

export default class MacroList extends PureComponent {
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);
    this.resetCache = throttle(this.resetCache.bind(this), 100); // eslint-disable-line no-magic-numbers
    this.cache = new CellMeasurerCache({
      fixedWidth: true
    });
  }

  resetCache() {
    this.cache.clearAll();

    // this.list.recomputeRowHeights();
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
        <Item style={style} item={this.props.items[index]} schema={this.props.schema} />
      </CellMeasurer>
    );
  }
  render() {
    const { cache, props: { items, isLoading } } = this;

    return (
      <main className="item-list">
        {isLoading ? <div className="item-list__message">Loading movies...</div> : ''}
        {items.length ? '' : <div className="item-list__message">No items match filters.</div>}
        <AutoSizer>
          {({ height, width }) => (
            <List
              deferredMeasurementCache={cache}
              height={height}
              rowCount={items.length}
              rowHeight={cache.rowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
              ref={(ref) => {
                this.list = ref;
              }}
            />
          )}
        </AutoSizer>
      </main>
    );
  }
}
