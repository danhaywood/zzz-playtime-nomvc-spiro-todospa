/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-route.d.ts" />
/// <reference path="spiro.config.ts" />
/// <reference path="spiro.angular.config.ts" />
var ToDoApp;
(function (ToDoApp) {
    /* Declare app level module */
    ToDoApp.app = angular.module('app', ['ngRoute', 'ngTouch']);

    ToDoApp.app.config(function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: "Content/partials/home.html",
            controller: 'HomeController'
        }).when('/todoitem/:tdid', {
            templateUrl: "Content/partials/todoitem.html",
            controller: 'ToDoItemController'
        }).when('/create', {
            templateUrl: "Content/partials/create.html",
            controller: 'CreateController'
        }).otherwise({
            redirectTo: '/home'
        });
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.app.js.map
