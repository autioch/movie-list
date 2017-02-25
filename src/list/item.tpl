<article class="item__description">
  <header class="item__header">
    ${header}
    <% if (warning.length > 0){ %>
      <span class="item__warning">
        <span class="item__warning-icon t-warn">?</span>
        <ul class="item__warning-list t-box">
          <li>Info might be incorrect. Reasons:</li>
          ${warning}
        </ul>
      </span>
    <% } %>
  </header>
  ${content}
  ${details}
</article>
<aside class="item__summary">
  <span>${links}</span>
  ${summary}
</aside>
