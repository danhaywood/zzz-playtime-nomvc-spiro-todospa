/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-route.d.ts" />
/// <reference path="spiro.config.ts" />
/// <reference path="spiro.angular.config.ts" />

module ToDoApp {


    /* Declare app level module */
   
    export var app = angular.module('app', ['ngRoute', 'ngTouch']);

    app.config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider.
            when('/home', {
                templateUrl: "Content/partials/home.html", 
                controller: 'HomeController'
            }).
            when('/todoitem/:tdid', {
                templateUrl: "Content/partials/todoitem.html",
                controller: 'ToDoItemController'
            }).
            when('/create', {
                templateUrl: "Content/partials/create.html",
                controller: 'CreateController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    });

    
}