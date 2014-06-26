/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
/// <reference path="todoapp.services.transformer.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    ToDoApp.app.controller('HomeController', function ($scope, repLoader, transformer, $location) {
        transformer.transform(Spiro.appPath + "/services/Domain.ToDoItems/actions/NotYetComplete/invoke", Spiro.ActionResultRepresentation).then(function (todoItems) {
            $scope["todoItems"] = todoItems;
        });

        $scope["complete"] = function (url) {
            var a = url.substring(1, url.length);

            var action = new Spiro.ActionResultRepresentation({});
            action.method = "PUT";
            action.hateoasUrl = Spiro.appPath + "/objects" + a + "/actions/Completed/invoke";

            repLoader.populate(action).then(function (ar) {
                $location.url("");
            });
        };
    });

    ToDoApp.app.controller('ToDoItemController', function ($scope, $routeParams, transformer) {
        var id = $routeParams.tdid;
        var url = Spiro.appPath + "/objects/Domain.ToDoItem/" + id;

        transformer.transform(url, Spiro.DomainObjectRepresentation).then(function (fo) {
            $scope["todoItem"] = fo;
        });
    });

    ToDoApp.app.controller('CreateController', function ($scope) {
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.controllers.js.map
