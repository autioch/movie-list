<article class="item__description">
  <header class="item__title">${item.title}</header>
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
      <a class="mpaa__link item__rated--<%= item.ratedLevel %>" target="_blank" title="Read about ratings"
      href="https://en.wikipedia.org/wiki/Motion_Picture_Association_of_America#Film_rating_system">${item.rated} rated</a>
    </span>
  <% } %>
  <% if (item.metascore) { %>
    <span class="item__metascore item__rated--<%= item.metascoreLevel %>">${item.metascore} metascore</span>
  <% } %>
  <% if (item.imdbRating && item.imdbVotes) { %>
    <span class="item__imdb item__rated--<%= item.imdbRatingLevel %>">
      <span class="item__imdb-rating">${item.imdbRatingRounded} rating</span>
      <span class="item__imdb-votes">(${item.imdbVotesRounded} votes)</span>
    </span>
  <% } %>
</aside>
