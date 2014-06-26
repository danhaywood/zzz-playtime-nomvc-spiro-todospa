/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
/// <reference path="todoapp.services.transformer.ts" />

// tested 
module ToDoApp {

  
// tested
    app.controller('HomeController', ($scope: ng.IScope, repLoader : Spiro.Angular.IRepLoader, transformer : ITransformer) => {

        var actionResult = new Spiro.ActionResultRepresentation({});
        actionResult.hateoasUrl = "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke";
        repLoader.populate(actionResult).then((ar: Spiro.ActionResultRepresentation) => {

            var list = ar.result().list().value().models;

            $scope["todoItems"] = [];

            _.each((list), (l: Spiro.Link) => {

                var tgt = l.getTarget();
                transformer.transform(tgt.hateoasUrl, Spiro.DomainObjectRepresentation).then((fo : ITransformedRepresentation) => {
                    $scope["todoItems"].push(fo);
                });

            });
        });
    });

    app.controller('ToDoItemController', ($scope: ng.IScope, $routeParams, transformer: ITransformer) => {
        var id = $routeParams.tdid;
        var url = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;

        transformer.transform(url, Spiro.DomainObjectRepresentation).then((fo : ITransformedRepresentation) => {
            $scope["todoItem"] = fo;
        });
    });

    app.controller('CreateController', ($scope: ng.IScope) => {

    });
   
}