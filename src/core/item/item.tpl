<article class="item__info">
  <header class="item__header">
    <%= header.join('') %>
    <% if (warning.length > 0){ %>
      <span class="item__warning">
        <span class="item__warning-icon t-error">?</span>
        <ul class="item__warning-list t-box">
          <li>Info might be incorrect. Reasons:</li>
          <%= warning.join('') %>
        </ul>
      </span>
    <% } %>
  </header>
  <%= description.join('') %>
  <%= summary.join('') %>
</article>
<aside class="item__summary">
  <span><%= links.join('') %></span>
  <%= details.join('') %>
</aside>
