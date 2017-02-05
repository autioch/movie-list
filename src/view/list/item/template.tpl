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
    <a class="item__link imdb_link" target="_blank" title="Search in IMDB" href="http://www.imdb.com/find?q=${video.title}&s=tt&ttype=ft&ref_=fn_ft"></a>
    <a class="item__link filmweb_link" target="_blank" title="Search in Filmweb" href="http://www.filmweb.pl/search/film?q=${video.title}"></a>
  </span>
  <span class="item__year">${video.year}</span>
  <% if (video.rated) { %><span class="item__rated">${video.rated} rated</span><% } %>
  <% if (video.metascore) { %><span class="item__metascore">${video.metascore} metascore</span><% } %>
  <% if (video.imdbRating_view && video.imdbVotes) { %>
    <span class="item__imdb">
      <span class="item__imdb-rating">${video.imdbRating_view} rating</span>
      <span class="item__imdb-votes">(${video.imdbVotes_view} votes)</span>
    </span>
  <% } %>
</aside>
