define(['routes', 'services/dependencyResolverFor'], function (config, dependencyResolverFor) {
  let app = angular.module('app', ['ngRoute'])

  app.config([
    '$routeProvider',
    // 以下provider是为了实现模块的懒加载
    '$locationProvider',
    '$controllerProvider',
    '$compileProvider',
    '$filterProvider',
    '$provide',
    function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
      app.controller = $controllerProvider.register;
      app.directive = $compileProvider.directive;
      app.filter = $filterProvider.register;
      app.factory = $provide.factory;
      app.service = $provide.service;

      // $locationProvider.html5Mode(true);

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
