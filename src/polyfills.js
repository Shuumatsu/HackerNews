if (process.env.NODE_ENV === 'production') {
    require('url-search-params-polyfill')
    require('es6-promise').polyfill()
    require('isomorphic-fetch')
    require('core-js')
}
