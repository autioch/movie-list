import Fields from './fields';
import Count from './count';
import List from './list';
import Legend from './legend';
import Stats from './stats';
import './App.scss';
import { Component } from 'react';
import fetchJson from './fetchJson';
import appModelFactory from './appModel';
import './themes/dark.scss';

class App extends Component {
  state = {
    totalCount: 0,
    count: 0,
    items: [],
    fields: [],
    schema: {},
    isLoading: true
  }

  componentDidMount() {
    Promise
      .all([fetchJson('/data/schema.json'), fetchJson('/data/items.json')])
      .then(this.setupAppModel.bind(this));
  }

  setupAppModel([schema, items]) {
    this.appModel = appModelFactory(schema, items);
    this.appModel.onChange(() => this.syncStateWithAppModel());

    this.syncStateWithAppModel();

    this.setState(() => ({
      isLoading: false
    }));
  }

  syncStateWithAppModel() {
    const { totalCount, count } = this.appModel.query();

    this.setState({
      totalCount,
      count
    });
  }

  render() { // eslint-disable-line class-methods-use-this
    const { appModel } = this;

    const { totalCount, count } = this.state;

    if (!appModel) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <>
        <aside className="panel panel--left t-box">
          <div className="header">
            <h1 className="header__title t-header">Movie list</h1>
            <h2 className="header__description t-header">
                List of movies that I have watched. For various reasons I can suggest these movies to other people.
            </h2>
            <div className="js-errors t-warn"></div>
          </div>
          <Fields appModel={appModel}/>
        </aside>
        <List appModel={appModel} />
        <aside className="panel panel--right t-box">
          <Count count={count} totalCount={totalCount}/>
          <Stats appModel={appModel} />
          <Legend />
        </aside>
      </>
    );
  }
}

export default App;
