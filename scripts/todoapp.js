/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-route.d.ts" />
/// <reference path="spiro.config.ts" />
/// <reference path="spiro.angular.config.ts" />
var ToDoApp;
(function (ToDoApp) {
    function getSvrPath() {
        var trimmedPath = svrPath.trim();

        if (trimmedPath.length == 0 || trimmedPath.charAt(svrPath.length - 1) == '/') {
            return trimmedPath;
        }
        return trimmedPath + '/';
    }

    /* Declare app level module */
    ToDoApp.app = angular.module('app', ['ngRoute', 'ngTouch']);

    ToDoApp.app.config(function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: "Content/partials/homepage.html",
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
//# sourceMappingURL=todoapp.js.map
