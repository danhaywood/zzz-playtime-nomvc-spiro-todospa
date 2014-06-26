/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
/// <reference path="todoapp.services.transformer.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    // tested
    ToDoApp.app.controller('HomeController', function ($scope, repLoader, transformer) {
        var actionResult = new Spiro.ActionResultRepresentation({});
        actionResult.hateoasUrl = "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke";
        repLoader.populate(actionResult).then(function (ar) {
            var list = ar.result().list().value().models;

            $scope["todoItems"] = [];

            _.each((list), function (l) {
                var tgt = l.getTarget();
                transformer.transform(tgt.hateoasUrl, Spiro.DomainObjectRepresentation).then(function (fo) {
                    $scope["todoItems"].push(fo);
                });
            });
        });
    });

    ToDoApp.app.controller('ToDoItemController', function ($scope, $routeParams, transformer) {
        var id = $routeParams.tdid;
        var url = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;

        transformer.transform(url, Spiro.DomainObjectRepresentation).then(function (fo) {
            $scope["todoItem"] = fo;
        });
    });

    ToDoApp.app.controller('CreateController', function ($scope) {
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.controllers.js.map
