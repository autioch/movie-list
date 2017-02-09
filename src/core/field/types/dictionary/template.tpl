<div class="js-sort field__sort" title="Sort by <%= field.label %>">
  <span class="js-sort field__sort-text"><%= field.label %></span>
  <span class="js-sort field__sort-icon is-<%= field.order %>"></span>
</div>
<div class="field__filter">
  <select class="js-filter field-dictionary__select" type="text" title="Filter by <%= field.label %>">
    <option value=""></option>
    <% field.options.forEach(function(option){ %>
      <option value="<%= option %>" <%= field.selected.indexOf(option) > -1 ? 'selected' : '' %>><%= option %></option>
    <% }) %>
  </select>
  <span class="js-reset field__filter-reset">
    <svg class="js-reset" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77.2 77.2">
      <path class="js-reset" fill="#aaa" d="M63.7,1.6L38.6,26.7L13.5,1.6C10.2-1.7,7.3,0.7,4,4s-5.7,6.3-2.4,9.6l25.1,25.1L1.6,63.7
				C-1.7,67,0.7,70,4,73.3c3.3,3.3,6.3,5.7,9.6,2.4l25.1-25.1l25.1,25.1c3.3,3.3,6.3,0.9,9.6-2.4c3.3-3.3,5.7-6.3,2.4-9.6L50.6,38.6
				l25.1-25.1c3.3-3.3,0.9-6.3-2.4-9.6C70,0.7,67-1.7,63.7,1.6z"/>
    </svg>
  </span>
</div>
