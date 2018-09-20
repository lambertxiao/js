define([
  'app',
], function(app) {
  app.controller('IndexController', ['$scope', function ($scope) {
    $scope.page = {
      heading: 'Welcome'
    }
  }])
});
