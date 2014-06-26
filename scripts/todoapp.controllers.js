/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
/// <reference path="todoapp.services.flattener.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    // tested
    ToDoApp.app.controller('HomeController', function ($scope, repLoader, flattener) {
        var actionResult = new Spiro.ActionResultRepresentation({});
        actionResult.hateoasUrl = "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke";
        repLoader.populate(actionResult).then(function (ar) {
            var list = ar.result().list().value().models;

            $scope["todoItems"] = [];

            _.each((list), function (l) {
                var tgt = l.getTarget();
                flattener.flatten(tgt.hateoasUrl).then(function (fo) {
                    $scope["todoItems"].push(fo);
                });
            });
        });
    });

    ToDoApp.app.controller('ToDoItemController', function ($scope, $routeParams, flattener) {
        var id = $routeParams.tdid;
        var url = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;

        flattener.flatten(url).then(function (fo) {
            $scope["todoItem"] = fo;
        });
    });

    ToDoApp.app.controller('CreateController', function ($scope) {
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.controllers.js.map
