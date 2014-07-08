/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
/// <reference path="todoapp.services.transformer.ts" />

// tested 
module ToDoApp {

  
    app.controller('HomeController', ($scope: ng.IScope, repLoader : Spiro.Angular.IRepLoader, transformer : ITransformer, $location : ng.ILocationService) => {

        transformer.transform(Spiro.appPath + "/services/Domain.ToDoItems/actions/NotYetComplete/invoke", 
            Spiro.ActionResultRepresentation).then((todoItems: any) => {
            $scope["todoItems"] = todoItems;
        });

        $scope["complete"] = function(url: string) {

            var a = url.substring(1, url.length);

            var action = new Spiro.ActionResultRepresentation({});
            action.method = "PUT";
            action.hateoasUrl = Spiro.appPath +  "/objects" + a + "/actions/Completed/invoke";

            repLoader.populate(action).then((ar: Spiro.ActionResultRepresentation) => {
                $location.url("");
            });
        };
    });

    app.controller('ToDoItemController', ($scope: ng.IScope, $routeParams, transformer: ITransformer) => {
        var id = $routeParams.tdid;
        var url = Spiro.appPath + "/objects/Domain.ToDoItem/" + id;

        transformer.transform(url, Spiro.DomainObjectRepresentation).then((fo : any) => {
            $scope["todoItem"] = fo;
        });
    });

    app.controller('CreateController', ($scope: ng.IScope) => {

    });
   
}