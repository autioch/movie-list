import React, { PureComponent } from 'react';
import { CellMeasurer, CellMeasurerCache, AutoSizer, List } from 'react-virtualized';
import Item from '../item';

// import './index.css';

export default class MacroList extends PureComponent {
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);
    this.resetCache = this.resetCache.bind(this);
    this.keyMapper = this.keyMapper.bind(this);
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      keyMapper: this.keyMapper
    });
  }
  resetCache() {
    this.cache.resetAll();
  }
  keyMapper(index) {
    return this.props.items[index].id;
  }
  componentDidMount() {
    document.addEventListener('resize', this.resetCache);
  }
  componentDidUpdate() {
    this.list.recomputeRowHeights();
  }
  componentWillUnmount() {
    document.removeEventListener('resize', this.resetCache);
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
