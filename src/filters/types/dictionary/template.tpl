<div class="field__sort js-sort t-label" title="Sort by ${label}">
  <span class="field__sort-text js-sort">${label}</span>
  <span class="field__sort-icon js-sort is-${order}"></span>
</div>
<div class="field__filter">
  <select class="field-dictionary__select t-input js-filter" type="text" title="Filter by ${label}">
    <option value=""></option>
    <% options.forEach(function(option){ %>
      <option value="${option}" ${selected.indexOf(option) > -1 ? 'selected' : ''}>${option}</option>
    <% }) %>
  </select>
  <span class="field__filter-reset t-btn js-reset" title="Reset ${label} filter"></span>
</div>
