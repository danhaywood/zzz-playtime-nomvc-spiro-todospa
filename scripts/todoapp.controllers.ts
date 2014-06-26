/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
/// <reference path="todoapp.services.transformer.ts" />

// tested 
module ToDoApp {

  
    app.controller('HomeController', ($scope: ng.IScope, repLoader : Spiro.Angular.IRepLoader, transformer : ITransformer) => {
        transformer.transform("http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke",
            Spiro.ActionResultRepresentation).then((todoItems: any) => {
            $scope["todoItems"] = todoItems;
        });
    });

    app.controller('ToDoItemController', ($scope: ng.IScope, $routeParams, transformer: ITransformer) => {
        var id = $routeParams.tdid;
        var url = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;

        transformer.transform(url, Spiro.DomainObjectRepresentation).then((fo : any) => {
            $scope["todoItem"] = fo;
        });
    });

    app.controller('CreateController', ($scope: ng.IScope) => {

    });
   
}