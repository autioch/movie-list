<article class="movie__description">
  <header class="movie__title">
    ${item.title}
    <% if (item.errors.length > 0){ %>
      <span class="movie__error">
        <span class="movie__error-icon">!</span>
        <ul class="movie__error-list">
          <li>Info might be incorrect. Check IMDB or Filmweb.</li>
          <li>Reasons:</li>
          <% item.errors.forEach(function(error){ %>
            <li class="movie__error-item">${error.label}</li>
          <% }) %>
        </ul>
      </span>
    <% } %>
  </header>
  <p class="movie__plot">${item.plot}</p>
  <footer class="movie__details">
    <% if (item.genre.length > 0) { %>
      <span class="movie__genre">${item.genre.join(', ')}</span>
    <% } %>
    <span>${item.duration}min</span>
  </footer>
</article>
<aside class="movie__summary">
  <span>
    <a class="portal__link imdb__link" target="_blank" title="Search in IMDB" href="http://www.imdb.com/find?q=${item.title}&s=tt&ttype=ft&ref_=fn_ft"></a>
    <a class="portal__link filmweb__link" target="_blank" title="Search in Filmweb" href="http://www.filmweb.pl/search/film?q=${item.title}"></a>
  </span>
  <span>${item.year}</span>
  <% if (item.rated) { %>
    <a class="rank__text--${item.ratedLevel} mpaa__link" target="_blank" title="Read about ratings"
      href="https://en.wikipedia.org/wiki/Motion_Picture_Association_of_America#Film_rating_system">${item.rated} rated</a>
  <% } %>
  <% if (item.metascore) { %>
    <span class="rank__text--${item.metascoreLevel}">${item.metascore} metascore</span>
  <% } %>
  <% if (item.imdbRating && item.imdbVotes) { %>
    <span class="rank__text--${item.imdbRatingLevel}">${item.imdbRatingRounded} rating (${item.imdbVotesRounded} votes)</span>
  <% } %>
</aside>
