# Movie list
Configurable movies browser. Can be used to list, filter, stat basically anything.

# Installation
`npm install qb-movie-list`.

# Configuration
Deployed application will make 2 requests, for `data/schema.json` and `data/items.json`.
See `Content` section of this readme.

# Support
Tested in latest Chrome, Firefox, Edge and Safari.

# Usage

## Standalone application
Application can be built using commands `npm run build` and `npm run build:production`. Output will show up in `dist` folder.

# Content

## Items
Items json must be an array of objects that represent the item. Values of the item properties can be strings/numbers or arrays of strings/numbers.

## Schema
Content is highly configurable, by defining is in `schema.json`. This schema defines available filters, stats and item content.
In each element of schema, `key` is the property od an item. Each such object can have property `hidden`, which prevents it from being displayed in section that it belongs to.
```javascript
{
  /* Bold  header of each item */
  "header":[
    {"key":"title"}
  ],
  /* When specified, a question mark will be displayed next to header.
   * Warning key can be an array */
  "warning":[
    {"key":"errors"}
  ],
  /* Actual description of the item. */
  "content":[
    {"key":"plot"}
  ],
  /* Small additional footnotes on the bottom of an item.  */
  "footnotes":[
    {"hidden":false,"key":"genre","label":"Genre"},
    {"hidden":true ,"key":"director","label":"Director"}
  ],
  /* Links in the top right corner of the item. See more about links below. */
  "links":[
    {"hidden":true ,"key":"metacritic","label":"Metacritic","template":"http://www.metacritic.com/search/movie/#{title}/results?date_range_from=#{year}"},
    {"hidden":false,"key":"imdb","label":"IMDB","template":"http://www.imdb.com/find?q=#{title}&s=tt&ttype=ft&ref_=fn_ft"}
  ],
  /* Column on the right with addtional info about the item. See more about sidenotes below. */
  "sidenotes":[
    {"hidden":false,"key":"year","template":"#{year}","ranked":false},
    {"hidden":true ,"key":"duration","template":"#{duration}min","ranked":false},
  ],
  /* List of filters and stats. See more about filters below. */
  "filters":[
    {"type":1,"stat":true ,"hidden":false,"key":"title"},
    {"type":3,"stat":true ,"hidden":false,"key":"genre"},
    {"type":1,"stat":true ,"hidden":false,"key":"plot"},
    {"type":2,"stat":true ,"hidden":false,"key":"year"},
    {"type":4,"stat":false,"hidden":false,"key":"added"}
  ]
}
```
### Links
Links can lead anywhere. They're constructed using passed `template`. When hovered, `label` will be displayed.
Links are represented using images. These images `src` attribute is set to `datas/${key}.png`, where `key` is the key of the link.

### Sidenotes
Sidenotes is a list of various info about the item in the right side of the box. Content of each item is constructed using `template`.
If property `ranked` is set to true, application will expect property `${key}Level` on the item, which will be used to colorize the sidenotes.

### Filters
Filters can be one of the 4 types, which is specified by `type` property.
1. text, which is standard text input. Filtering is regex or just string match.
2. range, which is represented by 2 fields, from and to. Filtering is checking if property is in range of the values.
3. ictionary, which is a dropdown (select). Filtering checks if property matches selected option.
4. date, which is similar to range, but checks for dates.

In addition, filters can have `stat` property. If it's set to true, stats for the key about visible items will be presented at the right.

## Themes
By default, application produces 2 themes, `themes/dark.css` and `themes/light.css`. Light theme is attached by default, but this can be changed in the produced html.
Additional themes can be produced by cloning existing theme and replacing colors.
