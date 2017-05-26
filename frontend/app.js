const app = angular.module('vokalApp', ['ui.router', 'toaster', 'ui.bootstrap', 'ngCookies']);

app.config(($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) => {

    /*CORS*/
    // $httpProvider.defaults.withCredentials = true;
    // $httpProvider.defaults.useXDomain = true;

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: 'views/login.html',
            controller: 'LoginCntrl'
        })

    .state('chats', {
        url: '/main',
        templateUrl: 'views/location.html',
        controller: 'LocationCntrl'
    });

    $urlRouterProvider.otherwise('/login');
});