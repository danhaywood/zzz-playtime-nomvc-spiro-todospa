/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />


// tested 
module ToDoApp {

	// tested
    app.controller('HomeController', ($scope: ng.IScope, repLoader : Spiro.Angular.IRepLoader) => {

        var service = new Spiro.DomainObjectRepresentation({});
        service.hateoasUrl = "http://localhost:43055/rest/services/Domain.ToDoItems";

        repLoader.populate(service).then((srv: Spiro.DomainObjectRepresentation) => {
            var action = srv.actionMember("NotYetComplete").getDetails();
            return repLoader.populate(action);
        }).then((details: Spiro.ActionRepresentation) => {

            var actionResult = details.getInvoke();
            return repLoader.populate(actionResult);
        }).then((ar: Spiro.ActionResultRepresentation) => {

            var list = ar.result().list().value().models;

            $scope["todoItems"] = [];

            _.each((list), (l: Spiro.Link) => {

                var tgt = l.getTarget();

                repLoader.populate(tgt).then((t: Spiro.DomainObjectRepresentation) => {

                    var tdi = {
                        category: t.propertyMember("Category").value().toString(),
                        description: t.propertyMember("Description").value().toString(),
                        dueBy: t.propertyMember("DueBy").value().toString(),
                        notes: t.propertyMember("Notes").value().toString(),
                        complete: t.propertyMember("Complete").value().toString(),
                        cost: t.propertyMember("Cost").value().toString()
                    }

                    $scope["todoItems"].push(tdi);

                });

            });


        });


    });

    app.controller('ToDoItemController', ($scope: ng.IScope) => {

    });

    app.controller('CreateController', ($scope: ng.IScope) => {

    });

    
}