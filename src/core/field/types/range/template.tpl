<div class="field__sort js-sort t-label" title="Sort by ${field.label}">
  <span class="field__sort-text js-sort">${field.label}</span>
  <span class="field__sort-icon js-sort is-${field.order}"></span>
</div>
<div class="field__filter">
  <span class="field-range__text t-hint">From</span>
  <input class="field-range__input t-input js-from" type="text" value="${field.getFromText()}" title="Set minimum ${field.label}"/>
  <span class="field-range__text t-hint">To</span>
  <input class="field-range__input t-input js-to" type="text" value="${field.getToText()}" title="Set maximum ${field.label}"/>
  <span class="field__filter-reset t-btn js-reset"></span>
</div>
