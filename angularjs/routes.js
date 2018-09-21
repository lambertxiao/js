define(function () {
  return {
    defaultRoutePath: '/',
    routes: {
      '/': {
        templateUrl: './partials/index.html',
        dependencies: [
          'controllers/indexCtrl',
          'directives/osInput'
        ]
      }
    }
  }
})
