<article class="movie__description">
  <header class="movie__header">
    <span class="movie__title t-header">${item.title}</span>
    <% if (item.errors.length > 0){ %>
      <span class="movie__error">
        <span class="movie__error-icon t-error">!</span>
        <ul class="movie__error-list t-box">
          <li>Info might be incorrect (check websites). Reasons:</li>
          <% item.errors.forEach(function(error){ %>
            <li class="movie__error-item">${error.label}</li>
          <% }) %>
        </ul>
      </span>
    <% } %>
  </header>
  <p class="movie__plot">${item.plot}</p>
  <footer class="movie__details t-hint">
    <% if (item.genre) { %>
      <span>Genre: </span>
      <span class="movie__genre">${item.genre.join(', ')}</span>
    <% } %>
  </footer>
  <footer class="movie__details t-hint">
    <% if (item.director) { %>
      <span>Director: </span>
      <span class="movie__genre">${item.director.join(', ')}</span>
    <% } %>
  </footer>
  <footer class="movie__details t-hint">
    <% if (item.writer) { %>
      <span>Writer: </span>
      <span class="movie__genre">${item.writer.join(', ')}</span>
    <% } %>
  </footer>
  <footer class="movie__details t-hint">
    <% if (item.actors) { %>
      <span>Actors: </span>
      <span class="movie__genre">${item.actors.join(', ')}</span>
    <% } %>
  </footer>
  <footer class="movie__details t-hint">
    <% if (item.subtitles && item.subtitles.length) { %>
      <span>Subtitles: </span>
      <span class="movie__genre">${item.subtitles.join(', ')}</span>
    <% } %>
  </footer>
</article>
<aside class="movie__summary">
  <span>
    <a class="portal__link filmweb__link" target="_blank" title="Search in Filmweb" href="http://www.filmweb.pl/search/film?q=${item.title}"></a>
    <a class="portal__link rotten__link" target="_blank" title="Search in Rotten Tomatoes" href="https://www.rottentomatoes.com/search/?search=${item.title}"></a>
    <a class="portal__link imdb__link" target="_blank" title="Search in IMDB" href="http://www.imdb.com/find?q=${item.title}&s=tt&ttype=ft&ref_=fn_ft"></a>
    <a class="portal__link metacritic__link" target="_blank" title="Search in Metacritic" href="http://www.metacritic.com/search/movie/${item.title}/results?date_range_from=${item.year}"></a>
    <a class="portal__link google__link" target="_blank" title="Search in Google" href="https://www.google.pl/search?q=movie+${item.title}"></a>
  </span>
  <span>${item.year}</span>
  <span>${item.duration}min</span>
  <% if (item.rated) { %>
    <a class="t-rank__text--${item.ratedLevel} mpaa__link" target="_blank" title="Read about ratings"
      href="https://en.wikipedia.org/wiki/Motion_Picture_Association_of_America#Film_rating_system">${item.rated} rated</a>
  <% } %>
  <% if (item.metascore) { %>
    <span class="t-rank__text--${item.metascoreLevel}">${item.metascore} metascore</span>
  <% } %>
  <% if (item.imdbRating && item.imdbVotes) { %>
    <span class="t-rank__text--${item.imdbRatingLevel}">${item.imdbRatingRounded} rating (${item.imdbVotesRounded} votes)</span>
  <% } %>
</aside>
