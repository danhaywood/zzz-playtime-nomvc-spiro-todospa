/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />


// tested 
module ToDoApp {

   


// tested
    app.controller('HomeController', ($scope: ng.IScope, repLoader : Spiro.Angular.IRepLoader) => {

        //var todoItems = new Spiro.Helpers.FlatRepresentationLoader().populateL("http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke");
        //$scope["todoItems"] = todoItems;

        //repLoader.populate(new Spiro.ActionResultRepresentation({
        //      hateoasUrl: "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke"
        //})).then((ar: Spiro.ActionResultRepresentation) => {

        var actionResult = new Spiro.ActionResultRepresentation({});
        actionResult.hateoasUrl = "http://localhost:43055/rest/services/Domain.ToDoItems/actions/NotYetComplete/invoke";
        repLoader.populate(actionResult).then((ar: Spiro.ActionResultRepresentation) => {

            var list = ar.result().list().value().models;

            $scope["todoItems"] = [];

            _.each((list), (l: Spiro.Link) => {

                var tgt = l.getTarget();

                repLoader.populate(tgt).then((t: Spiro.DomainObjectRepresentation) => {

                    var names = _.map(t.propertyMembers(), (v, n: string) => n);
                    var values = _.map(t.propertyMembers(), (v: Spiro.PropertyMember) =>  v.value().toString());               
                    var tdi = _.object(names, values);
                    tdi["nof_rep"] = t; 

                    $scope["todoItems"].push(tdi);

                });

            });

        });


    });

    function flattenObject(o: Spiro.DomainObjectRepresentation) {

        var names = _.map(o.propertyMembers(), (v, n: string) => n);
        var values = _.map(o.propertyMembers(), (v: Spiro.PropertyMember) => v.value().toString());
        var tdi = _.object(names, values);
        tdi["nof_rep"] = o;

        return tdi;
    }


    app.controller('ToDoItemController', ($scope: ng.IScope, $routeParams, repLoader: Spiro.Angular.IRepLoader) => {
        var id = $routeParams.tdid;

        var obj = new Spiro.DomainObjectRepresentation({});
        obj.hateoasUrl = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;
        repLoader.populate(obj).then((o: Spiro.DomainObjectRepresentation) => {
            $scope["todoItem"] = flattenObject(o);
        });

    });

    app.controller('CreateController', ($scope: ng.IScope) => {

    });

    
}