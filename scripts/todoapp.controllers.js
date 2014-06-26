/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    // tested
    ToDoApp.app.controller('HomeController', function ($scope, repLoader, $q) {
        //var todoItems = new Spiro.Helpers.FlatRepresentationLoader().populateL("http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke");
        //$scope["todoItems"] = todoItems;
        //repLoader.populate(new Spiro.ActionResultRepresentation({
        //      hateoasUrl: "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke"
        //})).then((ar: Spiro.ActionResultRepresentation) => {
        var actionResult = new Spiro.ActionResultRepresentation({});
        actionResult.hateoasUrl = "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke";
        repLoader.populate(actionResult).then(function (ar) {
            var list = ar.result().list().value().models;

            $scope["todoItems"] = [];

            _.each((list), function (l) {
                var tgt = l.getTarget();
                getPromise(tgt.hateoasUrl, repLoader, $q, flattenObject).then(function (fo) {
                    $scope["todoItems"].push(fo);
                });
            });
        });
    });

    function flattenObject(o) {
        var names = _.map(o.propertyMembers(), function (v, n) {
            return n;
        });
        var values = _.map(o.propertyMembers(), function (v) {
            return v.value().toString();
        });
        var tdi = _.object(names, values);
        tdi["nof_rep"] = o;

        return tdi;
    }

    function getPromise(url, repLoader, $q, transform) {
        var deferred = $q.defer();
        var obj = new Spiro.DomainObjectRepresentation({});
        obj.hateoasUrl = url;
        repLoader.populate(obj).then(function (o) {
            var flat = transform(o);
            deferred.resolve(flat);
        }, function () {
            deferred.reject();
        });

        return deferred.promise;
    }

    ToDoApp.app.controller('ToDoItemController', function ($scope, $routeParams, repLoader, $q) {
        var id = $routeParams.tdid;
        var url = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;

        getPromise(url, repLoader, $q, flattenObject).then(function (fo) {
            $scope["todoItem"] = fo;
        });
    });

    ToDoApp.app.controller('CreateController', function ($scope) {
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.controllers.js.map
