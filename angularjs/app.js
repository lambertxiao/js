define(['routes', 'services/dependencyResolverFor'], function (config, dependencyResolverFor) {
  let app = angular.module('app', ['ngRoute'])

  app.config(['$routeProvider', function ($routeProvider) {
    if (config && config.routes) {
      for (path in config.routes) {
        let route = config.routes[path]

        $routeProvider.when(path, {
          templateUrl: route.templateUrl,
          resolve: dependencyResolverFor(route.dependencies)
        })
      }
    }
  }])

  return app
})
