require.config({
  baseUrl: './',
  paths: {
    angular: './vendor/angular/angular',
    angularRoute: './vendor/angular/angular-route',
    jquery: './vendor/lib/jquery.min',
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angularRoute': {
      deps: ['angular']
    },
    'app': {
      // 这是依赖的另一种写法
      deps: ['angular', 'angularRoute']
    }
  },
  deps: ['bootstrap']
})
