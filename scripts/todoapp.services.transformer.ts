/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested 
module ToDoApp {


    export interface ITransformer {
        transform<T extends Spiro.ResourceRepresentation>(url: string, c: { new (any): T }) : ng.IPromise<any>;
    }

    app.service('transformer', function (repLoader: Spiro.Angular.IRepLoader, $q: ng.IQService, transformStrategy : ITransformStrategy) {

        var transformer = <ITransformer>this;

        transformer.transform = function tt<T extends Spiro.ResourceRepresentation>(url: string, c: {new( any ) : T}) {

            var deferred = $q.defer();
            var obj = new c({});
            obj.hateoasUrl = url;
            repLoader.populate(obj).then((o: Spiro.ResourceRepresentation) => {
                var flat = transformStrategy ? transformStrategy.transform(o) : o;
                deferred.resolve(flat);
            }, () => {
                deferred.reject();
            });

            return deferred.promise;
        };
    });
}