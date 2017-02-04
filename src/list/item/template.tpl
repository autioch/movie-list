<div class="m-list-item">
  <div class="video__title"><%= video.title %></div>
  <div class="video__genre"><%= video.genre.join(', ') %></div>
  <div class="video__info">
    <a class="video__link imdb_link" target="_blank" title="Search in OMDB" href="http://www.imdb.com/find?q=<%= video.title %>&s=tt&ttype=ft&ref_=fn_ft"></a>
    <a class="video__link filmweb_link" target="_blank" title="Search in Filmweb" href="http://www.filmweb.pl/search/film?q=<%= video.title %>"></a>
    <% if (video.errors.length){ %>
      <span class="video__errors">
        <span class="video__errors-icon"></span>
        <ul class="video__errors-list">
          <li>Info might be incorrect</li>
          <% video.errors.forEach(function(err){ %>
            <li><%= err.label %></li>
          <% }) %>
        </ul>
      </span>
    <% } %>
  </div>
  <div class="video__year"><%= video.year %></div>
  <div class="video__rated"><%= video.rated %></div>
  <div class="video__duration"><%= video.duration %></div>
  <div class="video__metascore"><%= video.metascore %></div>
  <div class="video__imdb-rating"><%= video.imdbRating %></div>
  <div class="video__imdb-votes"><%= video.imdbVotes %></div>
</div>
<% if (video.plot && false) { %>
  <div class="m-list-item__plot">
    <div><%= video.plot %></div>
  </div>
<% } %>
