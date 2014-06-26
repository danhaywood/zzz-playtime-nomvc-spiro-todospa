/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    ToDoApp.app.service('transformer', function (repLoader, $q, transformStrategy) {
        var transformer = this;

        transformer.transform = function tt(url, c) {
            var deferred = $q.defer();
            var obj = new c({});
            obj.hateoasUrl = url;
            repLoader.populate(obj).then(function (o) {
                var flat = transformStrategy ? transformStrategy.transform(o) : o;
                deferred.resolve(flat);
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.services.transformer.js.map
