﻿/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    ToDoApp.app.service('flattener', function (repLoader, $q) {
        var flattener = this;

        flattener.transform = function (url, transform) {
            var deferred = $q.defer();
            var obj = new Spiro.ResourceRepresentation({});
            obj.hateoasUrl = url;
            repLoader.populate(obj).then(function (o) {
                var flat = transform(o);
                deferred.resolve(flat);
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        flattener.flatten = function (url) {
            return flattener.transform(url, flattenObject);
        };
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.services.flattener.js.map
