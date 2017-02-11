<div class="field__sort js-sort t-label" title="Sort by ${field.label}">
  <span class="field__sort-text js-sort">${field.label}</span>
  <span class="field__sort-icon js-sort is-${field.order}"></span>
</div>
<div class="field__filter">
  <select class="field-dictionary__select t-input js-filter" type="text" title="Filter by ${field.label}">
    <option value=""></option>
    <% field.options.forEach(function(option){ %>
      <option value="${option}" ${field.selected.indexOf(option) > -1 ? 'selected' : ''}>${option}</option>
    <% }) %>
  </select>
  <span class="field__filter-reset t-btn js-reset" title="Reset ${field.label} filter"></span>
</div>
