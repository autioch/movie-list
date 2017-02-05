<article class="item__description">
  <header class="item__title">${video.title}</header>
  <p class="item__plot">${video.plot}</p>
  <footer class="item__details">
    <% if (video.genre.length > 0) { %>
      <span class="item__genre">${video.genre.join(', ')}</span>
    <% } %>
    <span class="item__duration">${video.duration}min</span>
  </footer>
</article>
<aside class="item__summary">
  <span class="item__links">
    <a class="portal__link imdb__link" target="_blank" title="Search in IMDB" href="http://www.imdb.com/find?q=${video.title}&s=tt&ttype=ft&ref_=fn_ft"></a>
    <a class="portal__link filmweb__link" target="_blank" title="Search in Filmweb" href="http://www.filmweb.pl/search/film?q=${video.title}"></a>
  </span>
  <span class="item__year">${video.year}</span>
  <% if (video.rated) { %>
    <span class="item__rated">
      <a class="mpaa__link item__rated--<%= video.ratedLevel %>" target="_blank" title="Read about ratings"
      href="https://en.wikipedia.org/wiki/Motion_Picture_Association_of_America#Film_rating_system">${video.rated} rated</a>
    </span>
  <% } %>
  <% if (video.metascore) { %>
    <span class="item__metascore item__rated--<%= video.metascoreLevel %>">${video.metascore} metascore</span>
  <% } %>
  <% if (video.imdbRating && video.imdbVotes) { %>
    <span class="item__imdb item__rated--<%= video.imdbRatingLevel %>">
      <span class="item__imdb-rating">${video.imdbRatingRounded} rating</span>
      <span class="item__imdb-votes">(${video.imdbVotesRounded} votes)</span>
    </span>
  <% } %>
</aside>
