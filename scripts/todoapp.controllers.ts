/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
/// <reference path="todoapp.services.flattener.ts" />

// tested 
module ToDoApp {

  
// tested
    app.controller('HomeController', ($scope: ng.IScope, repLoader : Spiro.Angular.IRepLoader, flattener : IFlattener) => {

        var actionResult = new Spiro.ActionResultRepresentation({});
        actionResult.hateoasUrl = "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke";
        repLoader.populate(actionResult).then((ar: Spiro.ActionResultRepresentation) => {

            var list = ar.result().list().value().models;

            $scope["todoItems"] = [];

            _.each((list), (l: Spiro.Link) => {

                var tgt = l.getTarget();
                flattener.flatten(tgt.hateoasUrl).then((fo : IFlattenedObject) => {
                    $scope["todoItems"].push(fo);
                });

            });
        });
    });

    app.controller('ToDoItemController', ($scope: ng.IScope, $routeParams, flattener : IFlattener) => {
        var id = $routeParams.tdid;
        var url = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;

        flattener.flatten(url).then((fo : IFlattenedObject) => {
            $scope["todoItem"] = fo;
        });
    });

    app.controller('CreateController', ($scope: ng.IScope) => {

    });
   
}