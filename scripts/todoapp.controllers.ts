/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />


// tested 
module ToDoApp {

   


// tested
    app.controller('HomeController', ($scope: ng.IScope, repLoader : Spiro.Angular.IRepLoader, $q : ng.IQService) => {

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
                getPromise(tgt.hateoasUrl, repLoader, $q, flattenObject).then((fo : IFlattenedObject) => {
                    $scope["todoItems"].push(fo);
                });

            });
        });
    });

    interface IFlattenedObject {
        [index : string] : any
    }

    function flattenObject(o: Spiro.DomainObjectRepresentation): IFlattenedObject {

        var names = _.map(o.propertyMembers(), (v, n: string) => n);
        var values = _.map(o.propertyMembers(), (v: Spiro.PropertyMember) => v.value().toString());
        var tdi = <IFlattenedObject>_.object(names, values);
        tdi["nof_rep"] = o;

        return tdi;
    }

    function getPromise(url: string, repLoader: Spiro.Angular.IRepLoader, $q: ng.IQService, transform: (o: Spiro.DomainObjectRepresentation) => IFlattenedObject) {

        var deferred = $q.defer();
        var obj = new Spiro.DomainObjectRepresentation({});
        obj.hateoasUrl = url;
        repLoader.populate(obj).then((o: Spiro.DomainObjectRepresentation) => {
            var flat = transform(o);
            deferred.resolve(flat);
        }, () => {
            deferred.reject();
        });

        return deferred.promise; 
    }


    app.controller('ToDoItemController', ($scope: ng.IScope, $routeParams, repLoader: Spiro.Angular.IRepLoader, $q) => {
        var id = $routeParams.tdid;
        var url = "http://localhost:43055/rest/objects/Domain.ToDoItem/" + id;

        getPromise(url, repLoader, $q, flattenObject).then((fo) => {
            $scope["todoItem"] = fo;
        });

    });

    app.controller('CreateController', ($scope: ng.IScope) => {

    });
   
}