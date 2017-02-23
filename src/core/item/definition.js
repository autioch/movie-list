/* Temporary solution. In the end it will be fetched. */

module.exports = {
  header: [{ key: 'title' }],
  warning: [{ key: 'errors' }],
  description: [{ key: 'plot' }],
  summary: [{
    key: 'genre',
    label: 'Genre'
  }, {
    key: 'director',
    label: 'Director'
  }, {
    key: 'writer',
    label: 'Writer'
  }, {
    key: 'actors',
    label: 'Actors'
  }, {
    key: 'subtitles',
    label: 'Subtitles'
  }],
  links: [{
    key: 'filmweb',
    label: 'Filmeb',
    template: 'http://www.filmweb.pl/search/film?q=#{title}'
  }, {
    key: 'rotten',
    label: 'Rotten Tomatoes',
    template: 'https://www.rottentomatoes.com/search/?search=#{title}'
  }, {
    key: 'imdb',
    label: 'IMDB',
    template: 'http://www.imdb.com/find?q=#{title}&s=tt&ttype=ft&ref_=fn_ft'
  }, {
    key: 'metacritic',
    label: 'Metacritic',
    template: 'http://www.metacritic.com/search/movie/#{title}/results?date_range_from=#{year}'
  }, {
    key: 'google',
    label: 'Google',
    template: 'https://www.google.pl/search?q=movie+#{title}'
  }],
  details: [{
    key: 'year',
    template: '#{year}',
    ranked: false
  }, {
    key: 'duration',
    template: '#{duration}min',
    ranked: false
  }, {
    key: 'rated',
    template: '#{rated} rated',
    ranked: true
  }, {
    key: 'metascore',
    template: '#{metascore} metascore',
    ranked: true
  }, {
    key: 'imdbRating',
    template: '#{imdbRating} rating (#{imdbVotesRounded} votes)',
    ranked: true
  }]
};
