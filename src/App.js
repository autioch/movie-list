import './App.css';

function App() {
  return (
    <>
      <aside class="panel panel--left t-box js-left">
        <div class="header">
          <h1 class="header__title t-header">Movie list</h1>
          <h2 class="header__description t-header">
            List of movies that I have watched. For various reasons I can suggest these movies to other people.
          </h2>
          <div class="js-errors t-warn"></div>
        </div>
      </aside>
      <main class="item-list js-center">
        <div class="item-list__message">Loading movies...</div>
      </main>
      <aside class="panel panel--right t-box js-right"></aside>
    </>
  );
}

export default App;
