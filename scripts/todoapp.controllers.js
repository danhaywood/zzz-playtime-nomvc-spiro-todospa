/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    // tested
    ToDoApp.app.controller('HomeController', function ($scope, repLoader) {
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

                repLoader.populate(tgt).then(function (t) {
                    var names = _.map(t.propertyMembers(), function (v, n) {
                        return n;
                    });
                    var values = _.map(t.propertyMembers(), function (v) {
                        return v.value().toString();
                    });
                    var tdi = _.object(names, values);
                    tdi["nof_rep"] = t;

                    $scope["todoItems"].push(tdi);
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

    ToDoApp.app.controller('ToDoItemController', function ($scope, $routeParams, repLoader) {
        var id = $routeParams.tdid;

        var obj = new Spiro.DomainObjectRepresentation({});
        obj.hateoasUrl = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;
        repLoader.populate(obj).then(function (o) {
            $scope["todoItem"] = flattenObject(o);
        });
    });

    ToDoApp.app.controller('CreateController', function ($scope) {
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.controllers.js.map
