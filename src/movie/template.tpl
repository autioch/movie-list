<article class="item__description">
  <header class="item__title">
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
  <p class="item__plot">${item.plot}</p>
  <footer class="item__details">
    <% if (item.genre.length > 0) { %>
      <span class="item__genre">${item.genre.join(', ')}</span>
    <% } %>
    <span class="item__duration">${item.duration}min</span>
  </footer>
</article>
<aside class="item__summary">
  <span class="item__links">
    <a class="portal__link imdb__link" target="_blank" title="Search in IMDB" href="http://www.imdb.com/find?q=${item.title}&s=tt&ttype=ft&ref_=fn_ft"></a>
    <a class="portal__link filmweb__link" target="_blank" title="Search in Filmweb" href="http://www.filmweb.pl/search/film?q=${item.title}"></a>
  </span>
  <span class="item__year">${item.year}</span>
  <% if (item.rated) { %>
    <span class="item__rated">
      <a class="mpaa__link rank__text--<%= item.ratedLevel %>" target="_blank" title="Read about ratings"
      href="https://en.wikipedia.org/wiki/Motion_Picture_Association_of_America#Film_rating_system">${item.rated} rated</a>
    </span>
  <% } %>
  <% if (item.metascore) { %>
    <span class="item__metascore rank__text--<%= item.metascoreLevel %>">${item.metascore} metascore</span>
  <% } %>
  <% if (item.imdbRating && item.imdbVotes) { %>
    <span class="item__imdb rank__text--<%= item.imdbRatingLevel %>">
      <span class="item__imdb-rating">${item.imdbRatingRounded} rating</span>
      <span class="item__imdb-votes">(${item.imdbVotesRounded} votes)</span>
    </span>
  <% } %>
</aside>
