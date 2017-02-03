<div class="m-list-item">
<div class="m-list-item__content">
  <div class="video__header">
    <span class="video__title"><%= video.title %></span>
    <a class="video__link imdb_link" target="_blank" title="Search in OMDB" href="http://www.imdb.com/find?q=<%= video.title %>&s=tt&ttype=ft&ref_=fn_ft"></a>
    <a class="video__link filmweb_link" target="_blank" title="Search in Filmweb" href="http://www.filmweb.pl/search/film?q=<%= video.title %>"></a>
    <% if (video.errors.length){ %>
      <span class="video__errors" title="Info might be incorrect">
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
  <div class="video__info">
    <% if (video.genre.length){ %>
      <%= video.genre.join(', ') %>,
    <% } %>
    <%= video.year %>,
    <%= video.duration %>min
  </div>
  <% if (video.rated || video.director || video.metascore || video.imdbRating){ %>
    <div class="video__details" title="<%= video.size %>MB">
      <% if (video.rated){ %>
        Rated <%= video.rated %>,
      <% } %>
      <% if (video.director){ %>
        <%= video.director %>,
      <% } %>
      <% if (video.metascore){ %>
        Metascore: <%= video.metascore %>,
      <% } %>
      <% if (video.imdbRating){ %>
        IMDB Rating: <%= video.imdbRating %> (<%= video.imdbVotes %> votes)
      <% } %>
    </div>
  <% } %>
  <% if (video.plot) { %>
    <div class="video__plot"><%= video.plot %></div>
  <% } %>
</div>
</div>
