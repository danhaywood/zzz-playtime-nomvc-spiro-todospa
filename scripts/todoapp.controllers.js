/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    // tested
    ToDoApp.app.controller('HomeController', function ($scope, repLoader) {
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
                    var tdi = {
                        category: t.propertyMember("Category").value().toString(),
                        description: t.propertyMember("Description").value().toString(),
                        dueBy: t.propertyMember("DueBy").value().toString(),
                        notes: t.propertyMember("Notes").value().toString(),
                        complete: t.propertyMember("Complete").value().toString(),
                        cost: t.propertyMember("Cost").value().toString()
                    };

                    $scope["todoItems"].push(tdi);
                });
            });
        });
    });

    ToDoApp.app.controller('ToDoItemController', function ($scope) {
    });

    ToDoApp.app.controller('CreateController', function ($scope) {
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.controllers.js.map
