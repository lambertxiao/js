define([
  'app',
], function (app) {
  app.directive('osInput', function () {
    return {
      restrict: 'EA',
      template: '<h1>这是自定义指令的内容</h1>'
    }
  })
});
