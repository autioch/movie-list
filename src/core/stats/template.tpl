<% stats.forEach(function(stat){ %>
  <section class="stat">
    <header class="stat__header">${stat.label}</header>
    <ul class="stat__item-list">
      <% stat.items.forEach(function(item){ %>
        <li class="stat__item">
          <span class="stat-item__value ${item.rounded ? 'is-rounded' : ''}">${item.value}</span>
          <span class="stat-item__label">${item.key}</span>
        </li>
      <% }) %>
    </ul>
  </section>
<% }) %>
